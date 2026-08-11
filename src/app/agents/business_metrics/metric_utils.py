import re

import pandas as pd


class MetricUtils:

    # -----------------------------------------
    # Normalize Column Names
    # -----------------------------------------

    def normalize(self, columns: list[str]) -> dict:

        normalized = {}

        for column in columns:

            key = re.sub(
                r"[^a-z0-9]",
                "",
                column.lower(),
            )

            normalized[key] = column

        return normalized

    # -----------------------------------------
    # Find Column
    # -----------------------------------------

    def find_column(

        self,

        dataframe: pd.DataFrame,

        aliases: list[str],

    ) -> str | None:

        normalized = self.normalize(
            list(dataframe.columns)
        )

        for alias in aliases:

            alias = re.sub(
                r"[^a-z0-9]",
                "",
                alias.lower(),
            )

            if alias in normalized:

                return normalized[alias]

        return None

    # -----------------------------------------
    # Revenue
    # -----------------------------------------

    def revenue_column(
        self,
        dataframe,
    ):

        return self.find_column(

            dataframe,

            [

                "Revenue",

                "Sales",

                "Amount",

                "Total",

                "Net Sales",

                "Net Revenue",

                "Gross Revenue",

                "GMV",

            ],

        )

    # -----------------------------------------
    # Profit
    # -----------------------------------------

    def profit_column(
        self,
        dataframe,
    ):

        return self.find_column(

            dataframe,

            [

                "Profit",

                "Margin",

                "Net Profit",

                "Gross Profit",

                "Income",

            ],

        )

    # -----------------------------------------
    # Cost
    # -----------------------------------------

    def cost_column(
        self,
        dataframe,
    ):

        return self.find_column(

            dataframe,

            [

                "Cost",

                "Expense",

                "COGS",

                "Cost Price",

            ],

        )

    # -----------------------------------------
    # Quantity
    # -----------------------------------------

    def quantity_column(
        self,
        dataframe,
    ):

        return self.find_column(

            dataframe,

            [

                "Quantity",

                "Qty",

                "Units",

                "Count",

                "Volume",

            ],

        )

    # -----------------------------------------
    # Customer
    # -----------------------------------------

    def customer_column(
        self,
        dataframe,
    ):

        return self.find_column(

            dataframe,

            [

                "Customer",

                "Customer Name",

                "CustomerID",

                "Customer Id",

                "Client",

                "Buyer",

                "User",

            ],

        )

    # -----------------------------------------
    # Product
    # -----------------------------------------

    def product_column(
        self,
        dataframe,
    ):

        return self.find_column(

            dataframe,

            [

                "Product",

                "Product Name",

                "Item",

                "SKU",

                "Item Name",

            ],

        )

    # -----------------------------------------
    # Category
    # -----------------------------------------

    def category_column(
        self,
        dataframe,
    ):

        return self.find_column(

            dataframe,

            [

                "Category",

                "Segment",

                "Department",

                "Type",

            ],

        )

    # -----------------------------------------
    # Region
    # -----------------------------------------

    def region_column(
        self,
        dataframe,
    ):

        return self.find_column(

            dataframe,

            [

                "Region",

                "Zone",

                "State",

                "City",

                "Country",

                "Location",

            ],

        )

    # -----------------------------------------
    # Date
    # -----------------------------------------

    def date_column(
        self,
        dataframe,
    ):

        return self.find_column(

            dataframe,

            [

                "Date",

                "Order Date",

                "Invoice Date",

                "Created At",

                "Created",

                "Timestamp",

                "Month",

                "Year",

            ],

        )

    # -----------------------------------------
    # Numeric Columns
    # -----------------------------------------

    def numeric_columns(
        self,
        dataframe,
    ):

        return list(

            dataframe.select_dtypes(

                include="number",

            ).columns

        )

    # -----------------------------------------
    # Dimension Columns
    # -----------------------------------------

    def dimension_columns(
        self,
        dataframe,
    ):

        return list(

            dataframe.select_dtypes(

                exclude="number",

            ).columns

        )

    # -----------------------------------------
    # Dataset Summary
    # -----------------------------------------

    def dataset_summary(
        self,
        dataframe,
    ):

        return {

            "rows": len(dataframe),

            "columns": len(dataframe.columns),

            "numeric_columns": self.numeric_columns(
                dataframe,
            ),

            "dimension_columns": self.dimension_columns(
                dataframe,
            ),

            "revenue_column": self.revenue_column(
                dataframe,
            ),

            "profit_column": self.profit_column(
                dataframe,
            ),

            "cost_column": self.cost_column(
                dataframe,
            ),

            "quantity_column": self.quantity_column(
                dataframe,
            ),

            "customer_column": self.customer_column(
                dataframe,
            ),

            "product_column": self.product_column(
                dataframe,
            ),

            "category_column": self.category_column(
                dataframe,
            ),

            "region_column": self.region_column(
                dataframe,
            ),

            "date_column": self.date_column(
                dataframe,
            ),

        }


metric_utils = MetricUtils()