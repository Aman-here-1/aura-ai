from typing import Any


def build_business_context(
    rows: int,
    columns: int,
    intelligence: dict,
    kpis: dict,
    chart_data: dict,
) -> dict[str, Any]:

    return {
        "dataset_type": "Sales",

        "dataset_summary": {
            "rows": rows,
            "columns": columns,
        },

        "detected_columns": intelligence,

        "business_metrics": kpis,

        "analytics": chart_data,
    }