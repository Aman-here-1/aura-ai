from pydantic import BaseModel

class UploadResponse(BaseModel):
    rows: int
    columns: int
    headers: list[str]
    preview: list[dict]