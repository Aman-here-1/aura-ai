import pandas as pd


def generate_kpis(df: pd.DataFrame, intelligence: dict):

    revenue_col = intelligence.get("revenue_column")
    quantity_col = intelligence.get("quantity_column")
    product_col = intelligence.get("product_column")
    region_col = intelligence.get("region_column")

    kpis = {}

    # Total Rows
    kpis["total_records"] = len(df)

    # Total Revenue
    if revenue_col:
        kpis["total_revenue"] = float(df[revenue_col].sum())
        kpis["average_order_value"] = float(df[revenue_col].mean())
        kpis["max_sale"] = float(df[revenue_col].max())

    # Quantity
    if quantity_col:
        kpis["total_quantity"] = int(df[quantity_col].sum())

    # Top Product
    if product_col:
        kpis["top_product"] = (
            df.groupby(product_col)[revenue_col]
            .sum()
            .idxmax()
            if revenue_col
            else df[product_col].mode()[0]
        )

    # Top Region
    if region_col:
        kpis["top_region"] = (
            df.groupby(region_col)[revenue_col]
            .sum()
            .idxmax()
            if revenue_col
            else df[region_col].mode()[0]
        )

    return kpis