from sqlalchemy import Column, Integer, String, Date
from database import Base

class EligibleSecurities(Base):
    __tablename__ = "eligible_securities"

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date)
    symbol = Column(String)
    series = Column(String)
    normal_eligibility = Column(String)
    recall_eligibility = Column(String)
    repay_eligibility = Column(String)
    market_type = Column(String)

class Foreclosure(Base):
    __tablename__ = "foreclosure"

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date)
    symbol = Column(String)
    series = Column(String)
    isin = Column(String)
    announcement_date = Column(String)
    book_closure_start = Column(String)
    record_date = Column(String)
    ex_date = Column(String)
    foreclosure_date = Column(String)
    shut_period_start = Column(String)
    shut_period_end = Column(String)
    next_trade_date = Column(String)
    foreclosure_settlement_no = Column(String)
    description = Column(String)

class OpenPositions(Base):
    __tablename__ = "open_positions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date)
    symbol = Column(String)
    series = Column(String)
    outstanding_quantity = Column(Integer)