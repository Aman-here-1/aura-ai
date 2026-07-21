import pandas as pd
from fastapi import UploadFile

from app.services.intelligence_service import detect_dataset
from app.services.kpi_service import generate_kpis
from app.services.chart_service import recommend_charts


async def parse_excel(file: UploadFile):
    # Read Excel first
    df = pd.read_excel(file.file)

    # Detect dataset intelligence
    intelligence = detect_dataset(df.columns.tolist())

    # Generate KPIs
    kpis = generate_kpis(df, intelligence)

    # Recommend charts
    charts = recommend_charts(intelligence)

    # Return API response
    return {
        "rows": len(df),
        "columns": len(df.columns),
        "headers": df.columns.tolist(),

        "intelligence": intelligence,

        "kpis": kpis,

        "recommended_charts": charts,

        "preview": (
            df.head(10)
            .fillna("")
            .to_dict(orient="records")
        ),
    }