# Query Parameters - Best Practices

## 📋 Overview

Semua query parameters untuk API requests sekarang menggunakan **base interface** yang konsisten dengan backend API specification.

## 🎯 Base Interface

### BaseQueryParams

```typescript
import { BaseQueryParams } from "@/core/types/query-params";

interface BaseQueryParams {
  pageNumber?: number; // Backend: PageNumber (1-based)
  pageSize?: number; // Backend: PageSize
  searchTerm?: string; // Backend: SearchTerm
  sortBy?: string; // Backend: SortBy
  sortDescending?: boolean; // Backend: SortDescending
}
```

### Mapping ke Backend

Field names di frontend **otomatis di-convert** ke format backend:

| Frontend (old) | Frontend (new)   | Backend API      |
| -------------- | ---------------- | ---------------- |
| `page`         | `pageNumber`     | `PageNumber`     |
| `pageSize`     | `pageSize`       | `PageSize`       |
| `search`       | `searchTerm`     | `SearchTerm`     |
| -              | `sortBy`         | `SortBy`         |
| -              | `sortDescending` | `SortDescending` |

## 📚 Usage Examples

### 1. Basic Usage (Recommended)

```typescript
import { userService } from "@/modules/users/services/user.service";

// Using new format
const users = await userService.getAll({
  pageNumber: 1,
  pageSize: 10,
  searchTerm: "john",
  sortBy: "name",
  sortDescending: false,
});
```

### 2. Legacy Format (Still Works)

```typescript
// Using old format - automatically converted
const users = await userService.getAll({
  page: 1,
  pageSize: 10,
  search: "john",
});
```

### 3. Extended Params

```typescript
import { UserQueryParams } from "@/modules/users/services/user.service";

// Extend base params with feature-specific filters
const params: UserQueryParams = {
  pageNumber: 1,
  pageSize: 20,
  searchTerm: "admin",
  status: "active", // User-specific
  role: "admin", // User-specific
};

const users = await userService.getAll(params);
```

### 4. In React Hooks

```typescript
import { useUsers } from "@/shared/hooks/useUserApi";

function UserList() {
  // Hook accepts legacy format for convenience
  const { data, isLoading } = useUsers({
    page: 1, // Will be converted to pageNumber
    pageSize: 10,
    search: "test", // Will be converted to searchTerm
  });

  return (
    <div>
      {data?.data.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 🏗️ Creating Custom Query Params

### Step 1: Extend BaseQueryParams

```typescript
// modules/products/services/product.service.ts
import { BaseQueryParams } from "@/core/types/query-params";

export interface ProductQueryParams extends BaseQueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}
```

### Step 2: Use in Service

```typescript
class ProductService {
  private api = createRestApiService<Product>("/products");

  async getAll(params?: ProductQueryParams) {
    const backendParams = toBackendQueryParams(params);
    return this.api.getAll(backendParams as Record<string, unknown>);
  }
}
```

### Step 3: Use in Components

```typescript
const products = await productService.getAll({
  pageNumber: 1,
  pageSize: 20,
  searchTerm: "laptop",
  category: "electronics", // Custom field
  minPrice: 1000, // Custom field
  inStock: true, // Custom field
});
```

## 🔄 Migration Guide

### Before (Old Way)

```typescript
// ❌ Each service had its own interface
export interface UserQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
}

export interface RoleQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
}
```

### After (New Way)

```typescript
// ✅ Extend from base
import { BaseQueryParams } from "@/core/types/query-params";

export interface UserQueryParams extends BaseQueryParams {
  status?: string; // Only user-specific fields
}

export type RoleQueryParams = BaseQueryParams; // No custom fields
```

## 💡 Benefits

### 1. Consistency ✅

- Same field names across all services
- Matches backend API specification
- Predictable behavior

### 2. Type Safety ✅

- IntelliSense for all parameters
- Compile-time checks
- No typos in field names

### 3. Maintainability ✅

- Single source of truth
- Easy to add new base parameters
- Consistent across features

### 4. Backward Compatibility ✅

- Legacy format still works
- Automatic conversion
- No breaking changes

## 🎨 Best Practices

### DO ✅

```typescript
// ✅ Extend base for feature-specific params
export interface UserQueryParams extends BaseQueryParams {
  status?: string;
}

// ✅ Use type alias if no custom fields
export type RoleQueryParams = BaseQueryParams;

// ✅ Convert params in service
async getAll(params?: UserQueryParams) {
  const backendParams = toBackendQueryParams(params);
  return this.api.getAll(backendParams);
}

// ✅ Use new field names
const users = await userService.getAll({
  pageNumber: 1,
  searchTerm: "john",
});
```

### DON'T ❌

```typescript
// ❌ Don't create duplicate interfaces
export interface UserQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

// ❌ Don't pass params without conversion
async getAll(params?: any) {
  return this.api.getAll(params); // Wrong field names!
}

// ❌ Don't use inconsistent field names
const users = await userService.getAll({
  Page: 1,           // Wrong casing
  page_size: 10,     // Wrong format
  searchString: "",  // Wrong name
});
```

## 📖 API Reference

### toBackendQueryParams()

Converts frontend params to backend format.

```typescript
function toBackendQueryParams(
  params?: LegacyQueryParams & Partial<BaseQueryParams>
): BaseQueryParams | undefined;
```

**Example:**

```typescript
const frontendParams = {
  page: 1,
  search: "test",
};

const backendParams = toBackendQueryParams(frontendParams);
// Result: { pageNumber: 1, searchTerm: "test" }
```

## 🔍 Related Files

- **Base types:** `src/core/types/query-params.ts`
- **User service:** `src/modules/users/services/user.service.ts`
- **Role service:** `src/modules/roles/services/role.service.ts`
- **API spec:** `example.api.json`

---

**Last Updated:** December 24, 2025  
**Status:** ✅ Implemented & Production Ready
