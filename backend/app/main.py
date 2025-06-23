from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.core.settings import settings # Ensures settings are loaded on startup

app = FastAPI(
    title="Amr Elhady - AI Portfolio Backend",
    version="1.0.0",
    description="A robust backend for a RAG and Agent-based chat application using LlamaIndex and FastAPI.",
)

# Configure CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Be more specific in production, e.g., ["https://www.aelhady.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the main API router
app.include_router(api_router, prefix="/api/v1")

@app.on_event("startup")
def on_startup():
    """Actions to perform on application startup."""
    print("--- Application starting up ---")
    # You can pre-warm the engine here to avoid a cold start on the first request
    from app.core.engine import get_chat_engine
    get_chat_engine()
    print("--- Application startup complete ---")

@app.get("/", tags=["Health Check"])
def health_check():
    """A simple health check endpoint to confirm the server is running."""
    return {"status": "ok", "message": "API is running"}