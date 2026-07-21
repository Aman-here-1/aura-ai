def recommend_charts(intelligence: dict):

    charts = []

    date = intelligence.get("date_column")
    revenue = intelligence.get("revenue_column")
    region = intelligence.get("region_column")
    product = intelligence.get("product_column")

    if date and revenue:
        charts.append({
            "id": "sales_trend",
            "type": "line",
            "title": "Sales Trend",
            "x": date,
            "y": revenue,
        })

    if region and revenue:
        charts.append({
            "id": "sales_region",
            "type": "bar",
            "title": "Sales by Region",
            "x": region,
            "y": revenue,
        })

    if product and revenue:
        charts.append({
            "id": "sales_product",
            "type": "bar",
            "title": "Sales by Product",
            "x": product,
            "y": revenue,
        })

    if region and revenue:
        charts.append({
            "id": "region_share",
            "type": "pie",
            "title": "Regional Contribution",
            "label": region,
            "value": revenue,
        })

    return charts