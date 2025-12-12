/**
 * Auth middleware utilities
 * Export all helper functions for use in middleware
 */

export {
  verifyToken,
  checkCategoryAccess,
  checkModuleAccess,
  checkMenuAccess,
  extractRouteParams,
} from './verify-token';

export {
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  PROTECTED_ROUTE_PREFIXES,
  API_ROUTES,
  isPublicRoute,
  isAuthRoute,
  isProtectedRoute,
  isApiRoute,
  getPostLoginRedirect,
} from './route-matcher';
