# 📊 BizPulse — Executive Analytics Dashboard

> A production-grade business intelligence dashboard built for executive decision-making, featuring real-time KPI tracking, anomaly detection, and auto-generated briefings.

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bizpulse--mu.vercel.app-3B82F6?style=for-the-badge&logo=vercel&logoColor=white)](https://bizpulse-mu.vercel.app)

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=flat-square&logo=chartdotjs&logoColor=white)

</div>

---

## Screenshot

![BizPulse Dashboard Preview](https://bizpulse-mu.vercel.app/preview.png)

> *Dark-theme executive dashboard — Overview page showing KPI cards, revenue trend, and department spend breakdown.*

---

## Overview

BizPulse is an **executive analytics dashboard** built as a portfolio project to demonstrate full-stack front-end capabilities in a real-world business context. The data represents a fictional Dubai-based company (Gulf Dynamics Group) operating in FY 2024, with figures in **AED**.

The project covers five core analytics views, a typed component system, and a statistical anomaly detection narrative — reflecting the kind of tooling used in enterprise finance and operations teams across the UAE.

---

## Features

### 5 Analytics Pages

| Page | Description |
|---|---|
| **Overview** | 4 live KPI cards · Revenue vs Target area chart · Department spend donut chart |
| **Revenue** | Monthly revenue vs expenses bar chart · Best month, worst month, average margin stat cards |
| **Departments** | Horizontal budget vs actual bar chart · Per-department over/under-budget status cards |
| **Anomaly Detection** | Severity-coded alert cards with financial impact · Statistical detection methodology explained |
| **Executive Briefing** | 3 auto-generated insight slides derived from live data · Recommended actions for leadership |

### Technical Highlights

- **Fully typed** — all props, data models, and component interfaces defined with TypeScript strict mode
- **Responsive sidebar** navigation with active-state highlighting and hover effects
- **Custom Recharts tooltips** styled to the dark theme
- **Data-driven briefings** — insight text and metrics computed at render from a single source of truth
- **Zero TypeScript errors** — passes `tsc -b` with `noUnusedLocals` and `noUnusedParameters` enabled

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Language | TypeScript 6 (strict mode) |
| Build Tool | Vite 8 with Oxc compiler |
| Charts | Recharts 3 |
| Routing | React Router DOM 7 |
| Icons | Lucide React |
| HTTP Client | Axios *(wired for API integration)* |
| Deployment | Vercel |

---

## Run Locally

```bash
# Clone the repository
git clone https://github.com/ferchichiislem/bizpulse.git
cd bizpulse

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## Project Structure

```
src/
├── types/          # TypeScript interfaces (RevenueData, Department, Anomaly, KPI)
├── data/           # Mock dataset — 12-month AED financials, 5 departments, 3 anomalies
├── components/     # Sidebar, KPICard, ChartCard
└── pages/          # Overview, Revenue, Departments, Anomalies, Briefing
```

---

## Author

**Islem Ferchichi**

[![Email](https://img.shields.io/badge/Email-ferchichiislem05%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:ferchichiislem05@gmail.com)

---

<div align="center">
  <sub>Built with React + TypeScript · Deployed on Vercel · Dubai, UAE</sub>
</div>
