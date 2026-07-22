from fastapi import FastAPI

from app.api.routes.upload import router as upload_router
from app.routers.ai import router as ai_router

app = FastAPI(
    title="Aura AI",
    version="0.1.0"
)

# Register Routers
app.include_router(upload_router)
app.include_router(ai_router)


@app.get("/")
def root():
    return {
        "message": "Aura AI Backend Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }