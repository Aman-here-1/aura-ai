import pandas as pd

from app.agents.business_metrics.metric_utils import metric_utils


class CustomerMetrics:

    # -----------------------------------------
    # Total Customers
    # -----------------------------------------

    def total_customers(
        self,
        dataframe: pd.DataFrame,
    ):

        customer = metric_utils.customer_column(
            dataframe,
        )

        if customer is None:

            return None

        return int(
            dataframe[customer].nunique()
        )

    # -----------------------------------------
    # Total Transactions
    # -----------------------------------------

    def total_transactions(
        self,
        dataframe: pd.DataFrame,
    ):

        return len(dataframe)

    # -----------------------------------------
    # Average Revenue Per Customer
    # -----------------------------------------

    def average_revenue_per_customer(
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

            return None

        customers = dataframe[
            customer
        ].nunique()

        if customers == 0:

            return 0

        return round(

            dataframe[revenue].sum()
            / customers,

            2,

        )

    # -----------------------------------------
    # Customer Lifetime Value
    # -----------------------------------------

    def customer_lifetime_value(
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

            return None

        clv = (

            dataframe

            .groupby(customer)[revenue]

            .sum()

            .mean()

        )

        return round(
            float(clv),
            2,
        )

    # -----------------------------------------
    # Top Customers
    # -----------------------------------------

    def top_customers(
        self,
        dataframe: pd.DataFrame,
        limit: int = 10,
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

            .head(limit)

            .reset_index()

        )

        return result.to_dict(
            orient="records",
        )

    # -----------------------------------------
    # Bottom Customers
    # -----------------------------------------

    def bottom_customers(
        self,
        dataframe: pd.DataFrame,
        limit: int = 10,
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
                ascending=True,
            )

            .head(limit)

            .reset_index()

        )

        return result.to_dict(
            orient="records",
        )

    # -----------------------------------------
    # Repeat Customers
    # -----------------------------------------

    def repeat_customers(
        self,
        dataframe: pd.DataFrame,
    ):

        customer = metric_utils.customer_column(
            dataframe,
        )

        if customer is None:

            return None

        counts = dataframe[
            customer
        ].value_counts()

        return int(
            (counts > 1).sum()
        )

    # -----------------------------------------
    # New Customers
    # -----------------------------------------

    def new_customers(
        self,
        dataframe: pd.DataFrame,
    ):

        customer = metric_utils.customer_column(
            dataframe,
        )

        if customer is None:

            return None

        counts = dataframe[
            customer
        ].value_counts()

        return int(
            (counts == 1).sum()
        )
        
            # -----------------------------------------
    # Customer Growth
    # -----------------------------------------

    def customer_growth(
        self,
        dataframe: pd.DataFrame,
    ):

        customer = metric_utils.customer_column(
            dataframe,
        )

        date = metric_utils.date_column(
            dataframe,
        )

        if customer is None or date is None:

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

            )[customer]

            .nunique()

            .reset_index()

        )

        result[date] = result[
            date
        ].astype(str)

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
    # Customer Segmentation
    # -----------------------------------------

    def customer_segmentation(
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

        df = (

            dataframe

            .groupby(customer)[revenue]

            .sum()

            .reset_index()

        )

        q1 = df[
            revenue
        ].quantile(0.25)

        q2 = df[
            revenue
        ].quantile(0.50)

        q3 = df[
            revenue
        ].quantile(0.75)

        def segment(value):

            if value >= q3:
                return "Premium"

            if value >= q2:
                return "Gold"

            if value >= q1:
                return "Silver"

            return "Bronze"

        df["segment"] = df[
            revenue
        ].apply(segment)

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

        revenue = metric_utils.revenue_column(
            dataframe,
        )

        customer = metric_utils.customer_column(
            dataframe,
        )

        if revenue is None or customer is None:

            return {}

        df = (

            dataframe

            .groupby(customer)[revenue]

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

        top80 = df[
            df["cumulative"] <= 80
        ]

        return {

            "top_80_percent_customers": len(
                top80
            ),

            "total_customers": len(df),

            "details": df.to_dict(
                orient="records",
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

            "total_customers": self.total_customers(
                dataframe,
            ),

            "total_transactions": self.total_transactions(
                dataframe,
            ),

            "repeat_customers": self.repeat_customers(
                dataframe,
            ),

            "new_customers": self.new_customers(
                dataframe,
            ),

            "average_revenue_per_customer": self.average_revenue_per_customer(
                dataframe,
            ),

            "customer_lifetime_value": self.customer_lifetime_value(
                dataframe,
            ),

            "customer_growth": self.customer_growth(
                dataframe,
            ),

            "revenue_by_customer": self.revenue_by_customer(
                dataframe,
            ),

            "customer_segmentation": self.customer_segmentation(
                dataframe,
            ),

            "pareto_analysis": self.pareto_analysis(
                dataframe,
            ),

            "top_customers": self.top_customers(
                dataframe,
            ),

            "bottom_customers": self.bottom_customers(
                dataframe,
            ),

        }


customer_metrics = CustomerMetrics()