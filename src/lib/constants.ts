/**
 * Application constants and configuration values
 */

export const COLUMN_TYPES = {
  NEW_PAIRS: "new",
  FINAL_STRETCH: "final-stretch",
  MIGRATED: "migrated",
} as const;

export const COLUMN_TITLES = {
  [COLUMN_TYPES.NEW_PAIRS]: "New Pairs",
  [COLUMN_TYPES.FINAL_STRETCH]: "Final Stretch",
  [COLUMN_TYPES.MIGRATED]: "Migrated",
} as const;

// WebSocket configuration
export const WS_RECONNECT_DELAY = 3000;
export const WS_HEARTBEAT_INTERVAL = 30000;
export const WS_UPDATE_INTERVAL = 2000; // Mock update interval in ms

// Performance thresholds
export const INTERACTION_THRESHOLD_MS = 100;
export const LIGHTHOUSE_TARGET_SCORE = 90;

// Responsive breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

