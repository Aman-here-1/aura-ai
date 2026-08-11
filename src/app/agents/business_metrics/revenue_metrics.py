import pandas as pd

from app.agents.business_metrics.metric_utils import metric_utils


class RevenueMetrics:

    # -----------------------------------------
    # Total Revenue
    # -----------------------------------------

    def total_revenue(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        if revenue is None:
            return None

        return float(
            dataframe[revenue].sum()
        )

    # -----------------------------------------
    # Average Revenue
    # -----------------------------------------

    def average_revenue(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        if revenue is None:
            return None

        return float(
            dataframe[revenue].mean()
        )

    # -----------------------------------------
    # Maximum Revenue
    # -----------------------------------------

    def maximum_revenue(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        if revenue is None:
            return None

        return float(
            dataframe[revenue].max()
        )

    # -----------------------------------------
    # Minimum Revenue
    # -----------------------------------------

    def minimum_revenue(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        if revenue is None:
            return None

        return float(
            dataframe[revenue].min()
        )

    # -----------------------------------------
    # Median Revenue
    # -----------------------------------------

    def median_revenue(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        if revenue is None:
            return None

        return float(
            dataframe[revenue].median()
        )

    # -----------------------------------------
    # Revenue Statistics
    # -----------------------------------------

    def revenue_statistics(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        if revenue is None:

            return {}

        series = dataframe[revenue]

        return {

            "total": float(series.sum()),

            "average": float(series.mean()),

            "median": float(series.median()),

            "minimum": float(series.min()),

            "maximum": float(series.max()),

            "std": float(series.std()),

            "variance": float(series.var()),

        }

    # -----------------------------------------
    # Revenue By Region
    # -----------------------------------------

    def revenue_by_region(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        region = metric_utils.region_column(
            dataframe,
        )

        if revenue is None or region is None:

            return []

        result = (

            dataframe

            .groupby(region)[revenue]

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
    # Revenue By Category
    # -----------------------------------------

    def revenue_by_category(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        category = metric_utils.category_column(
            dataframe,
        )

        if revenue is None or category is None:

            return []

        result = (

            dataframe

            .groupby(category)[revenue]

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
    # Revenue By Customer
    # -----------------------------------------

    def revenue_by_customer(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        customer = metric_utils.customer_column(
            dataframe,
        )

        if revenue is None or customer is None:

            return []

        result = (

            dataframe

            .groupby(customer)[revenue]

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
    # Monthly Revenue Trend
    # -----------------------------------------

    def monthly_revenue(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        date = metric_utils.date_column(
            dataframe,
        )

        if revenue is None or date is None:

            return []

        df = dataframe.copy()

        df[date] = pd.to_datetime(
            df[date],
            errors="coerce",
        )

        result = (

            df

            .groupby(

                df[date].dt.to_period(
                    "M",
                )

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
    # Quarterly Revenue
    # -----------------------------------------

    def quarterly_revenue(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        date = metric_utils.date_column(
            dataframe,
        )

        if revenue is None or date is None:

            return []

        df = dataframe.copy()

        df[date] = pd.to_datetime(
            df[date],
            errors="coerce",
        )

        result = (

            df

            .groupby(

                df[date].dt.to_period(
                    "Q",
                )

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
    # Yearly Revenue
    # -----------------------------------------

    def yearly_revenue(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        date = metric_utils.date_column(
            dataframe,
        )

        if revenue is None or date is None:

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

            )[revenue]

            .sum()

            .reset_index()

        )

        return result.to_dict(
            orient="records",
        )

    # -----------------------------------------
    # Top Revenue Contributors
    # -----------------------------------------

    def top_contributors(
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
    # Bottom Revenue Contributors
    # -----------------------------------------

    def bottom_contributors(
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
    # Revenue Growth
    # -----------------------------------------

    def revenue_growth(
        self,
        dataframe: pd.DataFrame,
    ):

        monthly = self.monthly_revenue(
            dataframe,
        )

        if len(monthly) < 2:

            return None

        previous = monthly[-2]

        current = monthly[-1]

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        prev = previous[revenue]

        curr = current[revenue]

        if prev == 0:

            return None

        return round(

            ((curr - prev) / prev) * 100,

            2,

        )

    # -----------------------------------------
    # Generate
    # -----------------------------------------

    def generate(
        self,
        dataframe: pd.DataFrame,
    ):

        return {

            "statistics": self.revenue_statistics(
                dataframe,
            ),

            "growth": self.revenue_growth(
                dataframe,
            ),

            "monthly": self.monthly_revenue(
                dataframe,
            ),

            "quarterly": self.quarterly_revenue(
                dataframe,
            ),

            "yearly": self.yearly_revenue(
                dataframe,
            ),

            "by_region": self.revenue_by_region(
                dataframe,
            ),

            "by_category": self.revenue_by_category(
                dataframe,
            ),

            "by_product": self.revenue_by_product(
                dataframe,
            ),

            "by_customer": self.revenue_by_customer(
                dataframe,
            ),

            "top_contributors": self.top_contributors(
                dataframe,
            ),

            "bottom_contributors": self.bottom_contributors(
                dataframe,
            ),

        }


revenue_metrics = RevenueMetrics()