# ShortingDash

ShortingDash is a full-stack market terminal for Indian SLBM (Securities Lending and Borrowing Mechanism) data. 
It visualizes daily open positions, eligibility status, and upcoming foreclosure risk in a clean, trader-friendly dashboard.

Built to help users understand SLBM market structure more clearly, 
ShortingDash turns raw exchange files into an interactive terminal with risk-focused views and side-by-side series handling.

## Features

- Daily SLBM market data ingestion.
- Interactive dashboard for open positions and eligibility.
- Upcoming corporate-action foreclosure tracking.
- Separate handling for SLBM series types.
- Risk-focused views for traders and investors.
- Fast, modern frontend with dark-mode UI.
- PostgreSQL-backed data storage and querying.

## Tech Stack

- **Frontend:** React
- **Backend:** FastAPI (Python)
- **Database:** Supabase / PostgreSQL
- **Languages:** Python, JavaScript, SQL
- **Deployment:** Vercel, Render, Supabase

## Project Status

ShortingDash is currently focused on **Indian SLBM data** as v1.  
Future plans include:
- expanding to more SLBM files and historical coverage,
- adding richer analytics and alerts,
- and extending the platform into broader shorting analytics across other markets.

## Why I Built This

I built ShortingDash to better understand the structure of SLBM and to create a 
practical terminal for exploring the data in a more useful way than the raw exchange files alone.

The project combines:
- financial market research,
- full-stack development,
- and product thinking.

## Screenshots

<img width="1454" height="818" alt="Screenshot 2026-06-19 at 9 56 22 PM" src="https://github.com/user-attachments/assets/6bb51b55-7c81-4078-9a32-423f4342b6a0" />


## Future Improvements

- Add more SLBM report files.
- Add 30-day and longer historical trend views.
- Improve foreclosure monitoring and alerting.
- Expand to broader shorting data for other markets.
- Add onboarding and educational content for new users.

## License

This project is currently private / not licensed.

## Contact

Built by Akshat Singh  
LinkedIn: [linkedin.com/in/akshat7361](https://linkedin.com/in/akshat7361)

## About

Built by Akshat.

SLBM data in India is publicly available but practically inaccessible — buried in CSV files on NSE's archive. ShortingDash exists to make that data usable.
