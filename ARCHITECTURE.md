# Project Architecture

## Overview

This project follows a **strict domain-driven architecture** with clear separation between generic utilities and feature-specific code. The architecture emphasizes simplicity, maintainability, and explicit imports.

## Core Principles

1. **NO Barrel Exports**: Direct imports only, no `index.ts` re-exports
2. **Core = Generic Only**: Pure utilities without business logic
3. **Modules = Feature-Specific**: All domain logic lives in modules
4. **Centralized Types**: All interfaces organized in `types/` folder
5. **Simplicity First**: Avoid over-engineering and unnecessary complexity

## Folder Structure

```
src/
├── core/                    # GENERIC utilities only (NO business logic)
│   ├── api/
│   │   ├── crud.ts         # createRestApiService<T>() factory
│   │   └── EXTEND_PATTERN.ts  # Documentation for extending API
│   └── config/
│       └── env.ts          # Environment configuration
│
├── modules/                # FEATURE-SPECIFIC code (domain logic)
│   ├── auth/               # Authentication module
│   │   ├── api/
│   │   │   └── auth.ts     # authApi (login, register, logout, etc)
│   │   ├── store/
│   │   │   └── auth.ts     # useAuthStore (Zustand)
│   │   └── middleware/
│   │       ├── verify-token.ts
│   │       └── route-matcher.ts
│   │
│   └── setting/            # Settings modules
│       ├── user/
│       │   ├── api/
│       │   │   └── user.ts # userApi with custom methods
│       │   ├── components/
│       │   │   └── UserForm.tsx
│       │   └── hooks/
│       │       └── useUsers.ts
│       ├── role/
│       │   ├── api/
│       │   │   └── role.ts # roleApi with custom methods
│       │   ├── components/
│       │   │   └── RoleForm.tsx
│       │   └── hooks/
│       │       └── useRoles.ts
│       ├── parameter/
│       │   └── api/
│       │       └── parameter.ts
│       ├── master-category/
│       │   └── api/
│       │       └── category.ts
│       ├── app-module/
│       │   └── api/
│       │       └── module.ts
│       └── app-menu/
│           └── api/
│               └── menu.ts
│
├── types/                  # ALL interfaces centralized here
│   ├── api.ts             # ApiResponse, PaginatedResponse, LoginRequest, etc
│   ├── user.ts            # User, Role, AuthenticatedUser
│   ├── settings.ts        # MasterData, MasterCategory, Parameter
│   ├── access-control.ts  # AccessCategory, AccessModule, AccessMenu
│   ├── app-structure.ts   # Category, Module, Menu, BreadcrumbItem
│   └── components.ts      # Column<T>, DataTableProps<T>, etc
│
├── shared/                 # Shared resources across features
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   │   ├── DataTable.tsx
│   │   │   ├── TableToolbar.tsx
│   │   │   ├── DeleteConfirmModal.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   └── layout/        # Layout components
│   │       ├── AdminLayout.tsx
│   │       ├── MainSidebar.tsx
│   │       └── TopBar.tsx
│   ├── hooks/             # Shared React Query hooks
│   │   ├── useCrudApi.ts  # Generic CRUD hook
│   │   ├── useUserApi.ts  # User-specific queries
│   │   └── useRoleApi.ts  # Role-specific queries
│   └── lib/               # Utility libraries
│       ├── http-client.ts # Axios wrapper with interceptors
│       └── api-service.ts # Generic API service class
│
├── styles/
│   └── globals.css        # Single global stylesheet
│
├── pages/                 # Next.js pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── dashboard.tsx
│   ├── app/
│   │   └── [categoryId]/[moduleId]/
│   │       ├── index.tsx
│   │       ├── user.tsx
│   │       ├── user-example.tsx
│   │       ├── role.tsx
│   │       └── role-new.tsx
│   ├── setting/
│   │   ├── user/index.tsx
│   │   ├── role/index.tsx
│   │   ├── parameter/index.tsx
│   │   ├── master-category/index.tsx
│   │   └── app-menu/index.tsx
│   └── api/
│       └── hello.ts
│
└── middleware.ts          # Next.js middleware for auth
```

## Import Patterns

### Path Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Direct Imports (NO Barrel Exports)

**IMPORTANT**: This project does NOT use barrel exports (`index.ts` files). Always import directly from the source file.

#### ✅ Correct - Direct Imports

```typescript
// Import shared components directly
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable } from "@/shared/components/ui/DataTable";
import { TopBar } from "@/shared/components/layout/TopBar";

// Import from modules directly
import { authApi } from "@/modules/auth/api/auth";
import { useAuthStore } from "@/modules/auth/store/auth";
import { userApi } from "@/modules/setting/user/api/user";
import { UserForm } from "@/modules/setting/user/components/UserForm";

// Import types directly
import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type { User, Role } from "@/types/user";

// Import core utilities directly
import { createRestApiService } from "@/core/api/crud";
import { env } from "@/core/config/env";
```

#### ❌ Wrong - Barrel Exports (NOT ALLOWED)

```typescript
// DON'T do this - barrel exports are forbidden
import { AdminLayout, DataTable } from "@/shared/components";
import { UserForm, useUsers } from "@/modules/setting/user";
import { apiClient } from "@/core/api";
```

````

## API Layer Architecture

### Core: Generic API Factory

**File:** `src/core/api/crud.ts`

Provides a generic factory function for creating REST API services:

```typescript
import { ApiService } from "@/shared/lib/api-service";
import type { ApiResponse, PaginatedResponse } from "@/types/api";

export function createRestApiService<T>(endpoint: string) {
  const apiService = new ApiService(endpoint);

  return {
    getAll: (params?: any) => apiService.get<PaginatedResponse<T>>("", params),
    getById: (id: string | number) =>
      apiService.get<ApiResponse<T>>(`/${id}`),
    create: (data: Partial<T>) => apiService.post<ApiResponse<T>>("", data),
    update: (id: string | number, data: Partial<T>) =>
      apiService.put<ApiResponse<T>>(`/${id}`, data),
    delete: (id: string | number) => apiService.delete<ApiResponse<any>>(`/${id}`),
  };
}
````

### Modules: Feature-Specific APIs

Each module extends the generic API with custom methods:

**File:** `src/modules/setting/user/api/user.ts`

```typescript
import { createRestApiService } from "@/core/api/crud";
import { ApiService } from "@/shared/lib/api-service";
import type { User } from "@/types/user";
import type { ApiResponse } from "@/types/api";

const baseApi = createRestApiService<User>("/users");
const apiService = new ApiService("/users");

export const userApi = {
  ...baseApi,
  // Custom methods specific to user domain
  assignRole: (userId: number, roleId: number) =>
    apiService.post<ApiResponse<any>>(`/${userId}/roles`, { role_id: roleId }),
  removeRole: (userId: number, roleId: number) =>
    apiService.delete<ApiResponse<any>>(`/${userId}/roles/${roleId}`),
};
```

**File:** `src/modules/auth/api/auth.ts`

```typescript
import { ApiService } from "@/shared/lib/api-service";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ApiResponse,
} from "@/types/api";

const apiService = new ApiService("/auth");

export const authApi = {
  login: (credentials: LoginRequest) =>
    apiService.post<LoginResponse>("/login", credentials),
  register: (data: RegisterRequest) =>
    apiService.post<ApiResponse<any>>("/register", data),
  logout: () => apiService.post<ApiResponse<any>>("/logout"),
  verifyToken: () => apiService.get<ApiResponse<any>>("/verify-token"),
};
```

### React Query Hooks

**File:** `src/shared/hooks/useUserApi.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/modules/setting/user/api/user";
import type { User } from "@/types/user";

export function useUsers(params = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userApi.getAll(params),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<User>) => userApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
```

## Type System

### Centralized Type Definitions

All interfaces are organized in the `types/` folder:

**File:** `src/types/api.ts`

```typescript
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: any;
    token: string;
  };
}
```

**File:** `src/types/user.ts`

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  roles?: Role[];
}

export interface Role {
  id: number;
  name: string;
  description?: string;
}
```

## Best Practices

### 1. Separation of Concerns

- **Core**: ONLY pure generic utilities without business logic
- **Modules**: ALL feature-specific code (APIs, stores, components)
- **Types**: ALL interfaces centralized for easy maintenance
- **Shared**: Reusable UI components and hooks

### 2. No Barrel Exports

**Why?**

- Better tree-shaking and smaller bundle size
- Explicit dependencies (easier to track what's used where)
- Avoid circular dependencies
- Faster IDE intellisense and navigation

**How?**

- Import directly from source files
- Never create `index.ts` for re-exports
- Use full paths with `@/` alias

### 3. API Design Pattern

```
Generic Factory (core/api/crud.ts)
        ↓
Feature API (modules/{feature}/api/{feature}.ts)
        ↓
React Query Hook (shared/hooks/use{Feature}Api.ts)
        ↓
Component (modules/{feature}/components/{Feature}Form.tsx)
```

### 4. Type Safety

- Define all request/response interfaces in `types/`
- Use generic types for API methods: `ApiResponse<T>`, `PaginatedResponse<T>`
- Import types with `import type` for better tree-shaking

### 5. Authentication Flow

```
1. User submits login → authApi.login()
2. Backend validates → returns JWT token
3. Token stored in cookie (httpOnly)
4. useAuthStore updates user state
5. middleware.ts verifies token on protected routes
6. Frontend only checks UI state (NOT security)
```

**IMPORTANT**: JWT validation is ALWAYS done on backend. Frontend only handles UX (redirects, loading states).

## State Management

### Zustand for Auth

**File:** `src/modules/auth/store/auth.ts`

```typescript
import { create } from "zustand";
import type { AuthenticatedUser } from "@/types/user";

interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthenticatedUser | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
```

### React Query for Server State

**File:** `src/pages/_app.tsx`

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
```

**Why Simple Setup?**

- Admin dashboards need fresh data on each load
- No need for offline persistence
- Standard React Query is sufficient
- Avoid over-engineering

## Module Structure Guidelines

### Feature Module Organization

Each module is self-contained with domain-specific logic:

```
modules/{domain}/{feature}/
├── api/              # API service for this feature
│   └── {feature}.ts  # Extends createRestApiService with custom methods
├── components/       # Feature-specific React components
│   └── {Feature}Form.tsx
├── hooks/           # Feature-specific React Query hooks (optional)
│   └── use{Feature}s.ts
└── store/           # Feature-specific state (if needed)
    └── {feature}.ts
```

### Example Structure

```
modules/
├── auth/                    # Authentication domain
│   ├── api/auth.ts         # login, register, logout, verifyToken
│   ├── store/auth.ts       # useAuthStore (Zustand)
│   └── middleware/         # Token verification, route matching
│
└── setting/                # Settings domain
    ├── user/
    │   ├── api/user.ts     # userApi + assignRole, removeRole
    │   └── components/UserForm.tsx
    └── role/
        ├── api/role.ts     # roleApi + assignPermissions
        └── components/RoleForm.tsx
```

## Deleted/Removed Patterns

The following patterns were removed to improve simplicity:

### ❌ Removed: Barrel Exports

- All `index.ts` re-export files deleted
- Use direct imports instead

### ❌ Removed: Feature Code in Core

- `core/api/client.ts` - deleted (was barrel export)
- `core/api/auth.ts` - moved to `modules/auth/api/auth.ts`
- `core/api/user.ts` - moved to `modules/setting/user/api/user.ts`
- `core/api/role.ts` - moved to `modules/setting/role/api/role.ts`
- `core/auth/` folder - moved to `modules/auth/`

### ❌ Removed: Scattered Interfaces

- All interfaces moved to centralized `types/` folder
- No more inline interface definitions in API files

### ❌ Removed: React Query Persistence

- `@tanstack/react-query-persist-client` - removed
- `@tanstack/query-sync-storage-persister` - removed
- `PersistQueryClientProvider` - deleted
- Standard `QueryClientProvider` is sufficient

### ❌ Removed: Duplicate CSS

- `src/shared/styles/global.css` - merged into `globals.css`
- Single stylesheet approach

## Migration Guide

### From Old Architecture

```
OLD STRUCTURE                          NEW STRUCTURE
─────────────────────────────────────────────────────────────
src/components/common/              → src/shared/components/ui/
src/components/layouts/             → src/shared/components/layout/
src/components/forms/UserForm.tsx  → src/modules/setting/user/components/UserForm.tsx
src/core/auth/                      → src/modules/auth/
src/hooks/useApi.ts                 → src/shared/hooks/useCrudApi.ts
src/lib/api-client.ts               → src/shared/lib/http-client.ts
src/services/api.ts                 → DELETED (split to modules)
src/types/user.ts (inline)          → src/types/user.ts (centralized)
```

### Import Migration

```typescript
// ❌ OLD - Barrel Exports
import { apiClient } from "@/core/api";
import { UserForm } from "@/modules/setting/user";
import { DataTable } from "@/shared/components";

// ✅ NEW - Direct Imports
import { createRestApiService } from "@/core/api/crud";
import { UserForm } from "@/modules/setting/user/components/UserForm";
import { DataTable } from "@/shared/components/ui/DataTable";
```

### API Pattern Migration

```typescript
// ❌ OLD - API in core with business logic
// src/core/api/client.ts
export const userApi = {
  getAll: () => axios.get("/users"),
  assignRole: (userId, roleId) => axios.post(`/users/${userId}/roles`),
};

// ✅ NEW - Generic factory + feature-specific extensions
// src/core/api/crud.ts
export function createRestApiService<T>(endpoint: string) {
  return { getAll, getById, create, update, delete };
}

// src/modules/setting/user/api/user.ts
const baseApi = createRestApiService<User>("/users");
export const userApi = {
  ...baseApi,
  assignRole: (userId, roleId) => apiService.post(`/${userId}/roles`, { role_id: roleId }),
};
```

## Benefits of This Architecture

1. **Simplicity**: No barrel exports, direct imports only
2. **Clarity**: Clear separation - core is generic, modules are specific
3. **Maintainability**: Easy to find and modify code
4. **Type Safety**: Centralized types with strong TypeScript support
5. **Performance**: Better tree-shaking without barrel exports
6. **Scalability**: Add features without touching core
7. **Developer Experience**: Explicit dependencies, faster IDE

## Common Patterns

### Creating a New Feature

1. Create module structure:

   ```
   modules/{domain}/{feature}/
   ├── api/{feature}.ts
   ├── components/{Feature}Form.tsx
   └── hooks/use{Feature}Api.ts (optional)
   ```

2. Define types in `types/{feature}.ts`

3. Create API using `createRestApiService`:

   ```typescript
   import { createRestApiService } from "@/core/api/crud";
   const baseApi = createRestApiService<YourType>("/endpoint");
   export const yourApi = { ...baseApi, customMethod };
   ```

4. Create React Query hooks in `shared/hooks/`:
   ```typescript
   import { yourApi } from "@/modules/{domain}/{feature}/api/{feature}";
   export function useYourFeature() {
     return useQuery({ queryKey: ["feature"], queryFn: yourApi.getAll });
   }
   ```

### Adding Custom API Methods

```typescript
// Extend the base CRUD API with domain-specific methods
import { createRestApiService } from "@/core/api/crud";
import { ApiService } from "@/shared/lib/api-service";

const baseApi = createRestApiService<User>("/users");
const apiService = new ApiService("/users");

export const userApi = {
  ...baseApi, // getAll, getById, create, update, delete
  assignRole: (userId: number, roleId: number) =>
    apiService.post(`/${userId}/roles`, { role_id: roleId }),
  changePassword: (userId: number, password: string) =>
    apiService.put(`/${userId}/password`, { password }),
};
```

## Technology Stack

- **Next.js 16.0.8**: Pages Router with Turbopack
- **React 19**: Latest features
- **TypeScript 5.7**: Strict mode enabled
- **Mantine UI 8.3.10**: Component library with green theme (#40c057)
- **React Query 5.90.12**: Server state management (simplified setup)
- **Zustand 5.0.9**: Client state for auth only
- **Axios 1.13.2**: HTTP client with interceptors

## Key Decisions

### Why No Barrel Exports?

- **Better tree-shaking**: Bundler can eliminate unused code
- **Explicit dependencies**: Clear what each file imports
- **Faster IDE**: No need to resolve re-exports
- **Avoid circular deps**: Common issue with barrel exports

### Why Core = Generic Only?

- **Reusability**: Core utilities work for any domain
- **No coupling**: Core doesn't know about business logic
- **Easier testing**: Generic functions are simpler to test
- **Clear boundaries**: Prevents feature creep in core

### Why Centralized Types?

- **Single source of truth**: One place to update interfaces
- **Easy to find**: All types in `types/` folder
- **Better imports**: `import type` for tree-shaking
- **Consistency**: Same interface used everywhere

### Why Simplified React Query?

- **Admin dashboards need fresh data**: No offline persistence needed
- **Simpler debugging**: Standard setup is easier to understand
- **Better performance**: Less overhead without persistence layer
- **Standard practice**: Most admin apps don't need persistence
