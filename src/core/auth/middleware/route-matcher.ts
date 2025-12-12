/**
 * Route configuration for middleware
 */

// Routes that don't require authentication
export const PUBLIC_ROUTES = [
  '/',
  '/login',
] as const;

// Routes that should redirect to dashboard if user is already logged in
export const AUTH_ROUTES = [
  '/login',
] as const;

// Route prefixes that require authentication
export const PROTECTED_ROUTE_PREFIXES = [
  '/dashboard',
  '/app',
] as const;

// API routes that should be excluded from middleware
export const API_ROUTES = [
  '/api',
] as const;

/**
 * Check if the pathname is a public route
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname as any);
}

/**
 * Check if the pathname is an auth route (login, register, etc.)
 */
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.includes(pathname as any);
}

/**
 * Check if the pathname is a protected route
 */
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(prefix => pathname.startsWith(prefix));
}

/**
 * Check if the pathname is an API route
 */
export function isApiRoute(pathname: string): boolean {
  return API_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * Get the redirect path after login
 * If there's a redirect param in the URL, use that
 * Otherwise, redirect to dashboard
 */
export function getPostLoginRedirect(searchParams: URLSearchParams): string {
  const redirect = searchParams.get('redirect');
  
  // Validate redirect URL to prevent open redirect vulnerabilities
  if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect;
  }
  
  return '/dashboard';
}
