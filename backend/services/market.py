from datetime import date as date_type, datetime

from models import OpenPositions, EligibleSecurities, Foreclosure


def _parse_date(date):
    if isinstance(date, date_type):
        return date
    if isinstance(date, str):
        return datetime.strptime(date.strip(), "%Y-%m-%d").date()
    return datetime.strptime(str(date), "%Y-%m-%d").date()


def get_market_data(date, db):
    date = _parse_date(date)

    print(f"[get_market_data] target date: {date!r} ({type(date).__name__})")

    positions = db.query(OpenPositions).filter(OpenPositions.date == date).all()

    symbols = {}
    for pos in positions:
        symbol = pos.symbol.strip() if pos.symbol else pos.symbol
        if symbol not in symbols:
            symbols[symbol] = {
                "symbol": symbol,
                "series_a_oi": 0,
                "series_b_oi": 0,
                "combined_oi": 0,
                "series_breakdown": {},
            }

        if pos.series not in symbols[symbol]["series_breakdown"]:
            symbols[symbol]["series_breakdown"][pos.series] = 0
        symbols[symbol]["series_breakdown"][pos.series] += pos.outstanding_quantity

        if pos.series.startswith("X"):
            symbols[symbol]["series_b_oi"] += pos.outstanding_quantity
        else:
            symbols[symbol]["series_a_oi"] += pos.outstanding_quantity

    for symbol in symbols:
        symbols[symbol]["combined_oi"] = (
            symbols[symbol]["series_a_oi"] + symbols[symbol]["series_b_oi"]
        )

    foreclosure = db.query(Foreclosure).filter(Foreclosure.date == date).all()
    foreclosure_symbols = {
        f.symbol.strip() for f in foreclosure if f.symbol
    }

    all_eligibility = (
        db.query(EligibleSecurities).filter(EligibleSecurities.date == date).all()
    )
    elig_map = {
        e.symbol.strip(): e for e in all_eligibility if e.symbol
    }

    print(f"[get_market_data] eligibility records found: {len(all_eligibility)}")
    if all_eligibility:
        first = all_eligibility[0]
        print(
            f"[get_market_data] first record eligibility: "
            f"symbol={first.symbol!r}, "
            f"normal={first.normal_eligibility!r}, "
            f"recall={first.recall_eligibility!r}, "
            f"repay={first.repay_eligibility!r}"
        )

    for symbol in symbols:
        elig = elig_map.get(symbol)

        if elig:
            symbols[symbol]["normal_eligibility"] = elig.normal_eligibility
            symbols[symbol]["recall_eligibility"] = elig.recall_eligibility
            symbols[symbol]["repay_eligibility"] = elig.repay_eligibility
        else:
            symbols[symbol]["normal_eligibility"] = "N/A"
            symbols[symbol]["recall_eligibility"] = "N/A"
            symbols[symbol]["repay_eligibility"] = "N/A"

        if symbol in foreclosure_symbols:
            symbols[symbol]["risk_status"] = "MANDATORY FORECLOSURE"
        else:
            symbols[symbol]["risk_status"] = "NORMAL"

    return list(symbols.values())
