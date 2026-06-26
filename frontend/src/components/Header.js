import { Link, NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="header-logo">
        Shorting Dash
      </Link>

      <nav className="header-nav">
        <NavLink to="/product" className="header-link">
          Product
        </NavLink>
        <NavLink to="/about" className="header-link">
          About
        </NavLink>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="header-social"
          aria-label="Follow on X"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
