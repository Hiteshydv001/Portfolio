from llama_index.core import SimpleDirectoryReader
from .settings import settings

def get_documents():
    """Loads all documents from the configured data directory."""
    print(f"Loading documents from: {settings.data_dir}")
    # The SimpleDirectoryReader will automatically handle various file types
    # like .md, .pdf, .docx, etc.
    return SimpleDirectoryReader(settings.data_dir).load_data()