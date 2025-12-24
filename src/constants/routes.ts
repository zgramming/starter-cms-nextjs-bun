/**
 * Application Route Constants
 *
 * Centralized route definitions for type-safe navigation
 * Use these constants instead of hardcoded strings
 *
 * @example
 * ```ts
 * import { ROUTES } from "@/constants/routes";
 * router.push(ROUTES.USERS.LIST);
 * ```
 */

export const ROUTES = {
  // Public Routes
  HOME: "/",
  LOGIN: "/login",

  // Dashboard
  DASHBOARD: "/dashboard",

  // User Management
  USERS: {
    LIST: "/setting/user",
    CREATE: "/setting/user/create",
    EDIT: (id: string | number) => `/setting/user/${id}/edit`,
    DETAIL: (id: string | number) => `/setting/user/${id}`,
  },

  // Role Management
  ROLES: {
    LIST: "/setting/role",
    CREATE: "/setting/role/create",
    EDIT: (id: string | number) => `/setting/role/${id}/edit`,
    DETAIL: (id: string | number) => `/setting/role/${id}`,
  },

  // Access Control / Permissions
  PERMISSIONS: {
    LIST: "/setting/access-control",
  },

  // App Structure
  APP: {
    MODULES: "/setting/app-module",
    MENUS: "/setting/app-menu",
    CATEGORIES: "/setting/app-category",
  },

  // Master Data
  MASTER: {
    CATEGORIES: "/setting/master-category",
    DATA: "/setting/master-data",
  },

  // Parameters
  PARAMETERS: {
    LIST: "/setting/parameter",
  },

  // Examples
  EXAMPLES: {
    UI_COMPONENTS: "/examples/ui-components",
  },
} as const;

/**
 * API Route Constants (for Next.js API routes)
 */
export const API_ROUTES = {
  HELLO: "/api/hello",
} as const;
