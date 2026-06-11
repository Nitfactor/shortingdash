from fastapi import FastAPI, Depends
from models import OpenPositions, EligibleSecurities, Foreclosure
from datetime import date as Date
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

    ingest_eligible_securities(file_path=file_path_1, date=Date.today(), db=db)
    ingest_foreclosure(file_path=file_path_2, date=Date.today(), db=db)
    ingest_open_positions(file_path=file_path_3, date=Date.today(), db=db)

@app.get("/api/open-positions/{date}")
def open_position(date: Date, db: Session = Depends(get_db)):
    result = db.query(OpenPositions).filter(OpenPositions.date == date).all()
    return result

@app.get("/api/foreclosure/{date}")
def foreclosure(date: Date, db: Session = Depends(get_db)):
    result = db.query(Foreclosure).filter(Foreclosure.date == date).all()
    return result

@app.get("/api/eligible-securities/{date}")
def eligible_securities(date: Date, db: Session = Depends(get_db)):
    result = db.query(EligibleSecurities).filter(EligibleSecurities.date == date).all()
    return result

@app.get("/api/market/changes")
def changes():
    pass