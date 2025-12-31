/**
 * WebSocket mock service for real-time token price updates
 * Simulates price changes with random fluctuations
 */

import type { Token } from "@/types";
import { WS_UPDATE_INTERVAL } from "@/lib/constants";

type PriceUpdateCallback = (
  updates: Map<string, { price: number; priceChange24h: number }>
) => void;

class WebSocketService {
  private intervalId: NodeJS.Timeout | null = null;
  private callbacks: Set<PriceUpdateCallback> = new Set();
  private tokens: Map<string, Token> = new Map();
  private isRunning = false;

  /**
   * Start the WebSocket mock service
   */
  start(tokens: Token[]): void {
    if (this.isRunning) {
      this.stop();
    }

    if (tokens.length === 0) {
      return;
    }

    // Store tokens for reference
    tokens.forEach((token) => {
      this.tokens.set(token.id, token);
    });

    this.isRunning = true;

    // Simulate price updates at regular intervals
    this.intervalId = setInterval(() => {
      this.simulatePriceUpdates();
    }, WS_UPDATE_INTERVAL);
  }

  /**
   * Stop the WebSocket mock service
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  /**
   * Subscribe to price updates
   */
  subscribe(callback: PriceUpdateCallback): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  /**
   * Simulate price updates for all tokens
   */
  private simulatePriceUpdates(): void {
    const updates = new Map<
      string,
      { price: number; priceChange24h: number }
    >();

    this.tokens.forEach((token) => {
      // Generate random price change (-10% to +10%) for more visible changes
      const changePercent = (Math.random() - 0.5) * 0.2; // -10% to +10%
      const currentPrice = token.price;
      const newPrice = Math.max(0.000001, currentPrice * (1 + changePercent));

      // Calculate 24h change (simplified - just use current change)
      const priceChange24h = changePercent * 100;

      updates.set(token.id, {
        price: newPrice,
        priceChange24h: priceChange24h,
      });

      // Update stored token with new price for next iteration
      this.tokens.set(token.id, {
        ...token,
        price: newPrice,
        priceChange24h: priceChange24h,
      });
    });

    // Notify all subscribers
    if (updates.size > 0) {
      this.callbacks.forEach((callback) => {
        callback(updates);
      });
    }
  }

  /**
   * Update tokens list
   */
  updateTokens(tokens: Token[]): void {
    tokens.forEach((token) => {
      this.tokens.set(token.id, token);
    });
  }
}

// Export singleton instance
export const websocketService = new WebSocketService();
