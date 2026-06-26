import "./Page.css";

export default function About() {
  return (
    <div className="page">
      <div className="page-content">
        <h1>About</h1>
        <p>
        Shorting Dash is a market monitoring tool built around SLBM (Securities Lending and Borrowing Mechanism) 
        data for the Indian market. It is designed for teams and individuals who need fast, 
        clear visibility into shorting activity, position changes, and operational risk.
        </p>
        <p>
        The dashboard brings together the most important signals — fixed and recallable open interest, 
        combined totals, eligibility flags, and profiler status — so you can quickly identify shifts before 
        they turn into larger issues.
        </p>
        <p>
        Built to turn raw market files into something actionable, 
        Shorting Dash focuses on clarity, speed, and ease of use. Instead of forcing users to dig through dense data, it 
        surfaces the numbers that matter in a format that is easy to scan and understand.
        </p>
        <p>
        Shorting Dash is starting with Indian SLBM data, but the long-term vision is much larger: 
        a complete shorting analytics platform with deeper historical views, richer risk analysis, smarter alerts, 
        and broader market coverage.
        </p>
        <div className="page-card">
          <h3>Built for clarity</h3>
          <p>
            A dark, minimal interface keeps the data front and center. No
            clutter, no distractions — just the numbers that matter.
          </p>
        </div>
      </div>
    </div>
  );
}
