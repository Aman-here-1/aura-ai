import pandas as pd

from app.agents.business_metrics.metric_utils import metric_utils


class SalesMetrics:

    # -----------------------------------------
    # Total Orders
    # -----------------------------------------

    def total_orders(
        self,
        dataframe: pd.DataFrame,
    ):

        return len(dataframe)

    # -----------------------------------------
    # Total Units Sold
    # -----------------------------------------

    def total_units(
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
    # Average Order Value
    # -----------------------------------------

    def average_order_value(
        self,
        dataframe: pd.DataFrame,
    ):

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        if revenue is None:

            return None

        if len(dataframe) == 0:

            return 0

        return round(

            dataframe[revenue].sum()

            / len(dataframe),

            2,

        )

    # -----------------------------------------
    # Average Quantity
    # -----------------------------------------

    def average_quantity(
        self,
        dataframe: pd.DataFrame,
    ):

        quantity = metric_utils.quantity_column(
            dataframe,
        )

        if quantity is None:

            return None

        return float(
            dataframe[quantity].mean()
        )

    # -----------------------------------------
    # Maximum Order Value
    # -----------------------------------------

    def maximum_order_value(
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
    # Minimum Order Value
    # -----------------------------------------

    def minimum_order_value(
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
    # Sales By Product
    # -----------------------------------------

    def sales_by_product(
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
    # Sales By Category
    # -----------------------------------------

    def sales_by_category(
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
    # Sales By Region
    # -----------------------------------------

    def sales_by_region(
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
    # Monthly Sales Trend
    # -----------------------------------------

    def monthly_sales(
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

                df[date].dt.to_period("M")

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
    # Quarterly Sales
    # -----------------------------------------

    def quarterly_sales(
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

                df[date].dt.to_period("Q")

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
    # Yearly Sales
    # -----------------------------------------

    def yearly_sales(
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
    # Top Selling Products
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
    # Bottom Selling Products
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
    # Sales Growth
    # -----------------------------------------

    def sales_growth(
        self,
        dataframe: pd.DataFrame,
    ):

        monthly = self.monthly_sales(
            dataframe,
        )

        if len(monthly) < 2:

            return None

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        previous = monthly[-2][revenue]

        current = monthly[-1][revenue]

        if previous == 0:

            return None

        return round(

            ((current - previous) / previous) * 100,

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

            "total_orders": self.total_orders(
                dataframe,
            ),

            "total_units": self.total_units(
                dataframe,
            ),

            "average_order_value": self.average_order_value(
                dataframe,
            ),

            "average_quantity": self.average_quantity(
                dataframe,
            ),

            "maximum_order_value": self.maximum_order_value(
                dataframe,
            ),

            "minimum_order_value": self.minimum_order_value(
                dataframe,
            ),

            "sales_growth": self.sales_growth(
                dataframe,
            ),

            "monthly_sales": self.monthly_sales(
                dataframe,
            ),

            "quarterly_sales": self.quarterly_sales(
                dataframe,
            ),

            "yearly_sales": self.yearly_sales(
                dataframe,
            ),

            "sales_by_product": self.sales_by_product(
                dataframe,
            ),

            "sales_by_category": self.sales_by_category(
                dataframe,
            ),

            "sales_by_region": self.sales_by_region(
                dataframe,
            ),

            "top_products": self.top_products(
                dataframe,
            ),

            "bottom_products": self.bottom_products(
                dataframe,
            ),

        }


sales_metrics = SalesMetrics()