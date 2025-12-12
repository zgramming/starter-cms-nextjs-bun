// Environment variables configuration
// Create .env.local file in root directory with these values

export const env = {
  // API Configuration
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  apiTimeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,

  // Authentication
  tokenKey: "auth_token",
  refreshTokenKey: "refresh_token",

  // App Configuration
  appName: process.env.NEXT_PUBLIC_APP_NAME || "CMS Admin",
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",

  // Feature Flags
  enableDevTools: process.env.NODE_ENV === "development",
  enableMocking: process.env.NEXT_PUBLIC_ENABLE_MOCKING === "true",

  // Pagination
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
} as const;

export type Env = typeof env;
