# Hooks Refactoring Guide

## 📚 Overview

All CRUD hooks have been refactored to use the `createCrudHooks()` factory function from `@/shared/hooks/useCrudApi`. This eliminates boilerplate code and provides consistent patterns across all modules.

## 🎯 Benefits

- **Less Code**: ~100 lines per module reduced to ~20 lines
- **Consistency**: All modules use the same pattern
- **Type Safety**: Full TypeScript support
- **Easy Maintenance**: Update one place, affects all modules
- **Custom Extensions**: Easy to add module-specific hooks

## 📖 Usage

### Basic Usage

```typescript
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/modules/users/hooks/useUsers";

function UsersPage() {
  // List with pagination and search
  const { data, isLoading } = useUsers({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: "john",
  });

  // Create mutation
  const createMutation = useCreateUser();
  createMutation.mutate({ name: "John Doe", email: "john@example.com" });

  // Update mutation
  const updateMutation = useUpdateUser();
  updateMutation.mutate({
    id: "user-id",
    data: { name: "Jane Doe" },
  });

  // Delete mutation
  const deleteMutation = useDeleteUser();
  deleteMutation.mutate("user-id");
}
```

### Available Hooks for All Modules

Each module exports these standard hooks:

```typescript
// Queries
useXXXs(params?)      // List with pagination/filtering
useXXX(id)            // Get single item by ID

// Mutations
useCreateXXX()        // Create new item
useUpdateXXX()        // Update existing item
useDeleteXXX()        // Delete single item
useBulkDeleteXXXs()   // Delete multiple items
```

### Available Modules

- **Users**: `useUsers`, `useUser`, `useCreateUser`, etc.
- **Roles**: `useRoles`, `useRole`, `useCreateRole`, etc.
- **Parameters**: `useParameters`, `useParameter`, `useCreateParameter`, etc.
- **Categories**: `useCategories`, `useCategory`, `useCreateCategory`, etc.
- **Modules**: `useModules`, `useModule`, `useCreateModule`, etc.
- **Menus**: `useMenus`, `useMenu`, `useCreateMenu`, etc.

## 🔧 Custom Hooks

Each module can extend base hooks with custom functionality:

### Example: Parameters Module

```typescript
// src/modules/parameters/hooks/useParameters.ts
import { createCrudHooks } from "@/shared/hooks/useCrudApi";
import { parameterService } from "../services/parameter.service";

// Get base CRUD hooks
const baseCrudHooks = createCrudHooks("parameters", parameterService);

// Export standard hooks
export const useParameters = baseCrudHooks.useList;
export const useParameter = baseCrudHooks.useDetail;
export const useCreateParameter = baseCrudHooks.useCreate;
// ... etc

// Add custom hook
export function useParameterByCode(code: string) {
  return useQuery({
    queryKey: ["parameters", "code", code],
    queryFn: async () => {
      const response = await parameterService.getByCode(code);
      return response.data.data;
    },
    enabled: !!code,
  });
}

// Export combined hooks object
export const parameterHooks = {
  ...baseCrudHooks,
  useByCode: useParameterByCode,
};
```

### Example: Menus Module

```typescript
// src/modules/app-menus/hooks/useMenus.ts
const baseCrudHooks = createCrudHooks("menus", menuService);

// Standard exports
export const useMenus = baseCrudHooks.useList;
export const useMenu = baseCrudHooks.useDetail;
// ... etc

// Custom hooks
export function useMenuTree() {
  return useQuery({
    queryKey: ["menus", "tree"],
    queryFn: async () => {
      const response = await menuService.getTree();
      return response.data.data;
    },
  });
}

export function useReorderMenus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (items: { id: string; order: number }[]) =>
      menuService.reorder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      notifications.show({
        title: "Success",
        message: "Menu order updated successfully",
        color: "green",
      });
    },
  });
}

// Combined export
export const menuHooks = {
  ...baseCrudHooks,
  useTree: useMenuTree,
  useReorder: useReorderMenus,
};
```

## 🆕 Creating a New Module

### 1. Create Service (if not exists)

```typescript
// src/modules/products/services/product.service.ts
import { BaseRepository } from "@/core/api/base-repository";
import type { BaseQueryParams } from "@/core/types/query-params";

export interface Product {
  id: string;
  name: string;
  price: number;
  // ... other fields
}

export type ProductQueryParams = BaseQueryParams;

class ProductService extends BaseRepository<Product> {
  constructor() {
    super("products");
  }

  // Add custom methods if needed
  async getByCategory(categoryId: string) {
    return this.get<Product[]>(`/${this.resource}/category/${categoryId}`);
  }
}

export const productService = new ProductService();
```

### 2. Create Hooks

```typescript
// src/modules/products/hooks/useProducts.ts
import { createCrudHooks } from "@/shared/hooks/useCrudApi";
import { productService } from "../services/product.service";

// Create base hooks
const baseCrudHooks = createCrudHooks("products", productService);

// Export standard hooks
export const useProducts = baseCrudHooks.useList;
export const useProduct = baseCrudHooks.useDetail;
export const useCreateProduct = baseCrudHooks.useCreate;
export const useUpdateProduct = baseCrudHooks.useUpdate;
export const useDeleteProduct = baseCrudHooks.useDelete;
export const useBulkDeleteProducts = baseCrudHooks.useBulkDelete;

// Add custom hooks if needed
export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: async () => {
      const response = await productService.getByCategory(categoryId);
      return response.data.data;
    },
    enabled: !!categoryId,
  });
}

// Export combined object
export const productHooks = {
  ...baseCrudHooks,
  useByCategory: useProductsByCategory,
};
```

### 3. Use in Pages

```typescript
// src/pages/products/index.tsx
import {
  useProducts,
  useDeleteProduct,
} from "@/modules/products/hooks/useProducts";

export default function ProductsPage() {
  const { data, isLoading } = useProducts({ pageNumber: 1, pageSize: 10 });
  const deleteMutation = useDeleteProduct();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  // ... rest of component
}
```

## 🔑 Key Points

1. **Always use `createCrudHooks()`** for base CRUD operations
2. **Extend with custom hooks** for special functionality
3. **Export individual hooks** for backward compatibility
4. **Export combined object** for convenience
5. **Follow naming conventions**: `useXXXs` for list, `useXXX` for detail
6. **Use `BaseQueryParams`** for query parameters
7. **Add custom service methods** in service class when needed

## 📝 Migration from Old Pattern

### Before (Manual Hooks)

```typescript
// ❌ Old way - 100+ lines of repetitive code
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<User>) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notifications.show({
        title: "Success",
        message: "User created successfully",
        color: "green",
      });
    },
    // ... error handling
  });
}
// Repeat for update, delete, etc...
```

### After (Using Factory)

```typescript
// ✅ New way - One line!
const baseCrudHooks = createCrudHooks("users", userService);
export const useCreateUser = baseCrudHooks.useCreate;
```

## 🎉 Result

- **Before**: ~800 lines of repetitive mutation hooks across 6 modules
- **After**: ~120 lines total, all reusing the same factory function
- **Savings**: ~85% reduction in boilerplate code
- **Maintainability**: Changes to notification format, error handling, or query invalidation only need to be made in one place

## 📚 Additional Resources

- [useCrudApi.ts](../src/shared/hooks/useCrudApi.ts) - Factory function implementation
- [BaseRepository.ts](../src/core/api/base-repository.ts) - Base service class
- [queryKeys.ts](../src/shared/hooks/queryKeys.ts) - Query key management
- [Example: Users Module](../src/modules/users/hooks/useUsers.ts) - Full implementation example
- [Example: Menus Module](../src/modules/app-menus/hooks/useMenus.ts) - With custom hooks
