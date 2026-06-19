# SLBM End‑of‑Day Dashboard
An end‑of‑day (EOD) analytics dashboard for the National Stock Exchange (NSE) Securities Lending and Borrowing Mechanism (SLBM).

While the live NSE dashboard provides static reports, this application ingests daily SLB data at 8:00 PM IST, stores it historically, and exposes an intuitive UI and API. It unlocks deep insights such as historical trends, open interest additions/removals, short squeeze risk indicators, and foreclosure watchlists.

Note: This project does not use or redistribute live market data and is not a trading terminal.

## Key Features
Automated Data Ingestion: Daily cron jobs to download, parse, and store official NSE reports.

Historical Tracking: View trend lines for lending fees, premium fluctuations, and volume shifts over time.

Advanced Risk Analytics: Identify potential short squeeze candidates based on high lending utilization and diminishing open interest.

Foreclosure Watchlist: Track active and upcoming stock foreclosures to manage delivery risk.

Modern Data Grid: Filter, sort, and search across all eligible SLBM securities instantly.

## High‑Level Architecture
### Tech Stack
Backend: Python, FastAPI, Pandas

Database: PostgreSQL (with daily snapshot partitioning)

Frontend: React / Next.js, (*Made with AI*)

## Disclaimer
This project is for educational and research purposes only. It is not a trading platform, does not provide investment advice, and is not affiliated with the National Stock Exchange (NSE), Securities and Exchange Board of India (SEBI), or any licensed stockbroker.

All SLBM market rules, margins, and product specifications are exclusively defined by NSE/SEBI; please refer to their official documentation for authoritative financial decisions.