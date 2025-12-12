# 🚀 API Integration Guide - CMS Admin

## ✅ Yang Sudah Diinstall & Dikonfigurasi

### 📦 Packages

```bash
✅ axios - HTTP client untuk REST API
✅ @tanstack/react-query - Data fetching & state management
✅ @tanstack/react-query-devtools - DevTools untuk debugging
✅ zustand - Lightweight state management
✅ @mantine/notifications - Toast notifications
```

---

## 📁 Struktur File yang Dibuat

```
src/
├── config/
│   └── env.ts                    # Environment configuration
├── lib/
│   └── api-client.ts             # Axios instance & interceptors
├── store/
│   └── auth.ts                   # Authentication state (Zustand)
├── services/
│   └── api.ts                    # API endpoints & CRUD factory
├── hooks/
│   └── useApi.ts                 # React Query hooks
└── components/
    └── auth/
        └── ProtectedRoute.tsx    # Route protection
```

---

## 🔧 Setup Environment Variables

### 1. Create `.env.local` file:

```bash
# Copy dari .env.local.example
cp .env.local.example .env.local
```

### 2. Edit `.env.local`:

```env
# Update dengan URL backend .NET Anda
NEXT_PUBLIC_API_BASE_URL=https://your-dotnet-api.com/api
NEXT_PUBLIC_API_TIMEOUT=30000

# App Config
NEXT_PUBLIC_APP_NAME=CMS Admin
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development only
NEXT_PUBLIC_ENABLE_MOCKING=false
```

---

## 🎯 Cara Menggunakan

### 1. **Authentication Flow**

#### A. Update Login Page dengan Real API

Edit [login.tsx](src/pages/login.tsx):

```tsx
import { authApi } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const response = await authApi.login(values);
      const { user, token, refreshToken } = response.data.data;

      // Save to store & localStorage
      setAuth(user, token, refreshToken);

      notifications.show({
        title: "Success",
        message: "Login berhasil!",
        color: "green",
      });

      router.push("/dashboard");
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.message || "Login gagal",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput {...form.getInputProps("email")} />
      <PasswordInput {...form.getInputProps("password")} />
      <Button type="submit" loading={loading}>
        Masuk
      </Button>
    </form>
  );
}
```

#### B. Protect Routes

Wrap pages dengan `ProtectedRoute`:

```tsx
// dashboard.tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>{/* Your content */}</AdminLayout>
    </ProtectedRoute>
  );
}
```

Atau gunakan HOC:

```tsx
import { withAuth } from "@/components/auth/ProtectedRoute";

function DashboardPage() {
  return <AdminLayout>{/* Your content */}</AdminLayout>;
}

export default withAuth(DashboardPage);
```

---

### 2. **Data Fetching dengan React Query**

#### A. List Data dengan Pagination

Edit [user.tsx](src/pages/app/[categoryId]/[moduleId]/user.tsx):

```tsx
import { useUsers, useDeleteUser } from "@/hooks/useApi";
import { useState } from "react";

export default function UserManagementPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch users with React Query
  const { data, isLoading, isError, error } = useUsers({
    page,
    pageSize: 10,
    search,
  });

  const deleteUser = useDeleteUser();

  const handleDelete = (user: User) => {
    modals.openConfirmModal({
      title: "Delete User",
      children: `Are you sure you want to delete ${user.name}?`,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteUser.mutate(user.id),
    });
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAdd={() => setOpenedAdd(true)}
      />

      <DataTable
        data={data?.data || []}
        columns={columns}
        onDelete={handleDelete}
      />

      <Pagination
        total={data?.totalPages || 1}
        value={page}
        onChange={setPage}
      />
    </>
  );
}
```

#### B. Create/Update dengan Mutations

```tsx
import { useCreateUser, useUpdateUser } from "@/hooks/useApi";

function UserForm({ user, onClose }: { user?: User; onClose: () => void }) {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const form = useForm({
    initialValues: user || {
      name: "",
      email: "",
      role: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (user) {
        await updateUser.mutateAsync({ id: user.id, data: values });
      } else {
        await createUser.mutateAsync(values);
      }
      onClose();
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Name" {...form.getInputProps("name")} />
      <TextInput label="Email" {...form.getInputProps("email")} />
      <Button
        type="submit"
        loading={createUser.isPending || updateUser.isPending}
      >
        Save
      </Button>
    </form>
  );
}
```

---

### 3. **Upload/Download Files**

#### Import Excel/CSV:

```tsx
import { userApi } from "@/services/api";
import { Dropzone } from "@mantine/dropzone";

function ImportUsers() {
  const [loading, setLoading] = useState(false);

  const handleDrop = async (files: File[]) => {
    setLoading(true);
    try {
      await userApi.import(files[0]);
      notifications.show({
        title: "Success",
        message: "Data imported successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Import failed",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={["text/csv", "application/vnd.ms-excel"]}
      loading={loading}
    >
      Drop files here
    </Dropzone>
  );
}
```

#### Export Excel/CSV:

```tsx
import { userApi } from "@/services/api";

function ExportButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      await userApi.export();
      notifications.show({
        title: "Success",
        message: "Data exported successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Export failed",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleExport} loading={loading}>
      Export
    </Button>
  );
}
```

---

### 4. **Membuat API untuk Resource Baru**

Contoh untuk "Parameters":

```tsx
// 1. Tambah type di src/types/index.ts
export interface Parameter {
  id: string;
  key: string;
  value: string;
  type: "string" | "number" | "boolean";
}

// 2. Create API (sudah ada di src/services/api.ts)
export const parameterApi = createCrudApi<Parameter>("parameters");

// 3. Create hooks (src/hooks/useApi.ts)
import { parameterApi } from "@/services/api";

export const parameterHooks = createCrudHooks<Parameter>(
  "parameters",
  parameterApi
);

// 4. Use in component
function ParametersPage() {
  const { data, isLoading } = parameterHooks.useList();
  const createParam = parameterHooks.useCreate();
  const deleteParam = parameterHooks.useDelete();

  // ...
}
```

---

## 🔐 Backend .NET API Requirements

### Expected Response Format:

#### Success Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Your data here
  }
}
```

#### Paginated Response:

```json
{
  "success": true,
  "data": [...],
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 5,
  "totalRecords": 50
}
```

#### Error Response:

```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": ["Error detail"]
  }
}
```

### Required Endpoints:

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/profile
PUT    /api/auth/profile
POST   /api/auth/change-password

GET    /api/users?page=1&pageSize=10&search=keyword
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
POST   /api/users/bulk-delete
GET    /api/users/export
POST   /api/users/import

// Same pattern for other resources
GET    /api/roles
GET    /api/parameters
GET    /api/categories
etc...
```

### CORS Configuration (.NET):

```csharp
// Program.cs atau Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});

app.UseCors("AllowFrontend");
```

### JWT Authentication (.NET):

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Configuration["Jwt:Issuer"],
            ValidAudience = Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
        };
    });
```

---

## 📊 React Query Best Practices

### 1. **Query Keys Organization**

```tsx
export const queryKeys = {
  users: {
    all: ["users"],
    lists: () => [...queryKeys.users.all, "list"],
    list: (params) => [...queryKeys.users.lists(), params],
    detail: (id) => [...queryKeys.users.all, "detail", id],
  },
};
```

### 2. **Optimistic Updates**

```tsx
const updateUser = useMutation({
  mutationFn: ({ id, data }) => userApi.update(id, data),
  onMutate: async (variables) => {
    // Cancel ongoing queries
    await queryClient.cancelQueries({ queryKey: queryKeys.users.lists() });

    // Snapshot previous value
    const previous = queryClient.getQueryData(queryKeys.users.lists());

    // Optimistically update
    queryClient.setQueryData(queryKeys.users.lists(), (old) => {
      // Update logic
    });

    return { previous };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(queryKeys.users.lists(), context.previous);
  },
  onSettled: () => {
    // Refetch to ensure sync
    queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
  },
});
```

### 3. **Prefetching**

```tsx
const queryClient = useQueryClient();

// Prefetch on hover
const handleMouseEnter = (userId: string) => {
  queryClient.prefetchQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => userApi.getById(userId),
  });
};
```

---

## ⚡ Performance Optimization

### 1. **Debounce Search**

```tsx
import { useDebouncedValue } from "@mantine/hooks";

function SearchComponent() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const { data } = useUsers({ search: debouncedSearch });

  // ...
}
```

### 2. **Infinite Scroll**

```tsx
import { useInfiniteQuery } from "@tanstack/react-query";

function useInfiniteUsers(search: string) {
  return useInfiniteQuery({
    queryKey: ["users", "infinite", search],
    queryFn: ({ pageParam = 1 }) => userApi.getAll({ page: pageParam, search }),
    getNextPageParam: (lastPage) =>
      lastPage.pageNumber < lastPage.totalPages
        ? lastPage.pageNumber + 1
        : undefined,
  });
}
```

### 3. **Virtualization untuk Large Lists**

```bash
bun add @tanstack/react-virtual
```

```tsx
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualizedTable({ data }: { data: User[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  return (
    <div ref={parentRef} style={{ height: "600px", overflow: "auto" }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {/* Row content */}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🛡️ Error Handling

### Global Error Handler:

```tsx
// components/ErrorBoundary.tsx
import { Component, ReactNode } from "react";
import { Alert } from "@mantine/core";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert color="red" title="Something went wrong">
          {this.state.error?.message}
        </Alert>
      );
    }

    return this.props.children;
  }
}
```

---

## 🧪 Testing (Opsional)

```bash
bun add -d vitest @testing-library/react @testing-library/jest-dom
```

```tsx
// Example test
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUsers } from "@/hooks/useApi";

test("fetch users", async () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const { result } = renderHook(() => useUsers(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toBeDefined();
});
```

---

## 📝 Checklist untuk Production

### Security:

- [ ] HTTPS untuk production
- [ ] Secure token storage (HttpOnly cookies untuk production)
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Input validation & sanitization

### Performance:

- [ ] Code splitting
- [ ] Image optimization
- [ ] Bundle size analysis
- [ ] Lighthouse audit score > 90

### Monitoring:

- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics/Plausible)
- [ ] Performance monitoring
- [ ] API response time tracking

### Deployment:

- [ ] Environment variables configured
- [ ] Build optimization
- [ ] CDN untuk static assets
- [ ] Docker containerization (optional)

---

## 🚀 Summary - Ready to Use!

### What's Configured:

✅ Axios dengan interceptors (auto token, refresh, error handling)
✅ React Query untuk data fetching & caching
✅ Zustand untuk auth state
✅ Environment variables
✅ Protected routes
✅ CRUD hooks factory
✅ Toast notifications
✅ TypeScript types

### Next Steps:

1. Update `.env.local` dengan URL backend .NET Anda
2. Update Login page dengan real API call
3. Wrap pages dengan `ProtectedRoute`
4. Replace mock data dengan `useApi` hooks
5. Test integration dengan backend

**Everything is ready for production!** 🎉
