import React, { useState, useEffect } from "react";
import "./App.css";

const API_BASE = process.env.REACT_APP_API_BASE_URL || import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function formatApiDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatHeadingDate(d) {
  if (!d) return "Loading...";
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatNumber(n) {
  return n?.toLocaleString("en-US") ?? "0";
}

function getChanges(today, yesterday) {
  const todayMap = Object.fromEntries(today.map((r) => [r.symbol, r]));
  const yesterdayMap = Object.fromEntries(yesterday.map((r) => [r.symbol, r]));
  const symbols = new Set([
    ...Object.keys(todayMap),
    ...Object.keys(yesterdayMap),
  ]);
  const changes = [];

  for (const symbol of symbols) {
    const t = todayMap[symbol];
    const y = yesterdayMap[symbol];

    if (!y) {
      changes.push({ symbol, detail: "Added" });
    } else if (!t) {
      changes.push({ symbol, detail: "Removed" });
    } else {
      const diffs = [];
      if (t.combined_oi !== y.combined_oi) {
        diffs.push(`OI ${formatNumber(y.combined_oi)} → ${formatNumber(t.combined_oi)}`);
      }
      if (t.risk_status !== y.risk_status) {
        diffs.push(`${y.risk_status} → ${t.risk_status}`);
      }
      if (diffs.length) changes.push({ symbol, detail: diffs.join(", ") });
    }
  }

  return changes;
}

function MarketTable({ data }) {
  const [expandedSymbols, setExpandedSymbols] = useState(new Set());

  if (!data.length) return <p className="empty">No data</p>;

  const toggleRow = (symbol) => {
    const newExpanded = new Set(expandedSymbols);
    if (newExpanded.has(symbol)) {
      newExpanded.delete(symbol);
    } else {
      newExpanded.add(symbol);
    }
    setExpandedSymbols(newExpanded);
  };

  return (
    <table className="market-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Fixed (0-12)<br />Open Interest</th>
          <th>Recallable<br />Open Interest</th>
          <th>Combined<br />Total OI</th>
          <th>Eligibility<br />(N / R / P)</th>
          <th>Operational Risk<br />Profiler Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const isExpanded = expandedSymbols.has(row.symbol);
          const hasBreakdown = row.series_breakdown && Object.keys(row.series_breakdown).length > 0;

          return (
            <React.Fragment key={row.symbol}>
              <tr 
                onClick={() => hasBreakdown && toggleRow(row.symbol)} 
                style={{ cursor: hasBreakdown ? "pointer" : "default" }}
                className={isExpanded ? "row-expanded" : ""}
              >
                <td><strong>{row.symbol}</strong></td>
                <td>{formatNumber(row.series_a_oi)}</td>
                <td>{formatNumber(row.series_b_oi)}</td>
                <td>
                  {hasBreakdown && (
                    <span style={{ marginRight: "8px", display: "inline-block", width: "12px", fontSize: "10px", color: "inherit" }}>
                      {isExpanded ? "▼" : "▶"}
                    </span>
                  )}
                  {formatNumber(row.combined_oi)}
                </td>
                <td>
                  {row.normal_eligibility} / {row.recall_eligibility} / {row.repay_eligibility}
                </td>
                <td>
                  <span className={`status-dot ${row.risk_status === "MANDATORY FORECLOSURE" ? "red" : "blue"}`} />
                  {row.risk_status}
                </td>
              </tr>

              {isExpanded && hasBreakdown && (
                <tr className="breakdown-row" style={{ backgroundColor: "#f9fafb" }}>
                  <td colSpan="6" style={{ padding: "12px 24px" }}>
                    <div style={{ borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#4b5563" }}>Series Breakdown</h4>
                      <table style={{ width: "auto", minWidth: "250px", fontSize: "13px" }}>
                        <tbody>
                          {Object.entries(row.series_breakdown).map(([series, val]) => (
                            <tr key={series} style={{ background: "transparent" }}>
                              <td style={{ padding: "4px 0", fontWeight: "600", color: "#6b7280" }}>Series {series}:</td>
                              <td style={{ padding: "4px 0", textAlign: "right", fontFamily: "monospace", color: "#111827" }}>
                                {formatNumber(val)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

function ChangesTable({ changes }) {
  if (!changes.length) return <p className="empty">No changes</p>;

  return (
    <table className="market-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {changes.map((row) => (
          <tr key={row.symbol}>
            <td>{row.symbol}</td>
            <td>{row.detail}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [todayData, setTodayData] = useState([]);
  const [yesterdayData, setYesterdayData] = useState([]);
  
  // State variables tracking api-driven dates instead of system time
  const [latestDate, setLatestDate] = useState(null);
  const [previousDate, setPreviousDate] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/latest-date`)
      .then((r) => r.json())
      .then(({ date }) => {
        // Appending 'T00:00:00' prevents timezone shifts causing date errors locally
        const currentLatest = new Date(date + "T00:00:00");
        const currentPrevious = new Date(currentLatest);
        currentPrevious.setDate(currentPrevious.getDate() - 1);

        // Commit dates to state for rendering in headers
        setLatestDate(currentLatest);
        setPreviousDate(currentPrevious);

        const todayStr = formatApiDate(currentLatest);
        const yesterdayStr = formatApiDate(currentPrevious);

        return Promise.all([
          fetch(`${API_BASE}/api/market/${todayStr}`).then((r) => r.json()),
          fetch(`${API_BASE}/api/market/${yesterdayStr}`).then((r) => r.json()),
        ]);
      })
      .then(([todayJson, yesterdayJson]) => {
        setTodayData(todayJson);
        setYesterdayData(yesterdayJson);
      })
      .catch((err) => console.error("Error fetching market data:", err));
  }, []);

  const changes = getChanges(todayData, yesterdayData);

  return (
    <div className="dashboard">
      <div className="left">
        <section>
          <h2>Latest Market - {formatHeadingDate(latestDate)}</h2>
          <div className="table-box">
            <MarketTable data={todayData} />
          </div>
        </section>
        <section>
          <h2>Previous Market - {formatHeadingDate(previousDate)}</h2>
          <div className="table-box">
            <MarketTable data={yesterdayData} />
          </div>
        </section>
      </div>
      <div className="right">
        <section>
          <h2>Changes</h2>
          <div className="table-box changes-box">
            <ChangesTable changes={changes} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
