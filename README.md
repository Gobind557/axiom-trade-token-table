# Axiom Trade Token Discovery Dashboard

A high-performance,  replica of Axiom Trade's token discovery table with real-time updates, interactive popups, and optimized rendering. Built with Next.js 14 and modern React patterns.



## ✨ Features

- **📊 Three-Column Token Display**: Organized view of New Pairs, Final Stretch, and Migrated tokens
- **🔄 Real-time Sorting**: Sort tokens by market cap, volume, price, holders, transactions, or age
- **💬 Interactive Popups**: Hover over tokens to see detailed information and enlarged images
- **🎨 Modern UI**: Dark theme with smooth animations and transitions
- **⚡ Optimized Performance**: Memoized components, efficient Redux selectors, and code splitting
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices
- **🎯 Type-Safe**: Full TypeScript support with strict mode

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ETERNA

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS |
| **State Management** | Redux Toolkit |
| **UI Components** | Radix UI + Custom Components |
| **Icons** | Lucide React |
| **Code Quality** | ESLint + Prettier |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/             # Atomic Design Pattern
│   ├── atoms/             # Basic building blocks (Button, Icon, Badge)
│   ├── molecules/         # Component combinations (TokenCard, TokenPopup)
│   ├── organisms/         # Complex sections (TokenColumn, NavigationBar)
│   └── templates/         # Page layouts (DashboardLayout)
├── store/                  # Redux store configuration
│   ├── slices/            # Redux slices (tokens, UI state)
│   └── hooks.ts           # Typed Redux hooks
├── data/                   # Sample data and constants
├── lib/                    # Utilities and helpers
└── types/                  # TypeScript type definitions
```

For detailed architecture, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🎮 Usage

### Viewing Tokens

- Browse tokens across three columns: **New Pairs**, **Final Stretch**, and **Migrated**
- Each token card displays key metrics: market cap, volume, holders, transactions, and fees

### Sorting Tokens

- Click the sort icon in any column header
- Cycle through sort options: Market Cap → Volume → Price → Holders → Transactions → Age
- Click again to toggle ascending/descending order

### Interactive Features

- **Token Popup**: Hover over the users icon (👥) on any token card to see detailed information
- **Image Popup**: Hover over a token's image to see an enlarged view
- **Tooltips**: Hover over icons to see helpful tooltips

## 🎨 Key Components

### TokenCard
Displays individual token information with metrics, icons, and action buttons.

### TokenColumn
Organizes tokens in a scrollable column with sorting and filtering capabilities.

### TokenPopup
Shows detailed token information on hover, including social links and metrics.

### ImagePopup
Displays enlarged token images with smooth transitions.

## ⚡ Performance Optimizations

- **React.memo**: Components are memoized to prevent unnecessary re-renders
- **useMemo & useCallback**: Expensive computations and callbacks are memoized
- **Redux Selectors**: Combined selectors with `shallowEqual` for efficient state access
- **Code Splitting**: Lazy loading for non-critical components
- **Optimized Imports**: Tree-shaking enabled for icon libraries

## 📊 Performance Metrics

- **First Contentful Paint**: < 0.5s
- **Largest Contentful Paint**: < 2.5s (target)
- **Total Blocking Time**: < 400ms (target)
- **Cumulative Layout Shift**: 0
- **Speed Index**: < 3s (target)

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Automatic code formatting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- Inspired by [Axiom Trade](https://axiom.trade)
- Built with [Next.js](https://nextjs.org)
- UI components from [Radix UI](https://www.radix-ui.com)
- Icons from [Lucide](https://lucide.dev)

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Made with ❤️ using Next.js and TypeScript**
