import pandas as pd
from models import EligibleSecurities, OpenPositions, Foreclosure
from database import SessionLocal

def ingest_eligible_securities(file_path, date, db):
    
    df = pd.read_csv(file_path)
    df.columns = df.columns.str.strip()
    df = df.apply(lambda x: x.str.strip() if x.dtype == "object" else x)
    print("Eligibility data in !")

    for _, row in df.iterrows():
        record = EligibleSecurities(
            symbol = row["Symbol"],
            date = date,
            series = row["Series"],
            normal_eligibility = row["Normal Eligibility"],
            recall_eligibility = row["Recall Eligibility"],
            repay_eligibility = row["Repay Eligibility"],
            market_type = row["Market Type"],
        )
        db.add (record)
    db.commit()
    print("Eligibility Data inserted !")

def ingest_open_positions(file_path, date, db):

    df = pd.read_csv(file_path)
    df.columns = df.columns.str.strip()
    df = df.apply(lambda x: x.str.strip() if x.dtype == "object" else x)
    print("Open position data in !")

    for _, row in df.iterrows():
        record = OpenPositions(
            symbol = row["Security"],
            date = date,
            series = row["Series"],
            outstanding_quantity = row["Outstanding Quantity at the end of the day"],
        )
        db.add (record)
    db.commit()
    print("Positions Data inserted !")

def ingest_foreclosure(file_path, date, db):

    df = pd.read_csv(file_path)
    df.columns = df.columns.str.strip()
    df = df.apply(lambda x: x.str.strip() if x.dtype == "object" else x)
    df = df.dropna(subset=["ISIN"])
    print("Foreclosure data in !")

    for _, row in df.iterrows():
        record = Foreclosure(
            symbol = row["SECURITY"],
            date = date,
            series = row["SERIES**"],
            isin = row["ISIN"],
            announcement_date = row["ANNOUNCEMENT DATE"],
            book_closure_start = row["BOOK CLOSURE START DATE"],
            record_date = row["RECORD DATE"],
            ex_date = row["EX DATE"],
            foreclosure_date = row["FORECLOSURE DATE"],
            shut_period_start = row["SHUT PERIOD START DATE"],
            shut_period_end = row["SHUT PERIOD END DATE"],
            next_trade_date = row["NEXT TRADE DATE"],
            foreclosure_settlement_no = row["FORECLOSURE SETTLEMENT NO"],
            description = row["CORPORATE ACTION DESCRIPTION"],
        )
        db.add (record)
    db.commit()
    print("Foreclosure Data inserted !")