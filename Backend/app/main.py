from fastapi import FastAPI
from app.api.routes.upload import router as upload_router

app = FastAPI(
    title="Aura AI",
    version="0.1.0"
)

app.include_router(upload_router)


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