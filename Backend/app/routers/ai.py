from fastapi import APIRouter, HTTPException

from app.ai.report_generator import report_generator
from app.schemas.ai import AIReportRequest, AIReportResponse

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"]
)


@router.post(
    "/report",
    response_model=AIReportResponse
)
def generate_ai_report(request: AIReportRequest):

    try:

        report = report_generator.generate(
            headers=request.headers,
            intelligence=request.intelligence,
            kpis=request.kpis,
            preview=request.preview
        )

        return AIReportResponse(**report)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )