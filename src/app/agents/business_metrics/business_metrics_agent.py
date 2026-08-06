import pandas as pd

from app.agents.business_metrics.metric_utils import metric_utils
from app.agents.business_metrics.revenue_metrics import revenue_metrics
from app.agents.business_metrics.sales_metrics import sales_metrics
from app.agents.business_metrics.customer_metrics import customer_metrics
from app.agents.business_metrics.product_metrics import product_metrics
from app.agents.business_metrics.finance_metrics import finance_metrics


class BusinessMetricsAgent:

    # -----------------------------------------
    # Dataset Profile
    # -----------------------------------------

    def dataset_profile(
        self,
        dataframe: pd.DataFrame,
    ):

        return metric_utils.dataset_summary(
            dataframe,
        )

    # -----------------------------------------
    # Revenue Metrics
    # -----------------------------------------

    def revenue_metrics(
        self,
        dataframe: pd.DataFrame,
    ):

        return revenue_metrics.generate(
            dataframe,
        )

    # -----------------------------------------
    # Sales Metrics
    # -----------------------------------------

    def sales_metrics(
        self,
        dataframe: pd.DataFrame,
    ):

        return sales_metrics.generate(
            dataframe,
        )

    # -----------------------------------------
    # Customer Metrics
    # -----------------------------------------

    def customer_metrics(
        self,
        dataframe: pd.DataFrame,
    ):

        return customer_metrics.generate(
            dataframe,
        )

    # -----------------------------------------
    # Product Metrics
    # -----------------------------------------

    def product_metrics(
        self,
        dataframe: pd.DataFrame,
    ):

        return product_metrics.generate(
            dataframe,
        )

    # -----------------------------------------
    # Finance Metrics
    # -----------------------------------------

    def finance_metrics(
        self,
        dataframe: pd.DataFrame,
    ):

        return finance_metrics.generate(
            dataframe,
        )

    # -----------------------------------------
    # Business Summary
    # -----------------------------------------

    def business_summary(
        self,
        dataframe: pd.DataFrame,
    ):

        profile = self.dataset_profile(
            dataframe,
        )

        revenue = self.revenue_metrics(
            dataframe,
        )

        sales = self.sales_metrics(
            dataframe,
        )

        customer = self.customer_metrics(
            dataframe,
        )

        product = self.product_metrics(
            dataframe,
        )

        finance = self.finance_metrics(
            dataframe,
        )

        return {

            "dataset": profile,

            "revenue": revenue,

            "sales": sales,

            "customers": customer,

            "products": product,

            "finance": finance,

        }
        
            # -----------------------------------------
    # Business KPIs
    # -----------------------------------------

    def business_kpis(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = self.revenue_metrics(
            dataframe,
        )

        sales = self.sales_metrics(
            dataframe,
        )

        customers = self.customer_metrics(
            dataframe,
        )

        products = self.product_metrics(
            dataframe,
        )

        finance = self.finance_metrics(
            dataframe,
        )

        return {

            "total_revenue": revenue.get(
                "statistics",
                {},
            ).get(
                "total",
            ),

            "total_orders": sales.get(
                "total_orders",
            ),

            "total_customers": customers.get(
                "total_customers",
            ),

            "total_products": products.get(
                "total_products",
            ),

            "total_profit": finance.get(
                "total_profit",
            ),

            "profit_margin": finance.get(
                "profit_margin",
            ),

        }

    # -----------------------------------------
    # AI Highlights
    # -----------------------------------------

    def ai_highlights(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = self.revenue_metrics(
            dataframe,
        )

        sales = self.sales_metrics(
            dataframe,
        )

        customers = self.customer_metrics(
            dataframe,
        )

        finance = self.finance_metrics(
            dataframe,
        )

        highlights = []

        growth = revenue.get(
            "growth",
        )

        if growth is not None:

            if growth > 0:

                highlights.append(

                    f"Revenue increased by {growth}%."

                )

            elif growth < 0:

                highlights.append(

                    f"Revenue decreased by {abs(growth)}%."

                )

        profit_growth = finance.get(
            "profit_growth",
        )

        if profit_growth is not None:

            highlights.append(

                f"Profit growth: {profit_growth}%."

            )

        total_orders = sales.get(
            "total_orders",
        )

        if total_orders:

            highlights.append(

                f"{total_orders:,} orders processed."

            )

        total_customers = customers.get(
            "total_customers",
        )

        if total_customers:

            highlights.append(

                f"{total_customers:,} unique customers served."

            )

        return highlights

    # -----------------------------------------
    # Executive Summary
    # -----------------------------------------

    def executive_summary(
        self,
        dataframe: pd.DataFrame,
    ):

        profile = self.dataset_profile(
            dataframe,
        )

        kpis = self.business_kpis(
            dataframe,
        )

        highlights = self.ai_highlights(
            dataframe,
        )

        return {

            "dataset_rows": profile["rows"],

            "dataset_columns": profile["columns"],

            "kpis": kpis,

            "highlights": highlights,

        }

    # -----------------------------------------
    # Generate
    # -----------------------------------------

    def generate(
        self,
        dataframe: pd.DataFrame,
    ):

        return {

            "profile": self.dataset_profile(
                dataframe,
            ),

            "summary": self.business_summary(
                dataframe,
            ),

            "executive": self.executive_summary(
                dataframe,
            ),

            "highlights": self.ai_highlights(
                dataframe,
            ),

            "kpis": self.business_kpis(
                dataframe,
            ),

        }


business_metrics_agent = BusinessMetricsAgent()