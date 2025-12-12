# 🚀 Developer Onboarding Guide

Welcome! This guide will help you understand and start contributing to this project quickly.

## 📋 Table of Contents

1. [Quick Overview](#quick-overview)
2. [Setup Development Environment](#setup-development-environment)
3. [Understanding the Architecture](#understanding-the-architecture)
4. [Project Structure Walkthrough](#project-structure-walkthrough)
5. [Common Workflows](#common-workflows)
6. [Best Practices & Rules](#best-practices--rules)
7. [Troubleshooting](#troubleshooting)
8. [FAQs](#faqs)

---

## Quick Overview

### What is this project?

Production-ready **admin dashboard starter** untuk REST API integration dengan fokus pada:

- ✅ **Simplicity** - No over-engineering
- ✅ **Type Safety** - Full TypeScript strict mode
- ✅ **Clear Architecture** - Domain-driven dengan separation of concerns
- ✅ **Performance** - Direct imports, better tree-shaking

### Tech Stack (5 menit baca)

```
Frontend Framework:  Next.js 16 (Pages Router + Turbopack)
UI Library:          Mantine UI 8.3
Language:            TypeScript 5.7 (strict mode)
State Management:
  - Server State:    React Query 5.90 (tanpa persistence)
  - Client State:    Zustand 5.0 (auth only)
HTTP Client:         Axios 1.13
Package Manager:     Bun 1.3 (fast!)
```

### Key Architecture Principles (WAJIB PAHAMI!)

1. **NO Barrel Exports** ❌ `index.ts` re-exports

   - Import langsung dari file source
   - Better tree-shaking & bundle size
   - Explicit dependencies

2. **Core = Generic ONLY** 🔧

   - Pure utilities tanpa business logic
   - `createRestApiService<T>()` - factory function
   - Environment config

3. **Modules = Feature-Specific** 📦

   - Semua domain logic di sini
   - Auth, User, Role, Settings, dll
   - Self-contained per feature

4. **Centralized Types** 📝

   - Semua interfaces di `types/` folder
   - Single source of truth
   - Easy maintenance

5. **Simplicity First** 🎯
   - Avoid complexity
   - Standard React Query (no persistence)
   - Single CSS file

---

## Setup Development Environment

### Step 1: Prerequisites

Install these tools:

```bash
# 1. Bun (recommended) - Fast package manager
curl -fsSL https://bun.sh/install | bash

# OR Node.js >= 18 (alternative)
# Download from: https://nodejs.org

# 2. Git
# Windows: https://git-scm.com/download/win
# Mac: brew install git
# Linux: sudo apt install git

# 3. VS Code (recommended)
# Download from: https://code.visualstudio.com
```

### Step 2: Clone & Install

```bash
# Clone repository
git clone https://github.com/zgramming/starter-cms-nextjs-bun.git
cd starter-cms-nextjs-bun

# Install dependencies (FAST with Bun!)
bun install

# Copy environment file
cp .env.local.example .env.local
```

### Step 3: Configure Environment

Edit `.env.local`:

```env
# Your backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# API timeout (optional)
NEXT_PUBLIC_API_TIMEOUT=30000
```

### Step 4: Run Development Server

```bash
# Start dev server
bun dev

# Open browser: http://localhost:3000
```

### Step 5: Install VS Code Extensions (Recommended)

Install these extensions untuk better DX:

1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **TypeScript Vue Plugin (Volar)** - Better TypeScript support
4. **Tailwind CSS IntelliSense** - CSS autocomplete
5. **GitLens** - Git supercharged

---

## Understanding the Architecture

### The Big Picture

```
┌─────────────────────────────────────────────────────────┐
│                     Application                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────┐  ┌──────────┐  ┌────────┐  ┌──────────┐ │
│  │  Pages  │→ │ Modules  │→ │  Core  │→ │ Backend  │ │
│  │ (View)  │  │(Business)│  │(Utils) │  │   API    │ │
│  └─────────┘  └──────────┘  └────────┘  └──────────┘ │
│       ↓             ↓            ↓                     │
│  ┌─────────────────────────────────────────┐          │
│  │         Shared Components & Hooks       │          │
│  └─────────────────────────────────────────┘          │
│       ↓                                                │
│  ┌─────────────────────────────────────────┐          │
│  │         Centralized Types (types/)      │          │
│  └─────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

### Folder Structure Explained

```
src/
├── core/                    # 🔧 GENERIC utilities (NO business logic)
│   ├── api/
│   │   ├── crud.ts         # Factory: createRestApiService<T>()
│   │   └── EXTEND_PATTERN.ts # Documentation
│   └── config/
│       └── env.ts          # Environment variables
│
├── modules/                # 📦 FEATURE-SPECIFIC code
│   ├── auth/              # Authentication domain
│   │   ├── api/auth.ts    # authApi (login, logout, etc)
│   │   ├── store/auth.ts  # useAuthStore (Zustand)
│   │   └── middleware/    # Token verification
│   │
│   └── setting/           # Settings domain
│       ├── user/          # User management
│       │   ├── api/user.ts        # userApi + custom methods
│       │   ├── components/        # UserForm, etc
│       │   └── hooks/            # React Query hooks
│       └── role/          # Role management
│           └── ...
│
├── types/                  # 📝 ALL interfaces (centralized)
│   ├── api.ts             # ApiResponse, PaginatedResponse
│   ├── user.ts            # User, Role, AuthenticatedUser
│   ├── settings.ts        # MasterData, Parameter, etc
│   └── ...
│
├── shared/                 # 🔄 Shared resources
│   ├── components/
│   │   ├── ui/            # DataTable, Modal, etc
│   │   └── layout/        # AdminLayout, Sidebar, TopBar
│   ├── hooks/             # useCrudApi, useUserApi, etc
│   └── lib/               # http-client, api-service
│
├── pages/                  # 🌐 Next.js pages
│   ├── _app.tsx           # App wrapper (React Query setup)
│   ├── login.tsx          # Login page
│   ├── dashboard.tsx      # Dashboard
│   └── setting/           # Settings pages
│
└── styles/
    └── globals.css        # Single stylesheet
```

### Import Rules (IMPORTANT!)

```typescript
// ✅ CORRECT - Direct imports
import { userApi } from "@/modules/setting/user/api/user";
import { useAuthStore } from "@/modules/auth/store/auth";
import { DataTable } from "@/shared/components/ui/DataTable";
import type { User } from "@/types/user";

// ❌ WRONG - Barrel exports (FORBIDDEN!)
import { userApi } from "@/modules/setting/user";
import { useAuthStore } from "@/modules/auth";
import { DataTable } from "@/shared/components";
```

**Why?**

- Better tree-shaking (smaller bundle)
- Explicit dependencies
- Faster IDE autocomplete
- Avoid circular dependencies

---

## Project Structure Walkthrough

### 1. Core Layer (`src/core/`)

**Purpose:** Pure generic utilities WITHOUT business logic

#### `core/api/crud.ts` - Generic CRUD Factory

```typescript
// Factory function untuk generate standard CRUD methods
export function createRestApiService<T>(endpoint: string) {
  return {
    getAll: (params?) => GET /endpoint
    getById: (id) => GET /endpoint/:id
    create: (data) => POST /endpoint
    update: (id, data) => PUT /endpoint/:id
    delete: (id) => DELETE /endpoint/:id
  };
}
```

**Kapan pakai:**

- Ketika create new feature yang butuh standard CRUD
- Extend dengan custom methods di module

#### `core/config/env.ts` - Environment Config

```typescript
export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
  apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000"),
};
```

### 2. Modules Layer (`src/modules/`)

**Purpose:** Feature-specific business logic

#### Structure Pattern

```
modules/{domain}/{feature}/
├── api/{feature}.ts       # API service
├── components/            # Feature components
├── hooks/                 # React Query hooks (optional)
└── store/                 # State management (optional)
```

#### Example: `modules/auth/`

```typescript
// modules/auth/api/auth.ts
import { ApiService } from "@/shared/lib/api-service";
import type { LoginRequest, LoginResponse } from "@/types/api";

const apiService = new ApiService("/auth");

export const authApi = {
  login: (credentials: LoginRequest) =>
    apiService.post<LoginResponse>("/login", credentials),
  logout: () => apiService.post("/logout"),
  verifyToken: () => apiService.get("/verify-token"),
};
```

```typescript
// modules/auth/store/auth.ts
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
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));
```

### 3. Types Layer (`src/types/`)

**Purpose:** Centralized type definitions (single source of truth)

```typescript
// types/api.ts - Generic API types
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

// types/user.ts - Domain types
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

### 4. Shared Layer (`src/shared/`)

**Purpose:** Reusable components, hooks, utilities

```typescript
// shared/lib/http-client.ts - Axios instance
import axios from "axios";
import { env } from "@/core/config/env";

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  withCredentials: true, // Important for cookies!
});

// Interceptors for error handling
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);
```

### 5. Pages Layer (`src/pages/`)

**Purpose:** Next.js pages (routes)

```typescript
// pages/setting/user/index.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable } from "@/shared/components/ui/DataTable";
import { userApi } from "@/modules/setting/user/api/user";

export default function UsersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: () => userApi.getAll({ page, pageSize: 10 }),
  });

  return (
    <AdminLayout title="User Management">
      <DataTable
        data={data?.data || []}
        isLoading={isLoading}
        onPageChange={setPage}
      />
    </AdminLayout>
  );
}
```

---

## Common Workflows

### Workflow 1: Menambah Feature Baru

**Scenario:** Ingin menambah "Product Management"

#### Step 1: Define Types

```typescript
// types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category_id: number;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  stock: number;
  category_id: number;
}
```

#### Step 2: Create API Service

```typescript
// modules/setting/product/api/product.ts
import { createRestApiService } from "@/core/api/crud";
import { ApiService } from "@/shared/lib/api-service";
import type { Product } from "@/types/product";
import type { ApiResponse } from "@/types/api";

// Base CRUD methods
const baseApi = createRestApiService<Product>("/products");
const apiService = new ApiService("/products");

// Extend with custom methods
export const productApi = {
  ...baseApi, // getAll, getById, create, update, delete

  // Custom method: Update stock
  updateStock: (id: number, quantity: number) =>
    apiService.put<ApiResponse<Product>>(`/${id}/stock`, { quantity }),

  // Custom method: Get by category
  getByCategory: (categoryId: number) =>
    apiService.get<ApiResponse<Product[]>>(`/category/${categoryId}`),
};
```

#### Step 3: Create React Query Hook (Optional)

```typescript
// shared/hooks/useProductApi.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/modules/setting/product/api/product";
import type { Product, CreateProductRequest } from "@/types/product";

export function useProducts(params = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productApi.getAll(params),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => productApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      productApi.updateStock(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
```

#### Step 4: Create Component (Optional)

```typescript
// modules/setting/product/components/ProductForm.tsx
import { useForm } from "@mantine/form";
import { TextInput, NumberInput, Button } from "@mantine/core";
import type { CreateProductRequest } from "@/types/product";

interface ProductFormProps {
  onSubmit: (values: CreateProductRequest) => void;
  isLoading?: boolean;
}

export function ProductForm({ onSubmit, isLoading }: ProductFormProps) {
  const form = useForm<CreateProductRequest>({
    initialValues: {
      name: "",
      price: 0,
      stock: 0,
      category_id: 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput label="Product Name" {...form.getInputProps("name")} />
      <NumberInput label="Price" {...form.getInputProps("price")} />
      <NumberInput label="Stock" {...form.getInputProps("stock")} />
      <Button type="submit" loading={isLoading}>
        Save
      </Button>
    </form>
  );
}
```

#### Step 5: Create Page

```typescript
// pages/setting/product/index.tsx
import { useState } from "react";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable } from "@/shared/components/ui/DataTable";
import { ProductForm } from "@/modules/setting/product/components/ProductForm";
import { useProducts, useCreateProduct } from "@/shared/hooks/useProductApi";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useProducts({ page, pageSize: 10 });
  const createProduct = useCreateProduct();

  const handleCreate = async (values) => {
    await createProduct.mutateAsync(values);
  };

  return (
    <AdminLayout title="Product Management">
      <ProductForm
        onSubmit={handleCreate}
        isLoading={createProduct.isPending}
      />
      <DataTable data={data?.data || []} isLoading={isLoading} />
    </AdminLayout>
  );
}
```

### Workflow 2: Debugging API Issues

#### Check 1: Verify Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api  # Pastikan benar!
```

#### Check 2: Inspect Network Tab

```
1. Open DevTools (F12)
2. Go to Network tab
3. Filter: Fetch/XHR
4. Look for failed requests
5. Check request headers, payload, response
```

#### Check 3: Check Backend Response Format

Backend HARUS return format ini:

```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}

// Untuk pagination:
{
  "success": true,
  "data": [...],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 100,
    "last_page": 10
  }
}
```

#### Check 4: Check Error Interceptor

```typescript
// shared/lib/http-client.ts
httpClient.interceptors.response.use(
  (response) => {
    console.log("✅ Success:", response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ Error:", error.response?.data);
    return Promise.reject(error);
  }
);
```

### Workflow 3: Adding Authentication to New Page

Authentication sudah otomatis handle via `middleware.ts`. Tidak perlu manual protect routes!

```typescript
// middleware.ts (already configured)
export function middleware(request: NextRequest) {
  // Automatically checks token for protected routes
  // Redirects to /login if unauthorized
}

export const config = {
  matcher: ["/dashboard/:path*", "/setting/:path*"],
};
```

Just create your page normally:

```typescript
// pages/setting/new-feature/index.tsx
export default function NewFeaturePage() {
  // Already protected! No wrapper needed
  return <AdminLayout>Your content</AdminLayout>;
}
```

---

## Best Practices & Rules

### ✅ DO's

1. **Use Direct Imports**

   ```typescript
   // ✅ Good
   import { userApi } from "@/modules/setting/user/api/user";
   ```

2. **Define Types in `types/` Folder**

   ```typescript
   // ✅ Good - types/product.ts
   export interface Product {
     id: number;
     name: string;
   }
   ```

3. **Use Generic Factory for CRUD**

   ```typescript
   // ✅ Good
   const baseApi = createRestApiService<Product>("/products");
   export const productApi = { ...baseApi, customMethod };
   ```

4. **Centralize Error Handling**

   ```typescript
   // ✅ Good - in http-client interceptor
   httpClient.interceptors.response.use(null, (error) => {
     // Handle globally
   });
   ```

5. **Use React Query for Server State**
   ```typescript
   // ✅ Good
   const { data } = useQuery({
     queryKey: ["products"],
     queryFn: productApi.getAll,
   });
   ```

### ❌ DON'Ts

1. **NO Barrel Exports**

   ```typescript
   // ❌ Bad - index.ts
   export * from "./user";
   export * from "./role";
   ```

2. **NO Business Logic in Core**

   ```typescript
   // ❌ Bad - core/api/user.ts
   export const userApi = { ... } // This is feature-specific!
   ```

3. **NO Inline Type Definitions**

   ```typescript
   // ❌ Bad
   const user: { id: number; name: string } = { ... };

   // ✅ Good
   import type { User } from "@/types/user";
   const user: User = { ... };
   ```

4. **NO React Query Persistence** (Over-engineering!)

   ```typescript
   // ❌ Bad
   import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

   // ✅ Good - Simple setup
   <QueryClientProvider client={queryClient}>
   ```

5. **NO Mixed Responsibilities**
   ```typescript
   // ❌ Bad - Mixing UI and API in one file
   export const UserPage = () => { ... }
   export const userApi = { ... }
   ```

### 📏 Code Style

```typescript
// Use explicit types
function getUser(id: number): Promise<User> {
  // ...
}

// Use async/await
async function handleLogin(credentials: LoginRequest) {
  try {
    const response = await authApi.login(credentials);
    // handle success
  } catch (error) {
    // handle error
  }
}

// Use optional chaining
const userName = user?.profile?.name ?? "Guest";

// Use template literals
const message = `Welcome, ${user.name}!`;
```

---

## Troubleshooting

### Problem: "Module not found"

```
Error: Module not found: Can't resolve '@/modules/auth'
```

**Solution:** Use direct import!

```typescript
// ❌ Wrong
import { authApi } from "@/modules/auth";

// ✅ Correct
import { authApi } from "@/modules/auth/api/auth";
```

### Problem: "401 Unauthorized"

**Checklist:**

1. ✅ Pastikan backend running
2. ✅ Check `NEXT_PUBLIC_API_BASE_URL` di `.env.local`
3. ✅ Verify cookies enabled (`withCredentials: true`)
4. ✅ Check token masih valid (cek Network tab)

### Problem: "CORS Error"

```
Access to fetch at 'http://localhost:5000/api/users' has been blocked by CORS policy
```

**Solution:** Backend harus allow CORS

```csharp
// .NET example
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowCredentials()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowFrontend");
```

### Problem: Build Error "Type Error"

```
Type 'string | undefined' is not assignable to type 'string'
```

**Solution:** Handle undefined properly

```typescript
// ❌ Bad
const url: string = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ Good
const url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// ✅ Better
const url = process.env.NEXT_PUBLIC_API_BASE_URL!; // Non-null assertion
```

### Problem: React Query Not Refetching

```typescript
// Make sure to invalidate queries after mutation
const createUser = useMutation({
  mutationFn: userApi.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] }); // This!
  },
});
```

---

## FAQs

### Q: Kenapa tidak pakai barrel exports?

**A:** Barrel exports (`index.ts`) causes:

- ❌ Worse tree-shaking (larger bundle)
- ❌ Circular dependency issues
- ❌ Slower IDE autocomplete
- ❌ Hidden dependencies

Direct imports = Better performance!

### Q: Kenapa Core harus generic only?

**A:** Separation of concerns:

- **Core** = Pure utilities (reusable everywhere)
- **Modules** = Business logic (feature-specific)

Ini bikin code lebih maintainable & testable.

### Q: Kenapa tidak pakai React Query persistence?

**A:** Admin dashboard butuh fresh data setiap load. Persistence layer:

- ❌ Over-engineering
- ❌ Data bisa stale
- ❌ More complex debugging

Simple setup = Easier maintenance!

### Q: Di mana simpan custom API methods?

**A:** Di module API file:

```typescript
// modules/setting/user/api/user.ts
const baseApi = createRestApiService<User>("/users");

export const userApi = {
  ...baseApi, // Standard CRUD
  assignRole: (userId, roleId) => {}, // Custom method
};
```

### Q: Kapan pakai Zustand vs React Query?

**A:**

- **Zustand** = Client state (auth, UI state, preferences)
- **React Query** = Server state (API data, caching)

Example: Auth user info → Zustand, Users list → React Query

### Q: Bagaimana handle environment variables?

**A:**

```typescript
// core/config/env.ts
export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
};

// Usage
import { env } from "@/core/config/env";
console.log(env.apiBaseUrl);
```

MUST start with `NEXT_PUBLIC_` untuk client-side access!

---

## Next Steps

### After Reading This Guide

1. ✅ **Explore the Code**

   - Read `ARCHITECTURE.md` for deep dive
   - Browse `src/modules/auth/` sebagai reference
   - Check `src/shared/components/` untuk reusable components

2. ✅ **Try Making Changes**

   - Add a new API endpoint
   - Create a new page
   - Customize a component

3. ✅ **Read Full Documentation**

   - `README.md` - Quick overview
   - `ARCHITECTURE.md` - Deep architecture guide
   - `DOCUMENTATION.md` - Complete API reference

4. ✅ **Ask Questions**
   - Open GitHub issues
   - Join team chat
   - Reach out to maintainers

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  QUICK REFERENCE - Keep This Handy!                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Commands:                                                  │
│    bun dev          → Start development                     │
│    bun run build    → Production build                      │
│    bun start        → Start production server               │
│                                                             │
│  Import Pattern:                                            │
│    ✅ import { X } from "@/modules/auth/api/auth"          │
│    ❌ import { X } from "@/modules/auth"                   │
│                                                             │
│  Folder Mapping:                                            │
│    Generic utilities  → core/                               │
│    Business logic     → modules/                            │
│    Type definitions   → types/                              │
│    Reusable UI        → shared/                             │
│    Routes/Pages       → pages/                              │
│                                                             │
│  Key Files:                                                 │
│    core/api/crud.ts              → CRUD factory             │
│    shared/lib/http-client.ts     → Axios instance           │
│    modules/auth/store/auth.ts    → Auth state               │
│    middleware.ts                 → Route protection         │
│                                                             │
│  Add New Feature:                                           │
│    1. Define types in types/{feature}.ts                    │
│    2. Create API in modules/{domain}/{feature}/api/         │
│    3. Create component (optional)                           │
│    4. Create page in pages/                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

**Welcome to the team! Happy coding! 🚀**

For questions, check `ARCHITECTURE.md` or `DOCUMENTATION.md`, or open an issue on GitHub.
