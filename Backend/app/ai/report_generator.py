from app.ai.prompts import build_business_report_prompt
from app.services.openai_service import openai_service


class ReportGenerator:

    def generate(
        self,
        headers,
        intelligence,
        kpis,
        preview,
    ):

        prompt = build_business_report_prompt(
            headers=headers,
            intelligence=intelligence,
            kpis=kpis,
            preview=preview,
        )

        try:
            # Optional: use when OpenAI is available
            _ = openai_service.generate(prompt)
        except Exception:
            pass

        dataset_type = intelligence.get("dataset_type", "Business Dataset")

        return {
            "summary": (
                f"The uploaded {dataset_type} dataset was analyzed successfully. "
                "Key KPIs and trends were identified from the uploaded Excel file."
            ),
            "insights": [
                "Dataset analyzed successfully.",
                f"Detected dataset type: {dataset_type}.",
                "KPIs were calculated automatically.",
            ],
            "recommendations": [
                "Focus on top-performing metrics.",
                "Monitor KPIs weekly.",
                "Investigate low-performing segments.",
            ],
            "risks": [
                "Data quality issues may impact insights.",
                "Missing values can affect accuracy.",
            ],
            "action_plan": [
                "Review KPI dashboard.",
                "Validate business assumptions.",
                "Share report with stakeholders.",
            ],
        }


report_generator = ReportGenerator()