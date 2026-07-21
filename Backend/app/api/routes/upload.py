from fastapi import APIRouter, UploadFile, File

from app.services.excel_service import parse_excel
from app.schemas.upload import UploadResponse
router = APIRouter(prefix="/api", tags=["Upload"])


@router.post(
    "/upload",
    response_model=UploadResponse
)
async def upload(
    file: UploadFile = File(...)
):
    return await parse_excel(file)