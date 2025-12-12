import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes (accessible without authentication)
const PUBLIC_ROUTES = ['/', '/login'];

// Auth routes (redirect if already logged in)
const AUTH_ROUTES = ['/login'];

// Helper to check if route is public
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}

// Helper to check if route is auth route
function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.includes(pathname);
}

// Helper to check if route is protected
function isProtectedRoute(pathname: string): boolean {
  return pathname.startsWith('/dashboard') || pathname.startsWith('/app');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get auth token from cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }
  
  // Redirect to dashboard if already logged in and trying to access auth routes
  if (isAuthRoute(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect to login if not authenticated and trying to access protected routes
  if (isProtectedRoute(pathname) && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Allow request to continue
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$|.*\\.webp$).*)',
  ],
};
