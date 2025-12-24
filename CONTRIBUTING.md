# Contributing Guide

## 📁 Project Structure

```
src/
├── core/                    # Infrastructure layer
│   ├── api/                 # BaseRepository
│   ├── config/              # Environment config
│   └── types/               # Core types (BaseQueryParams)
├── modules/                 # Feature modules (domain logic)
│   ├── users/
│   │   ├── services/        # UserService (business logic)
│   │   └── hooks/           # useUsers, useUserMutations
│   ├── roles/
│   ├── parameters/
│   ├── app-menus/
│   └── app-modules/
├── shared/                  # Reusable utilities
│   ├── components/          # UI components
│   ├── hooks/               # Generic hooks (useCrudApi)
│   └── lib/                 # http-client
├── constants/               # App constants (routes)
├── types/                   # Type definitions
└── pages/                   # Next.js pages
```

## 🚀 Adding a New Feature Module

Follow this standard pattern for consistency:

### Step 1: Define Types

Create types in `src/types/[module].ts`:

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}
```

### Step 2: Create Service Layer

Create `src/modules/[module]/services/[module].service.ts`:

```typescript
import { BaseRepository } from "@/core/api/base-repository";
import type { BaseQueryParams } from "@/core/types/query-params";
import type { Product } from "@/types/product";

export interface ProductQueryParams extends BaseQueryParams {
  category?: string;
  min_price?: number;
}

class ProductService extends BaseRepository<Product> {
  constructor() {
    super("products");
  }

  // Add custom business logic methods here
  async toggleActive(id: string) {
    return this.patch(`/${this.resource}/${id}/toggle`);
  }
}

export const productService = new ProductService();
```

### Step 3: Create Query Hooks

Create `src/modules/[module]/hooks/use[Module]s.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";
import {
  productService,
  type ProductQueryParams,
} from "../services/product.service";
import type { PaginatedResponse, ApiError } from "@/types/api";

export function useProducts(params?: ProductQueryParams) {
  return useQuery<PaginatedResponse<Product>, ApiError>({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await productService.getAll(params);
      return response.data.data;
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await productService.getById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
}

export * from "./useProductMutations";
```

### Step 4: Create Mutation Hooks

Create `src/modules/[module]/hooks/use[Module]Mutations.ts`:

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/product.service";
import { notifications } from "@mantine/notifications";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Product>) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifications.show({
        title: "Success",
        message: "Product created successfully",
        color: "green",
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      productService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifications.show({
        title: "Success",
        message: "Product updated successfully",
        color: "green",
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifications.show({
        title: "Success",
        message: "Product deleted successfully",
        color: "green",
      });
    },
  });
}
```

### Step 5: Add Routes

Update `src/constants/routes.ts`:

```typescript
export const ROUTES = {
  // ...existing routes
  PRODUCTS: {
    LIST: "/products",
    CREATE: "/products/create",
    EDIT: (id: string) => `/products/${id}/edit`,
    DETAIL: (id: string) => `/products/${id}`,
  },
} as const;
```

### Step 6: Create Pages

Create pages in `src/pages/products/`:

- `index.tsx` - List page
- `create.tsx` - Create page
- `[id]/edit.tsx` - Edit page

Example list page:

```typescript
import { useRouter } from "next/router";
import {
  useProducts,
  useDeleteProduct,
} from "@/modules/products/hooks/useProducts";
import { ROUTES } from "@/constants";

export default function ProductsPage() {
  const router = useRouter();
  const { data, isLoading } = useProducts({ pageNumber: 1, pageSize: 10 });
  const deleteProduct = useDeleteProduct();

  return (
    <div>
      <h1>Products</h1>
      <button onClick={() => router.push(ROUTES.PRODUCTS.CREATE)}>
        Create Product
      </button>
      {/* Render table/grid here */}
    </div>
  );
}
```

## 📝 Code Standards

### TypeScript

- Always use explicit types, avoid `any`
- Use interfaces for object shapes
- Export types from service files

### Naming Conventions

- Services: `[Module]Service` (PascalCase)
- Hooks: `use[Action][Module]` (camelCase)
- Types: `[Module]` or `[Module]QueryParams` (PascalCase)
- Files: kebab-case

### Import Order

```typescript
// 1. External dependencies
import { useQuery } from "@tanstack/react-query";

// 2. Internal core
import { BaseRepository } from "@/core/api/base-repository";

// 3. Shared utilities
import { api } from "@/shared/lib/http-client";

// 4. Module-specific
import { userService } from "../services/user.service";

// 5. Types
import type { User } from "@/types/user";
```

### Query Keys

Use consistent query keys:

```typescript
["users"][("users", params)][("users", id)]; // All users lists // Filtered list // Single user
```

## ⚠️ Common Pitfalls

### ❌ Don't: Direct BaseRepository export

```typescript
export const productApi = new BaseRepository("products");
```

### ✅ Do: Service class with business logic

```typescript
class ProductService extends BaseRepository<Product> {
  constructor() {
    super("products");
  }
}
export const productService = new ProductService();
```

### ❌ Don't: Hooks in shared folder for module-specific logic

```typescript
// src/shared/hooks/useProductApi.ts ❌
```

### ✅ Do: Hooks in module folder

```typescript
// src/modules/products/hooks/useProducts.ts ✅
```

### ❌ Don't: Mix query and mutation in one file

```typescript
// Large file with both queries and mutations ❌
```

### ✅ Do: Separate concerns

```typescript
// useProducts.ts - Query hooks
// useProductMutations.ts - Mutation hooks
// Re-export from useProducts.ts
```

## 🧪 Testing (Future)

When adding tests:

- Service tests: `[module].service.test.ts`
- Hook tests: `use[Module].test.ts`
- Use MSW for API mocking

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Mantine UI Documentation](https://mantine.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
