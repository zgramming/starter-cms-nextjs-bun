# 🚀 Starter CMS Next.js + Bun

Modern, production-ready admin dashboard starter template dengan **strict domain-driven architecture**. Built with Next.js 16, Mantine UI, dan best practices untuk REST API integration.

![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black)
![React](https://img.shields.io/badge/React-19-blue)
![Mantine](https://img.shields.io/badge/Mantine-8.3.10-339af0)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![React Query](https://img.shields.io/badge/React_Query-5.90-red)
![Bun](https://img.shields.io/badge/Bun-1.3-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## � Recent Updates (Dec 2024)

✨ **Major Architecture Improvements** - Project restructured following industry best practices:

- ✅ **Feature-based Modules** - `users/` and `roles/` extracted from nested `setting/`
- ✅ **Service Layer Pattern** - Business logic separated into testable service classes
- ✅ **Centralized Constants** - Type-safe `routes`, `permissions`, and `api-endpoints`
- ✅ **Enterprise-Ready** - Following patterns from Netflix, Uber, and Google

**Score: 9/10** ⭐ | **Status: Production Ready** | [See Implementation Summary](IMPLEMENTATION_SUMMARY.md)

## 🎯 Core Principles

1. **NO Barrel Exports** - Direct imports only untuk better tree-shaking
2. **Core = Generic Only** - Pure utilities tanpa business logic
3. **Modules = Feature-Specific** - Semua domain logic di modules
4. **Centralized Types** - Semua interfaces di `types/` folder
5. **Simplicity First** - Hindari over-engineering
6. **Service Layer** - Business logic in testable service classes ✨ NEW

## ✨ Features

### 🎨 UI/UX

- ✅ **Professional Design** - Green theme (#40c057) dengan Mantine UI components
- ✅ **Fully Responsive** - Mobile-first design
- ✅ **Reusable Components** - DataTable, TableToolbar, Forms, Modals
- ✅ **Consistent Styling** - Single globals.css file

### 🔐 Authentication & Security

- ✅ **JWT Authentication** - Cookie-based token storage (httpOnly)
- ✅ **Protected Routes** - Middleware-based route protection
- ✅ **Backend Validation** - JWT verification on server-side only
- ✅ **Zustand Auth Store** - Simple client state management

### 📊 Data Management

- ✅ **Generic CRUD Factory** - `createRestApiService<T>()` for rapid development
- ✅ **Feature-Specific APIs** - Extended APIs per domain
- ✅ **Search & Filter** - Real-time search dengan debouncing
- ✅ **Server Pagination** - Efficient data loading
- ✅ **React Query Integration** - Simplified caching (no persistence)

### ⚡ Performance

- ✅ **Turbopack** - Fast refresh development
- ✅ **Direct Imports** - Better tree-shaking
- ✅ **Type Safety** - Full TypeScript strict mode
- ✅ **Optimized Builds** - Production-ready output

### 🛠️ Developer Experience

- ✅ **Clear Architecture** - Domain-driven structure
- ✅ **Type-First** - Centralized type definitions
- ✅ **Explicit Dependencies** - No hidden imports
- ✅ **Fast Package Manager** - Bun for speed
- ✅ **Error Boundaries** - Comprehensive error handling

---

## 📁 Project Structure

```
starter-cms-nextjs-bun/
├── public/                     # Static assets
├── src/
│   ├── constants/              # ✨ Centralized constants
│   │   ├── routes.ts          # Type-safe route definitions
│   │   ├── permissions.ts     # Permission constants
│   │   └── api-endpoints.ts   # API endpoint builders
│   │
│   ├── core/                   # GENERIC utilities only
│   │   ├── api/
│   │   │   ├── crud.ts        # createRestApiService<T>() factory
│   │   │   └── EXTEND_PATTERN.ts
│   │   └── config/
│   │       └── env.ts         # Environment configuration
│   │
│   ├── modules/                # FEATURE-SPECIFIC code
│   │   ├── auth/              # Authentication module
│   │   │   ├── api/auth.ts    # authApi (login, register, logout, etc)
│   │   │   ├── store/auth.ts  # useAuthStore (Zustand)
│   │   │   └── middleware/    # Token verification, route matching
│   │   │
│   │   ├── users/             # ✨ User management (moved from setting/user)
│   │   │   ├── services/user.service.ts   # ✨ Service layer
│   │   │   ├── components/UserForm.tsx
│   │   │   └── hooks/useUsers.ts
│   │   │
│   │   ├── roles/             # ✨ Role management (moved from setting/role)
│   │   │   ├── services/role.service.ts   # ✨ Service layer
│   │   │   ├── components/RoleForm.tsx
│   │   │   └── hooks/useRoles.ts
│   │   │
│   │   └── setting/           # Other settings modules
│   │       ├── parameter/api/parameter.ts
│   │       ├── master-category/api/category.ts
│   │       ├── app-module/api/module.ts
│   │       └── app-menu/api/menu.ts
│   │
│   │       ├── parameter/api/parameter.ts
│   │       ├── master-category/api/category.ts
│   │       ├── app-module/api/module.ts
│   │       └── app-menu/api/menu.ts
│   │
│   ├── types/                  # ALL interfaces centralized
│   │   ├── api.ts             # ApiResponse, PaginatedResponse, LoginRequest
│   │   ├── user.ts            # User, Role, AuthenticatedUser
│   │   ├── settings.ts        # MasterData, MasterCategory, Parameter
│   │   ├── access-control.ts  # AccessCategory, AccessModule, AccessMenu
│   │   ├── app-structure.ts   # Category, Module, Menu, BreadcrumbItem
│   │   └── components.ts      # Column<T>, DataTableProps<T>
│   │
│   ├── shared/                 # Shared resources
│   │   ├── components/
│   │   │   ├── ui/            # DataTable, TableToolbar, Modals
│   │   │   └── layout/        # AdminLayout, MainSidebar, TopBar
│   │   ├── hooks/             # useCrudApi, useUserApi, useRoleApi
│   │   └── lib/               # http-client, api-service
│   │
│   ├── pages/                  # Next.js pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── dashboard.tsx
│   │   └── setting/           # Setting pages
│   │       ├── user/index.tsx
│   │       ├── role/index.tsx
│   │       ├── parameter/index.tsx
│   │       └── ...
│   │
│   └── styles/
│       └── globals.css        # Single global stylesheet
│
├── middleware.ts               # Next.js middleware for auth
├── .env.local.example
├── ARCHITECTURE.md             # Complete architecture guide
├── DOCUMENTATION.md            # Full documentation
└── README.md                   # This file
```

---

## 🚀 Quick Start

### 1. Prerequisites

- **Bun** >= 1.3 (atau Node.js >= 18)
- **Backend API** dengan REST endpoints
- **Git**

### 2. Installation

```bash
# Clone repository
git clone https://github.com/zgramming/starter-cms-nextjs-bun.git
cd starter-cms-nextjs-bun

# Install dependencies
bun install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local dengan URL backend Anda
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 3. Development

```bash
# Run development server
bun dev

# Open http://localhost:3000
```

### 4. Build

```bash
# Production build
bun run build

# Start production server
bun start
```

---

## 📚 Documentation

| File                                                   | Description                                   |
| ------------------------------------------------------ | --------------------------------------------- |
| [README.md](README.md)                                 | Project overview & quick start (this file)    |
| [ARCHITECTURE.md](ARCHITECTURE.md)                     | Complete architecture guide & design patterns |
| [DOCUMENTATION.md](DOCUMENTATION.md)                   | Full technical documentation & API reference  |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | ✨ Recent implementation summary & results    |
| [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)               | ✨ Step-by-step migration guide               |
| [BEST_PRACTICES.md](BEST_PRACTICES.md)                 | ✨ Best practices & industry comparison       |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md)               | ✨ Quick lookup guide                         |
| [STRUCTURE_OVERVIEW.md](STRUCTURE_OVERVIEW.md)         | ✨ Visual structure diagrams                  |

### Quick Links

- 🚀 **New to the project?** Start with [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- 📖 **Understanding architecture?** Read [STRUCTURE_OVERVIEW.md](STRUCTURE_OVERVIEW.md)
- 🔄 **Updating code?** Check [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- ⭐ **Learning best practices?** See [BEST_PRACTICES.md](BEST_PRACTICES.md)

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_API_TIMEOUT=30000
```

### Backend Requirements

Your backend should provide these REST endpoints:

```
Authentication:
POST   /api/auth/login          # Login with email & password
POST   /api/auth/register       # User registration
POST   /api/auth/logout         # Logout (clear cookie)
GET    /api/auth/verify-token   # Verify JWT token

Resources (CRUD pattern):
GET    /api/{resource}?page=1&pageSize=10&search=keyword
GET    /api/{resource}/{id}
POST   /api/{resource}
PUT    /api/{resource}/{id}
DELETE /api/{resource}/{id}
```

**Response Format:**

```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}

// For paginated data:
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

---

## 🎯 Usage Examples

### Import Pattern (Direct Imports - NO Barrel Exports)

```typescript
// ✅ CORRECT - Direct imports
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable } from "@/shared/components/ui/DataTable";
import { authApi } from "@/modules/auth/api/auth";
import { useAuthStore } from "@/modules/auth/store/auth";
import { userApi } from "@/modules/setting/user/api/user";
import type { User, Role } from "@/types/user";
import type { ApiResponse } from "@/types/api";

// ❌ WRONG - Barrel exports (NOT ALLOWED)
import { AdminLayout, DataTable } from "@/shared/components";
import { authApi } from "@/modules/auth";
```

### Protected Route with Middleware

```typescript
// middleware.ts handles auth automatically
// Just build your page component:

import { AdminLayout } from "@/shared/components/layout/AdminLayout";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      {/* Your content */}
    </AdminLayout>
  );
}
```

### Fetch Data with React Query

```typescript
import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/modules/setting/user/api/user";
import { DataTable } from "@/shared/components/ui/DataTable";
import type { User } from "@/types/user";

function UsersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: () => userApi.getAll({ page, pageSize: 10 }),
  });

  return (
    <DataTable
      data={data?.data || []}
      isLoading={isLoading}
      onPageChange={setPage}
    />
  );
}
```

### Create New Feature Module

```typescript
// 1. Define types in types/ folder
// types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
}

// 2. Create API in modules/
// modules/setting/product/api/product.ts
import { createRestApiService } from "@/core/api/crud";
import { ApiService } from "@/shared/lib/api-service";
import type { Product } from "@/types/product";

const baseApi = createRestApiService<Product>("/products");
const apiService = new ApiService("/products");

export const productApi = {
  ...baseApi, // getAll, getById, create, update, delete
  // Add custom methods if needed
  updateStock: (id: number, quantity: number) =>
    apiService.put(`/${id}/stock`, { quantity }),
};

// 3. Create React Query hook (optional)
// shared/hooks/useProductApi.ts
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/modules/setting/product/api/product";

export function useProducts(params = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productApi.getAll(params),
  });
}

// 4. Use in component
import { useProducts } from "@/shared/hooks/useProductApi";

function ProductsPage() {
  const { data } = useProducts();
  return <div>{/* render products */}</div>;
}
```

### Authentication Flow

```typescript
import { authApi } from "@/modules/auth/api/auth";
import { useAuthStore } from "@/modules/auth/store/auth";

function LoginPage() {
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });

      if (response.data.success) {
        setUser(response.data.data.user);
        // Token stored in httpOnly cookie by backend
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
```

---

## 🛠️ Tech Stack

### Core

- **[Next.js 16.0.8](https://nextjs.org)** - React framework with Pages Router & Turbopack
- **[React 19](https://react.dev)** - UI library
- **[TypeScript 5.7](https://www.typescriptlang.org)** - Type safety (strict mode)
- **[Bun 1.3](https://bun.sh)** - Fast package manager & runtime

### UI & Styling

- **[Mantine UI 8.3.10](https://mantine.dev)** - Component library
- **[@tabler/icons-react 3.29](https://tabler.io/icons)** - Icon library
- **[PostCSS](https://postcss.org)** - CSS processing

### State Management

- **[TanStack Query 5.90.12](https://tanstack.com/query)** - Server state (simplified, no persistence)
- **[Zustand 5.0.9](https://github.com/pmndrs/zustand)** - Client state (auth only)

### API & HTTP

- **[Axios 1.13.2](https://axios-http.com)** - HTTP client
- Custom interceptors untuk token management & error handling
- Cookie-based authentication (httpOnly)

---

## 📦 Available Scripts

```bash
# Development
bun dev              # Start dev server with Turbopack (fast!)
bun run build        # Build for production
bun start            # Start production server

# Code Quality
bun run lint         # Run ESLint
bun run type-check   # TypeScript type checking

# Utilities
bun install          # Install dependencies (fast with Bun!)
```

---

## 🏗️ Architecture Highlights

### 1. No Barrel Exports

**Why?** Better tree-shaking, explicit dependencies, faster IDE.

```typescript
// ❌ Bad (barrel export)
import { userApi } from "@/modules/setting/user";

// ✅ Good (direct import)
import { userApi } from "@/modules/setting/user/api/user";
```

### 2. Core = Generic Only

**Core** hanya berisi utilities murni tanpa business logic:

- `createRestApiService<T>()` - Generic CRUD factory
- `env.ts` - Environment config

### 3. Modules = Feature-Specific

**Modules** berisi semua domain logic:

- `modules/auth/` - Authentication (api, store, middleware)
- `modules/setting/user/` - User management (api, components, hooks)
- `modules/setting/role/` - Role management

### 4. Centralized Types

Semua interfaces di `types/` folder untuk single source of truth:

- `types/api.ts` - API responses
- `types/user.ts` - User & Role
- `types/settings.ts` - Settings entities

### 5. Simplified React Query

Tidak menggunakan persistence layer karena:

- Admin dashboard butuh fresh data
- Menghindari over-engineering
- Standard setup lebih mudah di-maintain

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Environment Variables di Vercel:**

- `NEXT_PUBLIC_API_BASE_URL` - Your backend API URL

### Docker

```dockerfile
FROM oven/bun:1 as builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb ./
RUN bun install --production
EXPOSE 3000
CMD ["bun", "start"]
```

### Build & Deploy

```bash
# Build Docker image
docker build -t cms-admin .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com \
  cms-admin
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the architecture principles (no barrel exports, core = generic)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

**Architecture Guidelines:**

- ✅ Direct imports only (no barrel exports)
- ✅ Core must be generic (no business logic)
- ✅ Feature code goes to modules
- ✅ Types must be centralized
- ✅ Follow existing patterns

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework for Production
- [Mantine](https://mantine.dev) - React Components Library
- [TanStack Query](https://tanstack.com/query) - Powerful asynchronous state management
- [Zustand](https://github.com/pmndrs/zustand) - Simple state management
- [Tabler Icons](https://tabler.io/icons) - Beautiful open source icons
- [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime

---

## 📞 Support & Resources

### Documentation

- 📖 **[ARCHITECTURE.md](ARCHITECTURE.md)** - Complete architecture guide
- 📖 **[DOCUMENTATION.md](DOCUMENTATION.md)** - Full technical documentation

### Need Help?

1. Check the [ARCHITECTURE.md](ARCHITECTURE.md) for design patterns
2. Read [DOCUMENTATION.md](DOCUMENTATION.md) for API reference
3. Open an issue on [GitHub](https://github.com/zgramming/starter-cms-nextjs-bun/issues)

### Key Concepts

- **No Barrel Exports** - Always use direct imports
- **Core vs Modules** - Core = generic, Modules = feature-specific
- **Type Safety** - All types in `types/` folder
- **JWT Auth** - Backend validation only (frontend is UX only)
- **React Query** - Simplified setup without persistence

---

## 🎯 Project Goals

This starter template is designed to be:

1. **Simple & Clear** - No over-engineering, straightforward architecture
2. **Type-Safe** - Full TypeScript with strict mode
3. **Performant** - Direct imports for better tree-shaking
4. **Maintainable** - Clear separation of concerns
5. **Production-Ready** - Battle-tested patterns

---

**Built with ❤️ by [zgramming](https://github.com/zgramming)**

**Star ⭐ this repo if you find it helpful!**
