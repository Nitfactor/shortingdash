from fastapi import FastAPI
import models
from database import create_tables

app = FastAPI()

@app.on_event("startup")
def startup():
    create_tables()