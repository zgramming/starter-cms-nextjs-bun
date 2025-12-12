# ⚡ Quick Start - CMS Admin Integration

## 🚀 5 Menit Setup & Run

### 1. Install Dependencies (sudah dilakukan)

```bash
✅ bun install  # Sudah terinstall semua
```

### 2. Setup Environment

```bash
# Copy file example
cp .env.local.example .env.local

# Edit .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api  # Ganti dengan URL backend .NET Anda
```

### 3. Run Development Server

```bash
bun dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 📝 Yang Harus Dilakukan untuk Integrasi dengan Backend

### Step 1: Update Login Page

File: [src/pages/login.tsx](src/pages/login.tsx)

```tsx
import { authApi } from "@/services/api";
import { useAuthStore } from "@/store/auth";

// Ganti handleSubmit dengan:
const handleSubmit = async (values: typeof form.values) => {
  setLoading(true);
  try {
    const response = await authApi.login(values);
    const { user, token, refreshToken } = response.data.data;
    setAuth(user, token, refreshToken);
    router.push("/dashboard");
  } catch (error: any) {
    notifications.show({
      title: "Error",
      message: error.message,
      color: "red",
    });
  } finally {
    setLoading(false);
  }
};
```

### Step 2: Protect Routes

Wrap semua halaman yang butuh auth:

```tsx
// Contoh: dashboard.tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>{/* content */}</AdminLayout>
    </ProtectedRoute>
  );
}
```

### Step 3: Replace Mock Data dengan Real API

Lihat contoh lengkap di [user-example.tsx](src/pages/app/[categoryId]/[moduleId]/user-example.tsx)

```tsx
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks/useApi";

function UserPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch data
  const { data, isLoading } = useUsers({ page, pageSize: 10, search });

  // Mutations
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  // Use data
  return <DataTable data={data?.data || []} />;
}
```

---

## 🎯 File-File Penting

| File                                                                             | Purpose                         | Status        |
| -------------------------------------------------------------------------------- | ------------------------------- | ------------- |
| [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)                             | Panduan lengkap API integration | ✅ Ready      |
| [src/lib/api-client.ts](src/lib/api-client.ts)                                   | Axios instance + interceptors   | ✅ Configured |
| [src/services/api.ts](src/services/api.ts)                                       | API endpoints                   | ✅ Ready      |
| [src/hooks/useApi.ts](src/hooks/useApi.ts)                                       | React Query hooks               | ✅ Ready      |
| [src/store/auth.ts](src/store/auth.ts)                                           | Auth state management           | ✅ Ready      |
| [src/components/auth/ProtectedRoute.tsx](src/components/auth/ProtectedRoute.tsx) | Route protection                | ✅ Ready      |
| [src/components/forms/UserForm.tsx](src/components/forms/UserForm.tsx)           | Reusable form                   | ✅ Ready      |
| [user-example.tsx](src/pages/app/[categoryId]/[moduleId]/user-example.tsx)       | Complete example                | ✅ Ready      |

---

## 🔧 Backend .NET Requirements

### Endpoint yang Dibutuhkan:

```
Authentication:
✓ POST /api/auth/login
✓ POST /api/auth/register
✓ POST /api/auth/refresh
✓ GET  /api/auth/profile

Users:
✓ GET    /api/users?page=1&pageSize=10&search=keyword
✓ GET    /api/users/{id}
✓ POST   /api/users
✓ PUT    /api/users/{id}
✓ DELETE /api/users/{id}

Roles (sama seperti users):
✓ GET    /api/roles
✓ POST   /api/roles
✓ PUT    /api/roles/{id}
✓ DELETE /api/roles/{id}
```

### Response Format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

### CORS Setup (.NET):

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

app.UseCors("AllowFrontend");
```

---

## 🎨 Membuat Resource Baru

Contoh untuk "Categories":

### 1. Add Type

```tsx
// src/types/index.ts
export interface Category {
  id: string;
  name: string;
  description: string;
}
```

### 2. API sudah auto-generated via factory!

```tsx
// src/services/api.ts (sudah ada)
export const categoryApi = createCrudApi<Category>("categories");
```

### 3. Hooks sudah auto-generated!

```tsx
// src/hooks/useApi.ts
import { categoryApi } from "@/services/api";

export const categoryHooks = createCrudHooks<Category>(
  "categories",
  categoryApi
);
```

### 4. Use in Component

```tsx
function CategoriesPage() {
  const { data, isLoading } = categoryHooks.useList();
  const createCategory = categoryHooks.useCreate();

  // Done! 🎉
}
```

---

## 📚 Common Patterns

### Search dengan Debounce

```tsx
import { useDebouncedValue } from "@mantine/hooks";

const [search, setSearch] = useState("");
const [debouncedSearch] = useDebouncedValue(search, 500);

const { data } = useUsers({ search: debouncedSearch });
```

### Bulk Delete

```tsx
const [selectedIds, setSelectedIds] = useState<string[]>([]);
const deleteUser = useDeleteUser();

const handleBulkDelete = async () => {
  await Promise.all(selectedIds.map((id) => deleteUser.mutateAsync(id)));
  setSelectedIds([]);
};
```

### Export Data

```tsx
import { userApi } from "@/services/api";

const handleExport = async () => {
  try {
    await userApi.export();
    notifications.show({
      title: "Success",
      message: "Data exported",
      color: "green",
    });
  } catch (error) {
    // Error handled automatically
  }
};
```

---

## ✅ Checklist Integration

- [ ] Update `.env.local` dengan URL backend
- [ ] Test endpoint backend dengan Postman/Thunder Client
- [ ] Update Login page untuk real API
- [ ] Wrap dashboard & management pages dengan `ProtectedRoute`
- [ ] Copy pattern dari `user-example.tsx` ke `user.tsx`
- [ ] Test CRUD operations (Create, Read, Update, Delete)
- [ ] Test search & pagination
- [ ] Configure CORS di backend .NET
- [ ] Test token refresh flow
- [ ] Deploy to production 🚀

---

## 🆘 Troubleshooting

### CORS Error

```
❌ Access to XMLHttpRequest blocked by CORS policy
```

**Fix:** Enable CORS di backend .NET (lihat Backend Requirements)

### 401 Unauthorized

```
❌ Request failed with status code 401
```

**Fix:**

1. Check token di localStorage
2. Verify backend JWT validation
3. Check token expiry

### Network Error

```
❌ Network Error
```

**Fix:**

1. Check backend running
2. Verify `NEXT_PUBLIC_API_BASE_URL` di `.env.local`
3. Check firewall/antivirus

### Type Errors

```
❌ Property 'data' does not exist on type 'AxiosResponse'
```

**Fix:** Restart TypeScript server (`Cmd+Shift+P` → "Restart TS Server")

---

## 📖 Baca Lebih Lanjut

- [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) - Panduan lengkap
- [THEME_GUIDE.md](THEME_GUIDE.md) - Panduan theme & styling
- [React Query Docs](https://tanstack.com/query/latest)
- [Mantine UI Docs](https://mantine.dev)
- [Next.js Docs](https://nextjs.org/docs)

---

**🎉 Selamat! CMS Admin siap untuk production!**

Jika ada pertanyaan, check [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) untuk detail lengkap.
