import pandas as pd
from fastapi import UploadFile

from app.services.intelligence_service import detect_dataset
from app.services.kpi_service import generate_kpis
from app.services.chart_service import recommend_charts
from app.services.analytics_service import generate_chart_data
# from app.services.analytics_service import generate_chart_data
from app.services.context_service import build_business_context

async def parse_excel(file: UploadFile):
    # Read Excel first
    df = pd.read_excel(file.file)

    # Detect dataset intelligence
    intelligence = detect_dataset(df.columns.tolist())

    # Generate KPIs
    kpis = generate_kpis(df, intelligence)

    # Recommend charts
    charts = recommend_charts(intelligence)

    chart_data = generate_chart_data(df, intelligence)

    # Return API response
    return {
        "rows": len(df),
    "columns": len(df.columns),
    "headers": df.columns.tolist(),

    "intelligence": intelligence,

    "kpis": kpis,

    "recommended_charts": charts,

    "chart_data": chart_data,

    "preview": (
        df.head(10)
        .fillna("")
        .to_dict(orient="records")
        ),
    }