/**
 * Route configuration for middleware
 */

// Routes that don't require authentication
export const PUBLIC_ROUTES = ["/", "/login"] as const;

// Routes that should redirect to dashboard if user is already logged in
export const AUTH_ROUTES = ["/login"] as const;

// Route prefixes that require authentication
export const PROTECTED_ROUTE_PREFIXES = ["/dashboard", "/app"] as const;

// API routes that should be excluded from middleware
export const API_ROUTES = ["/api"] as const;

/**
 * Check if the pathname is a public route
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => route === pathname);
}

/**
 * Check if the pathname is an auth route (login, register, etc.)
 */
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => route === pathname);
}

/**
 * Check if the pathname requires protection
 */
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Check if the pathname is an API route
 */
export function isApiRoute(pathname: string): boolean {
  return API_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Check if middleware should run for this route
 */
export function shouldRunMiddleware(pathname: string): boolean {
  // Don't run on API routes
  if (isApiRoute(pathname)) return false;

  // Don't run on Next.js internal routes
  if (pathname.startsWith("/_next")) return false;

  // Don't run on static files
  if (pathname.includes(".")) return false;

  return true;
}
