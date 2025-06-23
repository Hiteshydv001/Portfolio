from fastapi import APIRouter
from llama_index.core.settings import Settings

router = APIRouter()

@router.get("")
def get_model_config():
    """Returns the currently configured LLM and embedding model."""
    return {
        "llm": {
            "model_name": getattr(Settings.llm, 'model_name', 'N/A'),
            "class": Settings.llm.__class__.__name__,
        },
        "embed_model": {
            "model_name": getattr(Settings.embed_model, 'model_name', 'N/A'),
            "class": Settings.embed_model.__class__.__name__,
        }
    }