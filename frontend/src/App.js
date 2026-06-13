import { useState, useEffect } from "react";
import "./App.css";

const API_BASE = "http://127.0.0.1:8000";

function formatApiDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatHeadingDate(d) {
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
  if (!data.length) return <p className="empty">No data</p>;

  return (
    <table className="market-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>
            Fixed (0-12)
            <br />
            Open Interest
          </th>
          <th>
            Recallable
            <br />
            Open Interest
          </th>
          <th>
            Combined
            <br />
            Total OI
          </th>
          <th>
            Eligibility
            <br />
            (N / R / P)
          </th>
          <th>
            Operational Risk
            <br />
            Profiler Status
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.symbol}>
            <td>{row.symbol}</td>
            <td>{formatNumber(row.series_a_oi)}</td>
            <td>{formatNumber(row.series_b_oi)}</td>
            <td>{formatNumber(row.combined_oi)}</td>
            <td>
              {row.normal_eligibility} / {row.recall_eligibility} /{" "}
              {row.repay_eligibility}
            </td>
            <td>
              <span
                className={`status-dot ${
                  row.risk_status === "MANDATORY FORECLOSURE" ? "red" : "blue"
                }`}
              />
              {row.risk_status}
            </td>
          </tr>
        ))}
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
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const [todayData, setTodayData] = useState([]);
  const [yesterdayData, setYesterdayData] = useState([]);

  useEffect(() => {
    const todayDate = new Date();
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    const todayStr = formatApiDate(todayDate);
    const yesterdayStr = formatApiDate(yesterdayDate);

    Promise.all([
      fetch(`${API_BASE}/api/market/${todayStr}`).then((r) => r.json()),
      fetch(`${API_BASE}/api/market/${yesterdayStr}`).then((r) => r.json()),
    ]).then(([todayJson, yesterdayJson]) => {
      setTodayData(todayJson);
      setYesterdayData(yesterdayJson);
    });
  }, []);

  const changes = getChanges(todayData, yesterdayData);

  return (
    <div className="dashboard">
      <div className="left">
        <section>
          <h2>Today&apos;s Market - {formatHeadingDate(today)}</h2>
          <div className="table-box">
            <MarketTable data={todayData} />
          </div>
        </section>
        <section>
          <h2>Yesterday&apos;s Market - {formatHeadingDate(yesterday)}</h2>
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
