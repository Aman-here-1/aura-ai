import pandas as pd

from app.agents.business_metrics.metric_utils import metric_utils


class FinanceMetrics:

    # -----------------------------------------
    # Total Profit
    # -----------------------------------------

    def total_profit(
        self,
        dataframe: pd.DataFrame,
    ):

        profit = metric_utils.profit_column(
            dataframe,
        )

        if profit is None:

            return None

        return float(
            dataframe[profit].sum()
        )

    # -----------------------------------------
    # Average Profit
    # -----------------------------------------

    def average_profit(
        self,
        dataframe: pd.DataFrame,
    ):

        profit = metric_utils.profit_column(
            dataframe,
        )

        if profit is None:

            return None

        return float(
            dataframe[profit].mean()
        )

    # -----------------------------------------
    # Maximum Profit
    # -----------------------------------------

    def maximum_profit(
        self,
        dataframe: pd.DataFrame,
    ):

        profit = metric_utils.profit_column(
            dataframe,
        )

        if profit is None:

            return None

        return float(
            dataframe[profit].max()
        )

    # -----------------------------------------
    # Minimum Profit
    # -----------------------------------------

    def minimum_profit(
        self,
        dataframe: pd.DataFrame,
    ):

        profit = metric_utils.profit_column(
            dataframe,
        )

        if profit is None:

            return None

        return float(
            dataframe[profit].min()
        )

    # -----------------------------------------
    # Total Cost
    # -----------------------------------------

    def total_cost(
        self,
        dataframe: pd.DataFrame,
    ):

        cost = metric_utils.cost_column(
            dataframe,
        )

        if cost is None:

            return None

        return float(
            dataframe[cost].sum()
        )

    # -----------------------------------------
    # Profit Margin
    # -----------------------------------------

    def profit_margin(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        profit = metric_utils.profit_column(
            dataframe,
        )

        if revenue is None or profit is None:

            return None

        total_revenue = dataframe[
            revenue
        ].sum()

        if total_revenue == 0:

            return 0

        return round(

            (

                dataframe[
                    profit
                ].sum()

                / total_revenue

            ) * 100,

            2,

        )

    # -----------------------------------------
    # Profit By Region
    # -----------------------------------------

    def profit_by_region(
        self,
        dataframe: pd.DataFrame,
    ):

        profit = metric_utils.profit_column(
            dataframe,
        )

        region = metric_utils.region_column(
            dataframe,
        )

        if profit is None or region is None:

            return []

        result = (

            dataframe

            .groupby(region)[profit]

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
    # Profit By Product
    # -----------------------------------------

    def profit_by_product(
        self,
        dataframe: pd.DataFrame,
    ):

        profit = metric_utils.profit_column(
            dataframe,
        )

        product = metric_utils.product_column(
            dataframe,
        )

        if profit is None or product is None:

            return []

        result = (

            dataframe

            .groupby(product)[profit]

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
    # Monthly Profit Trend
    # -----------------------------------------

    def monthly_profit(
        self,
        dataframe: pd.DataFrame,
    ):

        profit = metric_utils.profit_column(
            dataframe,
        )

        date = metric_utils.date_column(
            dataframe,
        )

        if profit is None or date is None:

            return []

        df = dataframe.copy()

        df[date] = pd.to_datetime(
            df[date],
            errors="coerce",
        )

        result = (

            df

            .groupby(
                df[date].dt.to_period("M")
            )[profit]

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
    # Quarterly Profit
    # -----------------------------------------

    def quarterly_profit(
        self,
        dataframe: pd.DataFrame,
    ):

        profit = metric_utils.profit_column(
            dataframe,
        )

        date = metric_utils.date_column(
            dataframe,
        )

        if profit is None or date is None:

            return []

        df = dataframe.copy()

        df[date] = pd.to_datetime(
            df[date],
            errors="coerce",
        )

        result = (

            df

            .groupby(
                df[date].dt.to_period("Q")
            )[profit]

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
    # Yearly Profit
    # -----------------------------------------

    def yearly_profit(
        self,
        dataframe: pd.DataFrame,
    ):

        profit = metric_utils.profit_column(
            dataframe,
        )

        date = metric_utils.date_column(
            dataframe,
        )

        if profit is None or date is None:

            return []

        df = dataframe.copy()

        df[date] = pd.to_datetime(
            df[date],
            errors="coerce",
        )

        result = (

            df

            .groupby(
                df[date].dt.year
            )[profit]

            .sum()

            .reset_index()

        )

        return result.to_dict(
            orient="records",
        )

    # -----------------------------------------
    # Gross Margin
    # -----------------------------------------

    def gross_margin(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        cost = metric_utils.cost_column(
            dataframe,
        )

        if revenue is None or cost is None:

            return None

        revenue_total = dataframe[
            revenue
        ].sum()

        if revenue_total == 0:

            return 0

        gross_profit = (

            revenue_total

            - dataframe[cost].sum()

        )

        return round(

            (gross_profit / revenue_total)

            * 100,

            2,

        )

    # -----------------------------------------
    # Profit Growth
    # -----------------------------------------

    def profit_growth(
        self,
        dataframe: pd.DataFrame,
    ):

        monthly = self.monthly_profit(
            dataframe,
        )

        if len(monthly) < 2:

            return None

        profit = metric_utils.profit_column(
            dataframe,
        )

        previous = monthly[-2][profit]

        current = monthly[-1][profit]

        if previous == 0:

            return None

        return round(

            (

                (current - previous)

                / previous

            ) * 100,

            2,

        )

    # -----------------------------------------
    # Cost Analysis
    # -----------------------------------------

    def cost_analysis(
        self,
        dataframe: pd.DataFrame,
    ):

        cost = metric_utils.cost_column(
            dataframe,
        )

        if cost is None:

            return {}

        return {

            "total_cost": float(
                dataframe[cost].sum()
            ),

            "average_cost": float(
                dataframe[cost].mean()
            ),

            "maximum_cost": float(
                dataframe[cost].max()
            ),

            "minimum_cost": float(
                dataframe[cost].min()
            ),

        }

    # -----------------------------------------
    # Generate
    # -----------------------------------------

    def generate(
        self,
        dataframe: pd.DataFrame,
    ):

        return {

            "total_profit": self.total_profit(
                dataframe,
            ),

            "average_profit": self.average_profit(
                dataframe,
            ),

            "maximum_profit": self.maximum_profit(
                dataframe,
            ),

            "minimum_profit": self.minimum_profit(
                dataframe,
            ),

            "total_cost": self.total_cost(
                dataframe,
            ),

            "profit_margin": self.profit_margin(
                dataframe,
            ),

            "gross_margin": self.gross_margin(
                dataframe,
            ),

            "profit_growth": self.profit_growth(
                dataframe,
            ),

            "cost_analysis": self.cost_analysis(
                dataframe,
            ),

            "monthly_profit": self.monthly_profit(
                dataframe,
            ),

            "quarterly_profit": self.quarterly_profit(
                dataframe,
            ),

            "yearly_profit": self.yearly_profit(
                dataframe,
            ),

            "profit_by_region": self.profit_by_region(
                dataframe,
            ),

            "profit_by_product": self.profit_by_product(
                dataframe,
            ),

        }


finance_metrics = FinanceMetrics()