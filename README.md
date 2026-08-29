# 🎓 3rd Convocation 2026 — IIIT Bhagalpur

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-maroon?style=flat-square)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

The official web portal for the **3rd Convocation (2026)** of the **Indian Institute of Information Technology Bhagalpur (IIIT Bhagalpur)**. Designed with an institutional ceremonial aesthetic, modern responsive typography, robust accessibility, dynamic Google ecosystem integrations, and production-grade performance.

---

## 🏛️ Event Overview

- **Event**: 3rd Convocation of IIIT Bhagalpur
- **Date**: Saturday, 26 September 2026
- **Time**: 10:00 AM Onwards
- **Venue**: Main Lecture Hall, Permanent Campus, IIIT Bhagalpur, Sabour, Bihar — 813210
- **Chief Guest**: Prof. T. N. Singh, Director, IIT Patna

---

## ✨ Key Features & Architecture

### 1. 🎨 Ceremonial Design System
- Built on authentic institutional colors:
  - **Ceremonial Maroon**: `#5E101C` (Primary headers, active indicators, and prominent actions)
  - **Warm Cream**: `#FBF9F5` (Refined page backdrop and subtle surfaces)
  - **Deep Charcoal**: `#1A1A1A` (High-contrast typography)
  - **Ceremonial Gold**: `#C9A24B` (Lotus crests and honorary accents)

### 2. 🛡️ Dual-Layer Dark Reader & Dark Mode Engine
- **Main Hero Protection**: The main photographic hero backdrop, typography, countdown card, and top navigation bar are isolated from automated color inversion using official `data-darkreader-ignore` boundaries.
- **Intentional Event Info Bar**: Switches between an authentic light white card (`#FFFFFF`) and a deliberate rich dark maroon card (`#380B13`) with gold labels and white values when Dark Reader is active.
- **Site-Wide Dark Mode**: All sections below the hero (*Dignitaries, Schedule, Gallery, Notices, Registration, Committees, Footer*) transform naturally into dark mode.

### 3. 📱 Mobile & Responsive Experience
- Adaptive layouts tested across mobile (`< 640px`), tablet (`640px – 1024px`), and ultra-wide desktop monitors (`1400px+`).
- Touch-friendly tap targets ($\ge 44\text{px}$) compliant with WCAG 2.1 AA accessibility guidelines.
- Fluid navigation with interactive slide-out mobile menu and progress indicators.

### 4. ⚡ High-Performance Core & Code Splitting
- **Lazy Loaded Subpages**: Route-level code-splitting with `React.lazy` and `Suspense` for subpages (`/notices`, `/gallery`, `/accommodation`, `/archive`, `/information`, `/committee`).
- **Rollup Chunking**: Segregated vendor bundles (`vendor-react`, `vendor-icons`) to maximize browser caching and achieve near-instant First Contentful Paint (FCP).

### 5. 🔍 SEO & Semantic Structured Data
- Complete Schema.org JSON-LD integration (`Event`, `CollegeOrUniversity`, `WebSite`).
- Canonical URLs, OpenGraph (OG) images, and Twitter Card metadata for rich social sharing.
- Automatically served `/sitemap.xml` and `/robots.txt`.

### 6. 📊 Privacy-Compliant Analytics (GA4)
- Lightweight Google Analytics 4 integration with client-side SPA route transition tracking and anonymized engagement events.

---

## 🔄 Dynamic Content & Cloud Integrations

### 📢 1. Live Notices Management via Google Sheets & Excel
The portal features a zero-maintenance administrative workflow for publishing circulars and documents:
- **Direct Google Visualization Protocol (`gviz/tq`)**: Live notices are fetched directly from published Google Sheets / Excel spreadsheets without requiring a complex backend database.
- **Automated Column Keyword Matching**: The parser intelligently maps spreadsheet columns for `Title`, `Date`, `Category`, `File URL / PDF Link`, `IsPinned`, and `Importance`.
- **Search, Filter & Direct PDF Viewer**: Instant in-browser search, category pills (Academic, Schedule, Guidelines, General), priority pinning, and an embedded PDF modal preview.
- **Offline High-Availability Cache**: Bundled with a fallback JSON store (`src/data/notices.json`) ensuring 100% uptime even during network constraints.

### 📸 2. Automated Gallery Sync with Google Drive
High-resolution event photography is streamed directly from official Google Drive album folders:
- **CLI Sync Automation Script** (`npm run sync-photos` / `scripts/sync-photos.cjs`):
  Connects to Google Drive album folder IDs across four ceremonial categories:
  1. *Degree Distribution*
  2. *Convocation Evening*
  3. *Alumni Meet*
  4. *Speaker Session*
- **Google CDN Optimization**: Automatically extracts Drive file IDs and constructs high-speed, cached CDN thumbnail endpoints (`https://lh3.googleusercontent.com/d/{id}`) and full-resolution view URLs.
- **Structured JSON Manifest**: Compiles synced image arrays into `src/data/drivePhotos.json` for fast client-side rendering with lightbox previews.

### 📝 3. Graduand Registration & Verification Flow
A unified online registration portal for graduating students and attendees:
- **Multi-Field Validation**:
  - Full Name, Institute Roll Number, Department (CSE, ECE, MEA, DSAI), Degree (B.Tech, M.Tech, Ph.D).
  - Validated contact information (Mobile and Institute / Personal Email).
  - Attendance mode selection (In-person attendance or Postal dispatch with delivery address validation).
  - Academic regalia / gown sizing (`S`, `M`, `L`, `XL`, `XXL`) and guest count allocation.
- **Webhook Integration**:
  - Submissions are dispatched asynchronously to a Google Apps Script / Google Sheets Webhook (`VITE_GOOGLE_SHEET_WEBHOOK_URL`).
  - Automatically records timestamped student registrations in real time.
- **Confirmation Pass & Feedback**:
  - Instant submission confirmation modal with ceremonial congratulatory pass and reporting guidelines.

---

## 📂 Project Structure

```text
ConvocationIIITBH/
├── public/
│   ├── assets/                 # Photographic assets, dignitary portraits, campus maps
│   ├── favicon.svg             # Institutional SVG favicon
│   ├── robots.txt              # Search crawler directives
│   ├── sitemap.xml             # Search engine sitemap
│   └── _redirects              # Netlify SPA redirect fallback
├── scripts/
│   └── sync-photos.cjs         # Google Drive album photo sync automation script
├── src/
│   ├── assets/                 # SVGs and static brand marks
│   ├── components/
│   │   ├── common/             # Reusable UI components (SEO, ScrollToTop, AccommodationCTA)
│   │   └── layout/             # Header, Navigation Bar, and Footer
│   ├── data/
│   │   ├── drivePhotos.json    # Synced Google Drive image manifest
│   │   └── notices.json        # High-availability notices fallback data
│   ├── pages/                  # Top-level route pages (Home, 404)
│   ├── sections/               # Modular homepage sections
│   │   ├── Hero/               # Hero section & photographic backdrop
│   │   ├── Countdown/          # Live ceremonial countdown timer
│   │   ├── InformationBar/     # Date, Time, Venue, Edition key metrics
│   │   ├── Dignitaries/        # Chief Guest, Chairman, and Director profiles
│   │   ├── Schedule/           # Minute-by-minute ceremonial timeline
│   │   ├── Notices/            # Official circulars & downloadable PDFs
│   │   ├── Gallery/            # Interactive photo albums & home carousel
│   │   ├── RegistrationForm/   # Student/Attendee registration flow
│   │   ├── HowToReach/         # Air, Rail, Road transit directions & map
│   │   ├── Accommodation/      # Guest house & transit stay details
│   │   ├── Committees/         # Organizing committee member roster
│   │   └── Archive/            # Past convocation records & medalists
│   ├── styles/
│   │   ├── tokens.css          # Design system color and typography tokens
│   │   ├── semantic-tokens.css # Semantic utility classes
│   │   └── index.css           # Global stylesheet & Tailwind directives
│   ├── utils/
│   │   ├── themeDetection.js   # Dark Reader isolation & theme engine
│   │   └── telemetry.js        # Google Analytics 4 tracker
│   ├── App.jsx                 # Route definitions & app providers
│   └── main.jsx                # Application root mount
├── index.html                  # HTML5 shell & Schema.org JSON-LD
├── package.json                # Dependencies and npm scripts
├── tailwind.config.js          # Tailwind design tokens & font definitions
├── vercel.json                 # Vercel SPA routing rewrite rules
└── vite.config.js              # Vite bundler configuration & rollup chunking
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/code-yashkumar/Convocation-iiitbh.git
   cd Convocation-iiitbh
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will start at `http://localhost:3000`.

---

## 🛠️ Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Starts Vite dev server with Hot Module Replacement (HMR) at port 3000 |
| **Production Build** | `npm run build` | Compiles and optimizes assets into the `dist/` directory |
| **Preview Build** | `npm run preview` | Runs a local web server serving the production `dist/` build |
| **Sync Photos** | `npm run sync-photos` | Automates extraction and caching of Google Drive photo albums |

---

## 🌐 Deployment

### Vercel (One-Click)

The repository includes a [`vercel.json`](./vercel.json) file with pre-configured Single Page Application (SPA) rewrites:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

1. Import the repository on [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Click **Deploy**.

---

## 👨‍💻 Author & Lead Developer

Designed, engineered, and architected with ❤️ by **[Yash Kumar](https://github.com/code-yashkumar)** for the **Indian Institute of Information Technology Bhagalpur**.

- **GitHub**: [@code-yashkumar](https://github.com/code-yashkumar)
- **Institution**: Indian Institute of Information Technology Bhagalpur (IIITBH)

---

## 📄 License & Copyright

Developed for the **Indian Institute of Information Technology Bhagalpur**.  
© 2026 IIIT Bhagalpur. All rights reserved.
