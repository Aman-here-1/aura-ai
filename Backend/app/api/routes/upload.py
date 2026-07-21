from fastapi import APIRouter, UploadFile, File

from app.services.excel_service import parse_excel

router = APIRouter(prefix="/api", tags=["Upload"])


@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    return await parse_excel(file)