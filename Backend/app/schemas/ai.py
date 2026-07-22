from typing import Any
from pydantic import BaseModel


class AIReportRequest(BaseModel):
    headers: list[str]
    intelligence: dict[str, Any]
    kpis: dict[str, Any]
    preview: list[dict[str, Any]]


class AIReportResponse(BaseModel):
    summary: str
    insights: list[str]
    recommendations: list[str]
    risks: list[str]
    action_plan: list[str]