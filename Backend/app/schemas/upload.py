from pydantic import BaseModel
from typing import Any


class UploadResponse(BaseModel):
    rows: int
    columns: int

    headers: list[str]

    intelligence: dict[str, Any]

    kpis: dict[str, Any]

    recommended_charts: list[dict[str, Any]]

    chart_data: dict[str, Any]

    preview: list[dict[str, Any]]