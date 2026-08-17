# ◆ Apex Funded — Institutional Prop Firm & Evaluation Platform

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-C59A45?style=for-the-badge)](LICENSE)

An institutional-grade, high-converting Proprietary Trading Firm web platform built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Features a bespoke **warm-cream editorial luxury aesthetic**, interactive **3D flip card pricing tiers**, a **live trade execution simulator**, verified **payout proof certificates**, and an institutional **trader dashboard**.

---

## ✨ Key Features & Architectural Highlights

### 1. 🏛️ Editorial Luxury Aesthetic & Atmosphere
- **Warm-Cream Depth System**: Curated `#FAF8F5` base surface with subtle SVG film grain noise overlays, ambient brass/emerald lighting orbs, and radial-masked technical grids.
- **Editorial Typography**: Pairing serif headline typography with JetBrains Mono precision metric readouts.
- **Zero-CLS Navigation**: Fixed 3-column header architecture with Framer Motion `layoutId="activeNavPill"` spring physics ensuring zero layout shift.

### 2. ⚡ Tradeify-Style 3D Flip Card Pricing Matrix
- **3 Challenge Models**:
  - **Growth**: Quick evaluation (`Pass in 1 day` • 5-day payouts • No consistency trap).
  - **Select**: Daily payouts • Flexible funded rules (`Pass in 3 days` • 40% consistency).
  - **Lightning**: Instant simulated funding (`Instant` • 5-day payouts • 20% consistency).
- **4 Capital Tiers**: `$25K`, `$50K`, `$100K`, and `$150K` accounts.
- **3D Card Flip**: Smooth horizontal Y-axis rotation to inspect Phase 1 Evaluation rules and Phase 2 Funded terms.
- **Platform Selector**: Instant switching between **Tradovate**, **MetaTrader 5**, and **NinjaTrader**.

### 3. 📊 Live Social Proof & Verified Payout Explorer
- **Infinite Marquee Ticker**: Continuous live stream of simulated disbursements.
- **Clickable Proof Modals**: Inspect verified payout slips showing disbursement IDs, recipient names, payout rails (Deel, Crypto USDT, Wise), and settlement timestamps.
- **Dynamic Trustpilot Review Carousel**: Rotating verified trader testimonials.

### 4. 📈 Institutional Trader Dashboard
- **Interactive Equity Chart**: Real-time equity curve visualization powered by Chart.js with dynamic timeframe toggles (`1D`, `7D`, `30D`, `All`).
- **Live Trade Execution Simulator**: Mini-terminal supporting live ticking price feeds (EUR/USD, NQ Futures, Gold XAU/USD), market Buy/Sell execution, and real-time floating P&L.
- **Rule Risk Guard**: Pre-trade lot sizing and daily loss limit compliance validator (`🟢 Safe`, `🟡 Caution`, `🔴 Rule Danger`).
- **Economic Calendar Feed**: High-impact news event tracker (CPI, NFP, FOMC).
- **Multi-Account Manager**: Seamless switching between multiple challenge accounts.

### 5. 🏆 Official Funded Trader Certificate Generator
- Generates a gold-embossed, serial-numbered certificate of funded achievement (`#APX-CERT-2026-XXXX`).
- One-click actions to **Copy Verification Link**, **Share to X (Twitter)**, or **Download / Print PDF**.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) | Component architecture & reactive UI |
| **Build Tool** | [Vite 6](https://vitejs.org/) | Next-generation ultra-fast frontend tooling |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Bespoke editorial design system & utilities |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | 3D card flips, layoutId tabs, and spring modals |
| **Charts** | [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) | Interactive equity curves & drawdown meters |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, lightweight vector iconography |
| **State Management** | React Context + LocalStorage | Persistent multi-account simulation and auth state |

---

## 🚀 Quick Start & Local Development

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/apex-funded.git

# Navigate into project directory
cd "Apex Funded"

# Install project dependencies
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 3. Production Build
```bash
npm run build
```
Generates an optimized production bundle in the `dist/` folder.

---

## 📁 Project Directory Structure

```text
Apex Funded/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── AnimatedCounter.jsx     # Smooth metric counter component
│   │   ├── dashboard/
│   │   │   ├── CalculatorModal.jsx     # Rule Risk Guard & lot sizer
│   │   │   ├── DashboardCalendar.jsx   # Trading journal & calendar
│   │   │   ├── DashboardHeader.jsx     # Account selector & tool triggers
│   │   │   ├── DashboardHistory.jsx    # Historical trade logs
│   │   │   ├── DashboardNav.jsx        # Sub-tab navigation
│   │   │   ├── DashboardOverview.jsx   # Main metrics & equity curve
│   │   │   ├── DashboardPlatform.jsx   # Platform downloads (Tradovate/MT5/NinjaTrader)
│   │   │   ├── DashboardRules.jsx      # Live rule meters & reset simulator
│   │   │   ├── EconomicCalendarWidget.jsx # Macro news feed
│   │   │   ├── LiveTradeSimulator.jsx  # Interactive live order simulator
│   │   │   └── LoginInfoModal.jsx      # Connection keys & terminal credentials
│   │   ├── AuthModal.jsx               # Sign In / Sign Up modal
│   │   ├── CertificateModal.jsx        # Official certificate generator
│   │   ├── CheckoutModal.jsx           # Challenge checkout flow
│   │   ├── Dashboard.jsx               # Main dashboard container
│   │   ├── FAQ.jsx                     # Searchable rules & drawdown FAQ
│   │   ├── Footer.jsx                  # Global footer & platform status
│   │   ├── HelpCenter.jsx              # Support ticket submission desk
│   │   ├── Hero.jsx                    # Editorial hero, live card & marquee
│   │   ├── Home.jsx                    # Landing page workflow
│   │   ├── Navbar.jsx                  # Zero-CLS unified header navigation
│   │   ├── PayoutProofModal.jsx        # Verified transaction slip modal
│   │   ├── Pricing.jsx                 # 3D Flip Card pricing matrix
│   │   └── Rules.jsx                   # Trading rules blueprint
│   ├── context/
│   │   └── AppContext.jsx              # Global simulation & auth state store
│   ├── data/
│   │   └── propFirmData.js             # Pricing tiers, platforms & reviews
│   ├── App.jsx                         # Main layout router
│   ├── index.css                       # Design tokens, noise & 3D utilities
│   └── main.jsx                        # React root entry point
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔐 Default Demo Account Credentials

For testing and demonstration, you can log in using:
- **Email**: `trader@apexfunded.io`
- **Password**: `password123`

*Or create a new account with any email during the interactive checkout flow.*

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with precision for institutional prop traders. © 2026 Apex Funded. All simulation metrics for educational purposes.</sub>
</div>
