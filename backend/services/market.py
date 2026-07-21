from models import OpenPositions, EligibleSecurities, Foreclosure

def get_market_data(date, db):

    positions = db.query(OpenPositions).filter(OpenPositions.date == date).all()

    symbols = {}
    for pos in positions:
        if pos.symbol not in symbols:
            symbols[pos.symbol] = {
                "symbol": pos.symbol,
                "series_a_oi": 0,
                "series_b_oi": 0,
                "combined_oi": 0,
                "series_breakdown": {}
            }

        if pos.series not in symbols[pos.symbol]["series_breakdown"]:
            symbols[pos.symbol]["series_breakdown"][pos.series] = 0
        symbols[pos.symbol]["series_breakdown"][pos.series] += pos.outstanding_quantity

        if pos.series.startswith("X"):
            symbols[pos.symbol]["series_b_oi"] += pos.outstanding_quantity
        else:
            symbols[pos.symbol]["series_a_oi"] += pos.outstanding_quantity

    for symbol in symbols:
        symbols[symbol]["combined_oi"] = symbols[symbol]["series_a_oi"] + symbols[symbol]["series_b_oi"]

    foreclosure = db.query(Foreclosure).filter(Foreclosure.date == date).all()
    foreclosure_symbols = {f.symbol for f in foreclosure}

    all_eligibility = db.query(EligibleSecurities).filter(EligibleSecurities.date == date).all()
    elig_map = {e.symbol: e for e in all_eligibility}

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