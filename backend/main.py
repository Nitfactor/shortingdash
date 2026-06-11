from fastapi import FastAPI, Depends
import models
from datetime import date
from database import create_tables, get_db
from sqlalchemy.orm import Session
from pathlib import Path
from services.ingest import ingest_eligible_securities, ingest_foreclosure, ingest_open_positions


app = FastAPI()

@app.on_event("startup")
def startup():
    create_tables()

@app.post("/ingest")
def ingest(db: Session = Depends(get_db)):

    base_dir = Path(__file__).resolve().parent
    file_path_1 = base_dir / "data" / "SLB_ELG_SEC_10062026.csv"
    file_path_2 = base_dir / "data" / "Forclosure_SLB_20260610.CSV"
    file_path_3 = base_dir / "data" / "slb_openpos_10062026.csv"

    ingest_eligible_securities(file_path=file_path_1, date=date.today(), db=db)
    ingest_foreclosure(file_path=file_path_2, date=date.today(), db=db)
    ingest_open_positions(file_path=file_path_3, date=date.today(), db=db)