# WorkUlator 💰

A modern, responsive web application for estimating software project costs with real-time conversion between **USD** and **Guaraníes (Gs)**.

![WorkUlator](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 📊 Project Configuration
- **Hourly Rate** input (USD) with default value of $17
- **Exchange Rate** customization (Gs per USD) with default of 7010
- **Profit Margin** adjustment (%) with default of 15%

### 📝 Phase Management
- Add unlimited project phases with custom names
- Estimate hours for each phase
- Real-time cost calculation per phase
- Easy phase editing and removal
- Reset functionality to clear all phases

### 💵 Automatic Calculations
- Per-phase cost calculation in USD and Guaraníes
- Total hours aggregation
- Subtotal calculations in both currencies
- Profit margin application
- Final total with comprehensive breakdown

### 📈 Visual Results
- Summary cards showing key metrics (Total Hours, Subtotal, Profit, Final Total)
- Interactive bar chart showing cost distribution by phase
- Dual-axis visualization (USD and Millions Gs)

### 🎨 Modern UI/UX
- **Dark/Light mode toggle** with system preference detection
- Fully responsive design (mobile, tablet, desktop)
- Clean, professional interface using shadcn/ui components
- Smooth transitions and animations
- Proper number formatting (USD: `$1,234.56` | Guaraníes: `Gs 1.234.567`)

### 💾 Data Persistence
- Save configuration to localStorage
- Auto-load saved settings on app launch
- Preserve both settings and phases across sessions

### 📄 PDF Export
- Generate professional PDF quotes with all details
- Automatic download with timestamped filename

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)** - Next Generation Frontend Tooling
- **[React 19](https://react.dev/)** - UI Library
- **[TypeScript](https://www.typescriptlang.org/)** - Type Safety
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-First CSS Framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable Component Library
- **[Lucide React](https://lucide.dev/)** - Beautiful Icon Set
- **[Recharts](https://recharts.org/)** - Composable Charting Library
- **[jsPDF](https://github.com/parallax/jsPDF)** - PDF Generation

## 📖 Usage Example

1. **Set your rates:** Hourly Rate: `17 USD` | Exchange Rate: `7010 Gs` | Profit Margin: `15%`
2. **Add project phases:** Design (10h), Backend (40h), Frontend (30h), Testing (15h)
3. **View results:** Total: 95h | Subtotal: $1,615 / Gs 11,321,150 | Profit: $242.25 | **Final: $1,857.25 / Gs 13,019,323**
4. **Actions:** Download PDF quote or save configuration

## 🧮 Calculation Logic

```
Cost (USD) = Hours × Hourly Rate
Cost (Gs) = Cost (USD) × Exchange Rate
Profit = Subtotal × (Profit Margin / 100)
Final Total = Subtotal + Profit
```

## 🎯 Project Structure

```
WorkUlator/
├── src/
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── inputs-section.tsx    # Configuration & phase inputs
│   │   ├── results-section.tsx   # Results display & charts
│   │   ├── theme-provider.tsx    # Theme context
│   │   └── theme-toggle.tsx      # Theme switcher
│   ├── lib/
│   │   ├── calculator.ts         # Core calculation logic
│   │   ├── pdf-generator.ts      # PDF export functionality
│   │   └── utils.ts              # Utility functions
│   ├── types/
│   │   └── calculator.ts         # TypeScript types
│   └── App.tsx                   # Main app component
└── package.json
```

---

**Made with ❤️ using Vite + React + TypeScript + TailwindCSS + shadcn/ui**
