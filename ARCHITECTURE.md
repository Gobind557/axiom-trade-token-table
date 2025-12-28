# Axiom Trade Token Discovery Table - Architecture Plan

## Project Overview
Pixel-perfect replica of Axiom Trade's token discovery table with real-time updates, multiple interaction patterns, and optimized performance.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + React Query
- **UI Components**: Radix UI + shadcn/ui
- **Real-time**: WebSocket (mock implementation)
- **Performance**: React.memo, useMemo, useCallback, code splitting

## Atomic Architecture Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles
│
├── components/            # Atomic Design Pattern
│   ├── atoms/            # Basic building blocks
│   │   ├── Button/
│   │   ├── Badge/
│   │   ├── Icon/
│   │   └── Skeleton/
│   │
│   ├── molecules/        # Simple component combinations
│   │   ├── TokenCard/
│   │   ├── MetricRow/
│   │   ├── PercentageIndicator/
│   │   └── ActionButton/
│   │
│   ├── organisms/        # Complex UI sections
│   │   ├── TokenColumn/
│   │   ├── TokenTable/
│   │   ├── NavigationBar/
│   │   └── BottomNav/
│   │
│   └── templates/        # Page-level layouts
│       └── DashboardLayout/
│
├── features/             # Feature-based modules
│   ├── tokens/
│   │   ├── components/   # Feature-specific components
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API/WebSocket services
│   │   └── types/       # TypeScript types
│   │
│   └── ui/              # Shared UI features
│       ├── popover/
│       ├── tooltip/
│       ├── modal/
│       └── sorting/
│
├── store/               # Redux store
│   ├── slices/
│   │   ├── tokensSlice.ts
│   │   ├── uiSlice.ts
│   │   └── websocketSlice.ts
│   ├── hooks.ts         # Typed hooks
│   └── store.ts         # Store configuration
│
├── hooks/               # Shared custom hooks
│   ├── useWebSocket.ts
│   ├── useTokenSorting.ts
│   └── useDebounce.ts
│
├── lib/                 # Utilities and configs
│   ├── utils.ts         # Helper functions
│   ├── constants.ts     # App constants
│   ├── api.ts           # API client setup
│   └── websocket.ts     # WebSocket client
│
└── types/               # Global TypeScript types
    └── index.ts
```

## Feature Breakdown

### Phase 1: Project Setup & Foundation
- [x] Next.js 14 project initialization
- [x] TypeScript strict configuration
- [x] Tailwind CSS setup
- [x] Redux Toolkit + React Query setup
- [x] shadcn/ui installation
- [x] Folder structure creation
- [x] ESLint/Prettier configuration

### Phase 2: Core UI Components (Atoms & Molecules)
- [ ] Button component with variants
- [ ] Badge/Status indicators
- [ ] Icon system
- [ ] Skeleton loaders
- [ ] TokenCard molecule
- [ ] MetricRow molecule
- [ ] PercentageIndicator molecule

### Phase 3: Layout & Navigation
- [ ] Top navigation bar
- [ ] Column headers (New Pairs, Final Stretch, Migrated)
- [ ] Bottom navigation
- [ ] Responsive layout system

### Phase 4: Token Display & Interactions
- [ ] TokenColumn organism
- [ ] Token card with all metrics
- [ ] Hover effects
- [ ] Click actions
- [ ] Popover implementation
- [ ] Tooltip implementation
- [ ] Modal implementation

### Phase 5: Data Management
- [ ] Redux slices for token state
- [ ] React Query setup for data fetching
- [ ] WebSocket mock implementation
- [ ] Real-time price updates
- [ ] Color transition animations

### Phase 6: Advanced Features
- [ ] Sorting functionality
- [ ] Filtering
- [ ] Loading states (skeleton, shimmer, progressive)
- [ ] Error boundaries
- [ ] Performance optimizations

### Phase 7: Polish & Optimization
- [ ] Pixel-perfect styling adjustments
- [ ] Performance optimization (memoization, code splitting)
- [ ] Lighthouse optimization
- [ ] Responsive design (320px+)
- [ ] Accessibility improvements

## Performance Targets
- Lighthouse Score: ≥ 90 (mobile & desktop)
- Interaction latency: < 100ms
- No layout shifts
- Smooth 60fps animations

## State Management Strategy
- **Redux Toolkit**: Complex state (tokens, UI state, WebSocket connection)
- **React Query**: Server state, caching, background updates
- **Local State**: Component-specific UI state (hover, open/closed)

## WebSocket Mock Strategy
- Simulate real-time price updates
- Update token metrics every 1-2 seconds
- Smooth color transitions (green/red) for price changes
- Connection status management

## Responsive Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## Accessibility Requirements
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Focus management in modals

