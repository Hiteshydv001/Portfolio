import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from llama_index.core.settings import Settings
from llama_index.llms.gemini import Gemini
from llama_index.embeddings.gemini import GeminiEmbedding

# Define absolute paths for data and cache directories for robustness
APP_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(APP_ROOT)
DATA_DIR = os.path.join(PROJECT_ROOT, "data")
CACHE_DIR = os.path.join(PROJECT_ROOT, "cache")

# Ensure directories exist
os.makedirs(CACHE_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)

class AppSettings(BaseSettings):
    """Manages application settings and secrets, loaded from .env file."""
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    google_api_key: str
    e2b_api_key: str
    openweather_api_key: str
    data_dir: str = DATA_DIR
    cache_dir: str = CACHE_DIR

def init_settings():
    """Initializes the global LlamaIndex settings with Gemini models."""
    app_settings = AppSettings()
    os.environ["GOOGLE_API_KEY"] = app_settings.google_api_key

    Settings.llm = Gemini(model_name="models/gemini-1.5-flash-latest")
    Settings.embed_model = GeminiEmbedding(model_name="models/embedding-001")
    Settings.chunk_size = 1024
    Settings.chunk_overlap = 20
    
    print("LlamaIndex global settings initialized with Gemini models.")
    return app_settings

# Initialize settings once on application import
settings = init_settings()