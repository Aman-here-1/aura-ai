import pandas as pd

from app.agents.business_metrics.metric_utils import metric_utils


class ProductMetrics:

    # -----------------------------------------
    # Total Products
    # -----------------------------------------

    def total_products(
        self,
        dataframe: pd.DataFrame,
    ):

        product = metric_utils.product_column(
            dataframe,
        )

        if product is None:

            return None

        return int(
            dataframe[product].nunique()
        )

    # -----------------------------------------
    # Total Quantity Sold
    # -----------------------------------------

    def total_quantity(
        self,
        dataframe: pd.DataFrame,
    ):

        quantity = metric_utils.quantity_column(
            dataframe,
        )

        if quantity is None:

            return None

        return float(
            dataframe[quantity].sum()
        )

    # -----------------------------------------
    # Average Product Revenue
    # -----------------------------------------

    def average_product_revenue(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        product = metric_utils.product_column(
            dataframe,
        )

        if revenue is None or product is None:

            return None

        result = (

            dataframe

            .groupby(product)[revenue]

            .sum()

        )

        return round(

            float(result.mean()),

            2,

        )

    # -----------------------------------------
    # Revenue By Product
    # -----------------------------------------

    def revenue_by_product(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        product = metric_utils.product_column(
            dataframe,
        )

        if revenue is None or product is None:

            return []

        result = (

            dataframe

            .groupby(product)[revenue]

            .sum()

            .sort_values(
                ascending=False,
            )

            .reset_index()

        )

        return result.to_dict(
            orient="records",
        )

    # -----------------------------------------
    # Quantity By Product
    # -----------------------------------------

    def quantity_by_product(
        self,
        dataframe: pd.DataFrame,
    ):

        quantity = metric_utils.quantity_column(
            dataframe,
        )

        product = metric_utils.product_column(
            dataframe,
        )

        if quantity is None or product is None:

            return []

        result = (

            dataframe

            .groupby(product)[quantity]

            .sum()

            .sort_values(
                ascending=False,
            )

            .reset_index()

        )

        return result.to_dict(
            orient="records",
        )

    # -----------------------------------------
    # Top Products
    # -----------------------------------------

    def top_products(
        self,
        dataframe: pd.DataFrame,
        limit: int = 10,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        product = metric_utils.product_column(
            dataframe,
        )

        if revenue is None or product is None:

            return []

        result = (

            dataframe

            .groupby(product)[revenue]

            .sum()

            .sort_values(
                ascending=False,
            )

            .head(limit)

            .reset_index()

        )

        return result.to_dict(
            orient="records",
        )

    # -----------------------------------------
    # Bottom Products
    # -----------------------------------------

    def bottom_products(
        self,
        dataframe: pd.DataFrame,
        limit: int = 10,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        product = metric_utils.product_column(
            dataframe,
        )

        if revenue is None or product is None:

            return []

        result = (

            dataframe

            .groupby(product)[revenue]

            .sum()

            .sort_values()

            .head(limit)

            .reset_index()

        )

        return result.to_dict(
            orient="records",
        )
        
            # -----------------------------------------
    # Product Growth
    # -----------------------------------------

    def product_growth(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        product = metric_utils.product_column(
            dataframe,
        )

        date = metric_utils.date_column(
            dataframe,
        )

        if (
            revenue is None
            or product is None
            or date is None
        ):

            return []

        df = dataframe.copy()

        df[date] = pd.to_datetime(
            df[date],
            errors="coerce",
        )

        result = (

            df

            .groupby(
                [
                    df[date].dt.to_period("M"),
                    product,
                ]
            )[revenue]

            .sum()

            .reset_index()

        )

        result[date] = result[
            date
        ].astype(str)

        return result.to_dict(
            orient="records",
        )

    # -----------------------------------------
    # Product Performance Score
    # -----------------------------------------

    def product_performance(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        quantity = metric_utils.quantity_column(
            dataframe,
        )

        product = metric_utils.product_column(
            dataframe,
        )

        if (
            revenue is None
            or quantity is None
            or product is None
        ):

            return []

        result = (

            dataframe

            .groupby(product)

            .agg({

                revenue: "sum",

                quantity: "sum",

            })

            .reset_index()

        )

        result["performance_score"] = (

            result[revenue] * 0.7

            +

            result[quantity] * 0.3

        )

        result = result.sort_values(

            "performance_score",

            ascending=False,

        )

        return result.to_dict(
            orient="records",
        )

    # -----------------------------------------
    # ABC Analysis
    # -----------------------------------------

    def abc_analysis(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        product = metric_utils.product_column(
            dataframe,
        )

        if revenue is None or product is None:

            return []

        df = (

            dataframe

            .groupby(product)[revenue]

            .sum()

            .sort_values(
                ascending=False,
            )

            .reset_index()

        )

        total = df[
            revenue
        ].sum()

        df["percentage"] = (

            df[revenue]

            / total

        ) * 100

        df["cumulative"] = (

            df["percentage"]

            .cumsum()

        )

        def classify(value):

            if value <= 80:

                return "A"

            if value <= 95:

                return "B"

            return "C"

        df["class"] = df[
            "cumulative"
        ].apply(classify)

        return df.to_dict(
            orient="records",
        )

    # -----------------------------------------
    # Pareto Analysis
    # -----------------------------------------

    def pareto_analysis(
        self,
        dataframe: pd.DataFrame,
    ):

        analysis = self.abc_analysis(
            dataframe,
        )

        if not analysis:

            return {}

        a = len([
            x for x in analysis
            if x["class"] == "A"
        ])

        b = len([
            x for x in analysis
            if x["class"] == "B"
        ])

        c = len([
            x for x in analysis
            if x["class"] == "C"
        ])

        return {

            "A": a,

            "B": b,

            "C": c,

            "details": analysis,

        }

    # -----------------------------------------
    # Generate
    # -----------------------------------------

    def generate(
        self,
        dataframe: pd.DataFrame,
    ):

        return {

            "total_products": self.total_products(
                dataframe,
            ),

            "total_quantity": self.total_quantity(
                dataframe,
            ),

            "average_product_revenue": self.average_product_revenue(
                dataframe,
            ),

            "revenue_by_product": self.revenue_by_product(
                dataframe,
            ),

            "quantity_by_product": self.quantity_by_product(
                dataframe,
            ),

            "top_products": self.top_products(
                dataframe,
            ),

            "bottom_products": self.bottom_products(
                dataframe,
            ),

            "product_growth": self.product_growth(
                dataframe,
            ),

            "product_performance": self.product_performance(
                dataframe,
            ),

            "abc_analysis": self.abc_analysis(
                dataframe,
            ),

            "pareto_analysis": self.pareto_analysis(
                dataframe,
            ),

        }


product_metrics = ProductMetrics()