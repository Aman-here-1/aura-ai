import pandas as pd


def generate_chart_data(df: pd.DataFrame, intelligence: dict):

    revenue = intelligence.get("revenue_column")
    date = intelligence.get("date_column")
    region = intelligence.get("region_column")
    product = intelligence.get("product_column")

    charts = {}

    # Sales Trend
    if date and revenue:
        trend = (
            df.groupby(date)[revenue]
            .sum()
            .reset_index()
        )

        charts["sales_trend"] = trend.to_dict(orient="records")

    # Sales by Region
    if region and revenue:
        region_sales = (
            df.groupby(region)[revenue]
            .sum()
            .reset_index()
            .sort_values(revenue, ascending=False)
        )

        charts["sales_by_region"] = region_sales.to_dict(orient="records")

    # Sales by Product
    if product and revenue:
        product_sales = (
            df.groupby(product)[revenue]
            .sum()
            .reset_index()
            .sort_values(revenue, ascending=False)
        )

        charts["sales_by_product"] = product_sales.to_dict(orient="records")

    return charts