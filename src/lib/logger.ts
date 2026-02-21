/**
 * Production-safe logging utility.
 * In production builds, console.error calls are stripped by terser.
 * This utility provides a consistent error logging pattern.
 */

type ErrorContext = Record<string, unknown>;

export const logError = (message: string, error?: unknown, context?: ErrorContext) => {
  if (import.meta.env.DEV) {
    console.error(`[MediStartup] ${message}`, error, context);
  }
  // In production, errors could be sent to an external service (e.g., Sentry)
  // For now, production console.error calls are stripped by terser config
};

export const logWarn = (message: string, context?: ErrorContext) => {
  if (import.meta.env.DEV) {
    console.warn(`[MediStartup] ${message}`, context);
  }
};
