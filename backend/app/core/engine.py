import os
from functools import lru_cache
from llama_index.core import (
    VectorStoreIndex,
    StorageContext,
    load_index_from_storage,
    get_response_synthesizer
)
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.prompts import PromptTemplate
from llama_index.core.base.response.schema import Response

from app.core.settings import Settings
from app.core.loader import get_documents
from app.core.settings import CACHE_DIR

class StrictQueryEngine(RetrieverQueryEngine):
    """
    A custom query engine that enforces a strict similarity score threshold.
    """
    def __init__(self, *args, similarity_cutoff: float = 0.7, **kwargs):
        super().__init__(*args, **kwargs)
        self.similarity_cutoff = similarity_cutoff
        
    def _query(self, query_bundle):
        """Sync query endpoint."""
        nodes = self.retrieve(query_bundle)
        
        if not nodes or nodes[0].score < self.similarity_cutoff:
            return Response(
                response=(
                    "HiteshBot can only answer questions related to Hitesh Kumar's portfolio. "
                    "Please ask about his skills, projects, or experience."
                ),
                source_nodes=[],
            )
            
        return self._response_synthesizer.synthesize(
            query=query_bundle.query_str,
            nodes=nodes,
        )
    
    async def _aquery(self, query_bundle):
        """Async query endpoint."""
        nodes = await self.aretrieve(query_bundle)

        if not nodes or nodes[0].score < self.similarity_cutoff:
            return Response(
                response=(
                    "HiteshBot can only answer questions related to Hitesh Kumar's portfolio. "
                    "Please ask about his skills, projects, or experience."
                ),
                source_nodes=[],
            )
            
        return await self._response_synthesizer.asynthesize(
            query=query_bundle.query_str,
            nodes=nodes,
        )


@lru_cache(maxsize=1)
def create_chat_engine():
    """
    Creates and returns a highly specialized and strict RAG engine.
    """
    print("Attempting to create final, strict RAG engine...")
    
    if os.path.exists(os.path.join(CACHE_DIR, "docstore.json")):
        print(f"Loading knowledge base from cache: {CACHE_DIR}")
        storage_context = StorageContext.from_defaults(persist_dir=CACHE_DIR)
        index = load_index_from_storage(storage_context)
    else:
        print("No cache found. Building knowledge base from documents...")
        documents = get_documents()
        index = VectorStoreIndex.from_documents(documents, show_progress=True)
        print(f"Persisting knowledge base to cache: {CACHE_DIR}")
        index.storage_context.persist(persist_dir=CACHE_DIR)

    retriever = VectorIndexRetriever(index=index, similarity_top_k=5)

    # --- FINAL, MORE NUANCED PROMPT ---
    qa_template = PromptTemplate(
        "### INSTRUCTIONS ###\n"
        "You are HiteshBot, a professional AI assistant for Hitesh Kumar's portfolio. Your purpose is to act as an expert on Hitesh, using ONLY the provided context to answer questions.\n"
        "Follow these rules precisely:\n"
        "1.  **Grounding is Paramount:** Your entire response MUST be grounded in the 'CONTEXT' provided. Do not invent details or use any external knowledge.\n"
        "2.  **Synthesize and Infer:** You are not a simple search engine. Read the 'USER'S QUESTION' and the 'CONTEXT' carefully. If the question is about a trait or quality (like problem-solving, passion, or teamwork), you are allowed to INFER an answer by synthesizing evidence from his projects, skills, and summary. For example, to demonstrate problem-solving, you can cite the challenges he overcame in his projects.\n"
        "3.  **Formatting:** Use Markdown for lists (using '-') and bolding (using '**') to structure your answers clearly, especially for lists of projects or skills.\n"
        "4.  **Fallback Protocol:** If, after careful analysis, you determine the 'CONTEXT' contains no relevant information to answer the question, you MUST respond with the exact phrase: 'HiteshBot does not have information on this specific topic. Please ask another question about Hitesh Kumar\\'s skills, projects, or experience.'\n\n"
        "### CONTEXT ###\n"
        "---------------------\n"
        "{context_str}\n"
        "---------------------\n\n"
        "### USER'S QUESTION ###\n"
        "{query_str}\n\n"
        "### RESPONSE (Grounded in Context, Formatted in Markdown) ###"
    )
    
    response_synthesizer = get_response_synthesizer(
        llm=Settings.llm,
        response_mode="compact",
        text_qa_template=qa_template,
        streaming=True,
    )
    
    query_engine = StrictQueryEngine(
        retriever=retriever,
        response_synthesizer=response_synthesizer,
        similarity_cutoff=0.72 
    )

    print("Final, strict RAG engine with inference capabilities created successfully.")
    return query_engine


def get_chat_engine():
    return create_chat_engine()

def clear_engine_cache():
    create_chat_engine.cache_clear()
    print("In-memory RAG engine cache cleared.")