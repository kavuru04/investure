from http.client import HTTPException
from typing import Union

from fastapi import FastAPI
import pandas as pd
import os
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/data")
def read_data():
    data = pd.read_excel(r'C:\Users\saite\investure\backend\SoftwareInternAssignment.xlsx')
    json_data = data.to_dict(orient="records")  # Convert DataFrame to list of dictionaries
    return json_data