from http.client import HTTPException
from typing import Union

from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

import os
app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173", 
    "http://127.0.0.1:8000/data", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


# Method to retrieve data from the excel file and load it in backend
@app.get("/data")
def read_data():
    data = pd.read_excel(r'./SoftwareInternAssignment.xlsx')
    json_data = data.to_dict(orient="records")  # Convert DataFrame to list of dictionaries
    return json_data