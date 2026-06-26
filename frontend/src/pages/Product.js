import "./Page.css";

export default function Product() {
  return (
    <div className="page">
      <div className="page-content">
        <h1>SLBM in the Indian Markets</h1>
        <p className="page-subtitle">
          Securities Lending &amp; Borrowing Mechanism — A Complete Guide
        </p>

        <section className="page-section">
          <h2>1. What Is SLBM?</h2>
          <p>
            SLBM stands for Securities Lending and Borrowing Mechanism. It is a
            regulated, exchange-traded system through which investors can lend
            shares sitting idle in their demat account and earn a fee, while
            traders can borrow those shares for short selling, arbitrage, or
            hedging — all without buying them outright.
          </p>
          <div className="page-callout">
            <strong>Simple Analogy:</strong> Think of it like renting out a flat
            you own. You still own the property, someone else uses it
            temporarily, and you earn rent (called a &ldquo;lending fee&rdquo;)
            for the period. At the end of the contract, you get your property
            back.
          </div>
          <p>
            All transactions are facilitated and guaranteed by NSE Clearing Ltd.
            (formerly NSCCL) — the clearing corporation of the National Stock
            Exchange — making it one of the safest market mechanisms in India.
          </p>
        </section>

        <section className="page-section">
          <h2>2. Who Are the Two Players?</h2>
          <div className="page-grid">
            <div className="page-card">
              <h3>The Lender</h3>
              <ul className="page-list">
                <li>
                  A long-term investor holding shares idle in their demat
                  account
                </li>
                <li>Wants to earn extra income without selling their shares</li>
                <li>
                  Retains full economic ownership (dividends, bonuses, rights
                  still accrue)
                </li>
                <li>
                  Risk is near zero — the clearing corporation guarantees the
                  transaction
                </li>
              </ul>
            </div>
            <div className="page-card">
              <h3>The Borrower</h3>
              <ul className="page-list">
                <li>A trader who needs shares they do not currently own</li>
                <li>
                  Uses borrowed shares for short selling, arbitrage, or
                  settlement obligations
                </li>
                <li>
                  Pays a lending fee to the lender for the duration of the
                  borrow
                </li>
                <li>
                  Must provide 100% collateral of the stock&apos;s value as
                  security
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section">
          <h2>3. How Does It Actually Work?</h2>
          <p>
            Here is the step-by-step flow of an SLBM transaction:
          </p>
          <ol className="page-list page-list--ordered">
            <li>
              Both parties register with the exchange (NSE) through their
              broker or clearing member.
            </li>
            <li>
              As a lender: submit the stock name, quantity, tenure (1–12
              months), and the lending fee you want. As a borrower: specify the
              stock, quantity, tenure, and the rate you are willing to pay.
            </li>
            <li>
              Deposit margin — the borrower provides 100% collateral of the
              stock&apos;s value.
            </li>
            <li>
              The NSE platform automatically matches lending and borrowing
              orders.
            </li>
            <li>
              On the first leg settlement date, shares move from the lender to
              the borrower via NSCCL.
            </li>
            <li>
              On the reverse leg settlement date (the first Thursday of the
              chosen month), shares return to the lender. The lending fee is
              credited to the lender&apos;s account.
            </li>
          </ol>
          <p>
            SLBM contracts expire on the first Thursday of the month. Tenures
            range from 1 month to 12 months. Settlement is on a gross basis —
            there is no netting of positions.
          </p>
        </section>

        <section className="page-section">
          <h2>4. A Simple Example</h2>
          <div className="page-callout">
            <strong>Scenario</strong>
            <p>
              You hold 1,000 shares of Reliance Industries and have no plans to
              sell for 6 months. A trader, Ankit, believes Reliance will fall
              next month and wants to short sell — but owns zero shares.
            </p>
          </div>
          <p><strong>What Happens:</strong></p>
          <ul className="page-list">
            <li>
              Ankit borrows your 1,000 Reliance shares for 1 month at a lending
              fee of ₹5 per share.
            </li>
            <li>
              You immediately receive ₹5,000 as lending income, credited to
              your account.
            </li>
            <li>
              Ankit sells those 1,000 shares in the market at ₹2,900 each.
            </li>
            <li>
              Reliance falls to ₹2,800 as Ankit predicted. He buys back 1,000
              shares.
            </li>
            <li>
              At month-end, he returns the 1,000 shares to your demat via
              NSCCL.
            </li>
          </ul>
          <p>
            <strong>You earned:</strong> ₹5,000 lending fee. You still own
            1,000 Reliance shares.
          </p>
          <p>
            <strong>Ankit earned:</strong> ₹1,00,000 (sell ₹2,900 → buy ₹2,800,
            × 1,000 shares) minus the ₹5,000 fee = ₹95,000 net profit.
          </p>
        </section>

        <section className="page-section">
          <h2>5. Key Facts About SLBM in India</h2>
          <div className="page-grid page-grid--facts">
            <div className="page-card">
              <h3>Eligible Securities</h3>
              <ul className="page-list">
                <li>
                  Most large-cap and actively traded mid-cap stocks listed on
                  NSE/BSE
                </li>
                <li>
                  F&amp;O stocks are automatically eligible; other key NSE 200
                  stocks may also qualify
                </li>
                <li>Select ETFs with sufficient liquidity</li>
                <li>The eligible list is updated monthly by NSE</li>
              </ul>
            </div>
            <div className="page-card">
              <h3>Contract Tenures</h3>
              <ul className="page-list">
                <li>Range from 1 month to a maximum of 12 months</li>
                <li>
                  Fixed monthly contracts; reverse leg settlement on the first
                  Thursday of each month
                </li>
                <li>
                  Two series per month: regular (series 01–12) and
                  AGM/EGM-exempt (series X1–XD)
                </li>
              </ul>
            </div>
            <div className="page-card">
              <h3>Lending Fees</h3>
              <ul className="page-list">
                <li>
                  Quoted as an annualised percentage of the stock&apos;s value
                </li>
                <li>
                  Typically ranges from 0.5% to 10% depending on stock demand
                  and market conditions
                </li>
                <li>
                  High-demand stocks can fetch lending fees of ₹10–₹100 per
                  share
                </li>
                <li>
                  Determined by live market demand and supply — not fixed by NSE
                </li>
              </ul>
            </div>
          </div>
          <div className="page-callout">
            <strong>India&apos;s Unique Structure</strong>
            <p>
              In most countries, SLB is an OTC (Over The Counter) product — a
              private bilateral agreement. In India, SLBM is an exchange-traded
              product operated entirely under NSE, monitored by the exchange,
              and with NSCCL providing a counter guarantee to every single
              trade. This gives Indian lenders a level of safety that is rare
              globally.
            </p>
          </div>
        </section>

        <section className="page-section">
          <h2>6. Benefits at a Glance</h2>
          <div className="page-table-wrap">
            <table className="page-table">
              <thead>
                <tr>
                  <th />
                  <th>Lender</th>
                  <th>Borrower</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Goal</strong></td>
                  <td>Earn passive income on idle shares</td>
                  <td>Short sell, hedge, or arbitrage</td>
                </tr>
                <tr>
                  <td><strong>What They Do</strong></td>
                  <td>Lend shares for a fee</td>
                  <td>Borrow shares, pay a fee</td>
                </tr>
                <tr>
                  <td><strong>Risk</strong></td>
                  <td>Near zero — NSCCL guarantees settlement</td>
                  <td>Bears market risk of their own trade</td>
                </tr>
                <tr>
                  <td><strong>Own the Shares?</strong></td>
                  <td>Yes — retains economic ownership</td>
                  <td>Temporarily holds physical shares</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="page-section">
          <h2>7. Tax &amp; Charges</h2>
          <div className="page-grid">
            <div className="page-card">
              <h3>Taxation</h3>
              <ul className="page-list">
                <li>
                  Lending fee earned is treated as Business Income, not capital
                  gains
                </li>
                <li>Taxed as per your applicable income tax slab</li>
                <li>
                  SLBM transactions are NOT treated as a transfer of securities
                  under Section 2(47) of the Income Tax Act (Income Tax
                  Circular 2/2008) — no capital gains tax triggered
                </li>
              </ul>
            </div>
            <div className="page-card">
              <h3>Charges &amp; Exemptions</h3>
              <ul className="page-list">
                <li>No STT (Securities Transaction Tax) on SLBM transactions</li>
                <li>
                  No SEBI turnover fees since it is not a sale or transfer
                </li>
                <li>
                  Transaction charges are currently waived until further notice
                  by NSE Clearing
                </li>
                <li>Processing fees charged by broker may apply</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section">
          <h2>8. What Happens If Something Goes Wrong?</h2>
          <div className="page-table-wrap">
            <table className="page-table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>What Happens</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lender fails to deliver shares</td>
                  <td>
                    Closed out at 25% above the closing price of the security
                    on T+1 day
                  </td>
                </tr>
                <tr>
                  <td>Borrower fails to provide funds</td>
                  <td>
                    Transaction cancelled; shares returned to lender with
                    lending fee intact
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            NSCCL operates a detailed risk management system that constantly
            monitors obligations of all trading members. In cases of default,
            NSCCL steps in to conduct a buy-in auction to acquire the
            securities, ensuring the lender is never left exposed.
          </p>
        </section>

        <section className="page-section">
          <h2>9. Common Use Cases for Borrowers</h2>
          <div className="page-grid page-grid--facts">
            <div className="page-card">
              <h3>Short Selling</h3>
              <p>
                A trader who expects a stock to fall borrows shares, sells them
                at the current price, waits for the decline, buys them back
                cheaper, and returns them — pocketing the difference minus the
                lending fee. This is the most common use of SLBM.
              </p>
            </div>
            <div className="page-card">
              <h3>Arbitrage</h3>
              <p>
                If a stock trades at ₹100 in the cash market but its futures
                contract is at ₹95, a trader can borrow and sell in cash while
                buying the futures. This locks in a ₹5 risk-free spread.
              </p>
            </div>
            <div className="page-card">
              <h3>Settlement Failure Avoidance</h3>
              <p>
                Occasionally, a trader may have accidentally created a short
                delivery position in the cash segment. Borrowing via SLBM allows
                them to fulfil delivery obligations and avoid auction penalties.
              </p>
            </div>
            <div className="page-card">
              <h3>Event-Driven Trading</h3>
              <p>
                Traders often borrow shares around major index rebalancing
                dates, merger announcements, or dividend events to get inventory
                certainty at a known cost, allowing them to focus entirely on
                the upside of their strategy.
              </p>
            </div>
          </div>
        </section>

        <p className="page-footer">
          Source data from NSE Clearing Ltd. and SEBI circulars. | Compiled for
          ShortingDash research purposes.
        </p>
      </div>
    </div>
  );
}
