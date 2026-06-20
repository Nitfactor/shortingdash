# ShortingDash

**Real-time insights into institutional short positions through Securities Lending & Borrowing data.**

> Institutional short positions drive ~40% of market volatility. ShortingDash reveals what traditional market data hides.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-shortingdash.com-blue?style=flat-square)](https://www.shortingdash.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Nitfactor/shortingdash-lightgrey?style=flat-square&logo=github)](https://github.com/Nitfactor/shortingdash)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 🎯 The Problem

Traditional market data (price, volume, open interest) doesn't tell the full story about shorts. 

- 📊 You can see **what price is**, but not **who's short and why**
- 📉 You see **open interest changes**, but not **lending demand** driving them
- 🔍 You miss **institutional accumulation** of borrow demand (early short squeeze signal)

**ShortingDash solves this** by making Securities Lending & Borrowing (SLB) data accessible, historical, and actionable.

---

## ✨ Key Features

### 📈 **Real-Time Data Ingestion**
- Automated daily downloads of NSE Securities Lending & Borrowing reports at 8:00 PM IST
- Historical database tracking lending fees, utilization rates, and volume trends
- Data validation and quality checks ensure reliability

### 🎨 **Intuitive Dashboard**
- **Modern data grid** with instant search, filter, and sort across 1000+ securities
- **Quick stats** showing top gainers/losers in lending demand
- **Responsive design** works seamlessly on desktop and mobile

### 📊 **Advanced Analytics**
- **Trend analysis**: Track how lending utilization and fees evolve over time
- **Short squeeze indicators**: Identify candidates with high borrow demand + constrained supply
- **Foreclosure watchlist**: Monitor active/upcoming stock foreclosures for delivery risk

### 🔌 **RESTful API** (Coming Soon)
- Query historical SLB data programmatically
- Build your own analysis tools on top of ShortingDash
- Rate-limited access with authentication

---

## 🏗️ Architecture

```
┌─────────────────────┐
│   NSE SLB Reports   │ (Public Data @ 8 PM IST)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  Python Backend (FastAPI)           │
│  ├─ Data Ingestion (Cron Jobs)      │
│  ├─ Data Validation & Parsing       │
│  └─ Analytics Engine                │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  PostgreSQL (Time-Series Data)      │
│  ├─ Daily Snapshots (Partitioned)   │
│  ├─ Historical Trends               │
│  └─ Foreclosure Records             │
└──────────┬──────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  React Frontend (Vercel Deployed)    │
│  ├─ Interactive Dashboard            │
│  ├─ Real-time Charts & Tables        │
│  └─ Responsive UI                    │
└──────────────────────────────────────┘
```

### **Tech Stack**

| Component | Technology |
|-----------|-----------|
| **Backend** | Python 3.10+, FastAPI, SQLAlchemy |
| **Database** | PostgreSQL (with time-series partitioning) |
| **Frontend** | React 19, Modern CSS, Responsive Design |
| **Data Processing** | Pandas, NumPy |
| **Deployment** | Docker, Vercel (Frontend), AWS/Railway (Backend) |
| **Monitoring** | GitHub Actions (CI/CD) |

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ (Frontend)
- Python 3.10+ (Backend)
- PostgreSQL 13+ (Database)
- Docker (Optional, for containerized setup)

### **Frontend Setup** (5 minutes)

```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3000`

### **Backend Setup** (10 minutes)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Run migrations
alembic upgrade head

# Start server
uvicorn main:app --reload
```
API runs on `http://localhost:8000`

### **Docker Setup** (Recommended for Production)

```bash
docker-compose up -d
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- Database: Isolated PostgreSQL container

---

## 📊 Data Sources

ShortingDash uses **publicly available data** from:

- **NSE Securities Lending & Borrowing Reports**: Daily EOD snapshots
- **NSE Open Interest Data**: For institutional positioning
- **Historical Lending Rates**: Fee trends and utilization metrics

**Note**: This application does not redistribute live market data and is designed for analysis, not trading execution.

---

## 📈 Usage Examples

### **Finding Short Squeeze Candidates**
1. Filter for stocks with **lending utilization > 80%**
2. Sort by **fee trend** (increasing = growing short pressure)
3. Cross-check **open interest changes** for institutional accumulation

### **Monitoring Foreclosures**
- View the "Foreclosure Watchlist" tab
- Track delivery risk for stocks entering/exiting forced settlement

### **Analyzing Lending Trends**
- Use the "Trends" view to spot inflection points
- Identify when fees spike (= high borrow demand)

---

## 🗺️ Roadmap

### **v1.1** (In Progress)
- [ ] Trend charts for lending utilization and fees (30-day + 90-day views)
- [ ] Basic alert system (email notifications for key events)
- [ ] Stock comparison tool (side-by-side metrics for multiple securities)

### **v1.2** (Planned)
- [ ] RESTful API with authentication
- [ ] Advanced filtering and saved views
- [ ] Export data to CSV/Excel

### **v2.0** (Future)
- [ ] ML-based short squeeze prediction
- [ ] Integration with news/earnings calendars
- [ ] Real-time alerts via SMS/Slack
- [ ] Multi-exchange support (BSE, MCX)

---

## 📖 Documentation

- **[Setup Guide](./docs/SETUP.md)** - Detailed installation instructions
- **[API Docs](./docs/API.md)** - RESTful API reference (coming soon)
- **[Data Schema](./docs/DATA_SCHEMA.md)** - Database structure and fields
- **[Contributing](./CONTRIBUTING.md)** - How to contribute

---

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest tests/

# Frontend tests
cd frontend
npm test
```

---

## 🤝 Contributing

We're early-stage and not actively accepting contributions yet, but we'd love your feedback!

- **Found a bug?** [Open an issue](https://github.com/Nitfactor/shortingdash/issues)
- **Have an idea?** [Start a discussion](https://github.com/Nitfactor/shortingdash/discussions)
- **Want to collaborate?** Reach out via email or Twitter

---

## ⚖️ Disclaimer

**ShortingDash is for educational and research purposes only.**

- ❌ Not a trading platform or investment advisor
- ❌ Does not execute trades or provide trade recommendations
- ❌ Not affiliated with NSE, SEBI, or any regulatory body
- ✅ Uses only publicly available data
- ✅ Transparent about data sources and methodology

**Always conduct your own due diligence before making financial decisions.**

---

## 📧 Contact & Social

- **Website**: [shortingdash.com](https://www.shortingdash.com/)
- **Twitter**: [@Nitfactor](https://twitter.com/nitfactor) *(Coming soon)*
- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **GitHub Issues**: [Report a bug or request a feature](https://github.com/Nitfactor/shortingdash/issues)

---

## 📄 License

ShortingDash is open-source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **NSE** for publishing Securities Lending & Borrowing data
- **Financial markets community** for feedback and ideas
- **Open-source tools** that power ShortingDash (FastAPI, React, PostgreSQL)

---

**Made by [Nitfactor](https://github.com/Nitfactor) | 2026**
