from fastapi import APIRouter
from .endpoints import chat, upload, config

api_router = APIRouter()
api_router.include_router(chat.router, prefix="/chat", tags=["Chat"])
api_router.include_router(upload.router, prefix="/upload", tags=["Upload"])
api_router.include_router(config.router, prefix="/config", tags=["Config"])