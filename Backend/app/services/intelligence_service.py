from typing import Any

DATE_KEYWORDS = [
    "date",
    "order_date",
    "invoice_date",
    "created_at",
    "created",
]

REVENUE_KEYWORDS = [
    "sales",
    "revenue",
    "amount",
    "gmv",
    "net_sales",
]

QUANTITY_KEYWORDS = [
    "quantity",
    "qty",
]

PRODUCT_KEYWORDS = [
    "product",
    "item",
    "sku",
]

CUSTOMER_KEYWORDS = [
    "customer",
    "client",
]

REGION_KEYWORDS = [
    "region",
    "state",
    "city",
    "country",
]


def find_column(headers: list[str], keywords: list[str]) -> str | None:
    for header in headers:
        normalized = header.lower()

        for keyword in keywords:
            if keyword in normalized:
                return header

    return None


def detect_dataset(headers: list[str]) -> dict[str, Any]:

    return {
        "date_column": find_column(headers, DATE_KEYWORDS),
        "revenue_column": find_column(headers, REVENUE_KEYWORDS),
        "quantity_column": find_column(headers, QUANTITY_KEYWORDS),
        "product_column": find_column(headers, PRODUCT_KEYWORDS),
        "customer_column": find_column(headers, CUSTOMER_KEYWORDS),
        "region_column": find_column(headers, REGION_KEYWORDS),
    }