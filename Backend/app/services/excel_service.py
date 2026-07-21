import pandas as pd
from fastapi import UploadFile


async def parse_excel(file: UploadFile):
    df = pd.read_excel(file.file)

    return {
        "rows": len(df),
        "columns": len(df.columns),
        "headers": df.columns.tolist(),
        "preview": (
            df.head(10)
            .fillna("")
            .to_dict(orient="records")
        ),
    }