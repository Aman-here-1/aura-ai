from typing import Dict, List


def build_business_report_prompt(
    headers: List[str],
    intelligence: Dict,
    kpis: Dict,
    preview: List[Dict],
) -> str:

    return f"""
You are a Senior Business Analyst.

Analyze the dataset below.

Headers:
{headers}

Dataset Intelligence:
{intelligence}

KPIs:
{kpis}

Sample Data:
{preview[:10]}

Return ONLY valid JSON.

Do not include markdown.
Do not include explanation.

JSON format:

{{
    "executive_summary": "...",

    "key_insights": [
        "...",
        "...",
        "..."
    ],

    "recommendations": [
        "...",
        "..."
    ],

    "risks": [
        "...",
        "..."
    ],

    "action_plan": [
        "...",
        "..."
    ]
}}
"""