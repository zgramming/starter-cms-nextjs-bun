# Form Components Documentation

Semua form component sudah dibuat berdasarkan schema database PostgreSQL. Berikut daftar form yang tersedia:

## 📋 Daftar Form Components

### 1. Application Structure Forms

- **ApplicationCategoryForm** - Manage kategori aplikasi (Dashboard, User Management, dll)
- **ApplicationModuleForm** - Manage modul dalam kategori
- **ApplicationMenuForm** - Manage menu dan sub-menu

### 2. Master Data Forms

- **MasterCategoryForm** - Manage kategori master data
- **MasterDataForm** - Manage data master
- **MasterDataParameterForm** - Manage parameter data master

### 3. System Configuration Forms

- **ParameterForm** - Manage system parameters (JWT config, dll)
- **PermissionTypeForm** - Manage tipe permission (VIEW, ADD, EDIT, DELETE, dll)

### 4. User Access Forms

- **UserForm** - Manage users (sudah ada sebelumnya)
- **RoleForm** - Manage roles (sudah ada sebelumnya)
- **AccessCategoryForm** - Assign kategori ke user
- **AccessModuleForm** - Assign modul ke user
- **AccessMenuForm** - Assign menu ke user
- **AccessMenuPermissionForm** - Assign permission ke menu access

## 🎯 Fitur Setiap Form

Semua form memiliki fitur:

- ✅ Validation otomatis (required fields, max length)
- ✅ Auto-populate data saat edit mode
- ✅ Status active/inactive (Switch component)
- ✅ Modal-based untuk UX yang clean
- ✅ Cancel & Submit buttons
- ✅ TypeScript type safety

## 📝 Cara Penggunaan

### Contoh: ApplicationCategoryForm

```tsx
import { useState } from "react";
import ApplicationCategoryForm from "@/components/forms/ApplicationCategoryForm";

function CategoryPage() {
  const [opened, setOpened] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSubmit = (values) => {
    if (editData) {
      // Update existing category
      updateCategory.mutate({ id: editData.id, ...values });
    } else {
      // Create new category
      createCategory.mutate(values);
    }
    setOpened(false);
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>Add Category</Button>

      <ApplicationCategoryForm
        opened={opened}
        onClose={() => setOpened(false)}
        onSubmit={handleSubmit}
        initialData={editData}
      />
    </>
  );
}
```

### Contoh dengan Select Data (ApplicationModuleForm)

```tsx
import ApplicationModuleForm from "@/components/forms/ApplicationModuleForm";
import { useCategories } from "@/hooks/useApi";

function ModulePage() {
  const { data: categories } = useCategories();

  const categoryOptions =
    categories?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  return (
    <ApplicationModuleForm
      opened={opened}
      onClose={() => setOpened(false)}
      onSubmit={handleSubmit}
      initialData={editData}
      categories={categoryOptions} // Pass dropdown data
    />
  );
}
```

## 🔧 Field Specifications

### ApplicationCategoryForm

- **code** (string, max 50, required)
- **name** (string, max 100, required)
- **description** (text, optional)
- **order_index** (number, default 0)
- **route** (string, max 255)
- **icon** (string, max 100)
- **status** (boolean, default true)

### ApplicationModuleForm

- **category_id** (UUID, required) - Dropdown
- **code** (string, max 50, required)
- **name** (string, max 100, required)
- **description** (text, optional)
- **order_index** (number, default 0)
- **route** (string, max 255)
- **icon** (string, max 100)
- **status** (boolean, default true)

### ApplicationMenuForm

- **category_id** (UUID, required) - Dropdown
- **module_id** (UUID, required) - Dropdown
- **parent_id** (UUID, optional) - Dropdown untuk sub-menu
- **code** (string, max 50, required)
- **name** (string, max 100, required)
- **description** (text, optional)
- **order_index** (number, default 0)
- **route** (string, max 255)
- **icon** (string, max 100)
- **status** (boolean, default true)

### MasterCategoryForm

- **code** (string, max 50, required)
- **name** (string, max 100, required)
- **description** (text, optional)
- **status** (boolean, default true)

### MasterDataForm

- **category_id** (UUID, required) - Dropdown
- **code** (string, max 50, required)
- **name** (string, max 100, required)
- **description** (text, optional)
- **order_index** (number, default 0)
- **status** (boolean, default true)

### MasterDataParameterForm

- **master_data_id** (UUID, required) - Dropdown
- **key** (string, max 100, required)
- **value** (text, required)
- **description** (text, optional)
- **status** (boolean, default true)

### ParameterForm

- **code** (string, max 50, required)
- **name** (string, max 100, required)
- **data_type** (enum, required) - string, int, float, boolean, json
- **value** (text, required)
- **description** (text, optional)
- **status** (boolean, default true)

### PermissionTypeForm

- **code** (string, max 20, required) - VIEW, ADD, EDIT, DELETE, dll
- **name** (string, max 50, required)
- **description** (text, optional)
- **status** (boolean, default true)

### AccessCategoryForm

- **user_id** (UUID, required) - Dropdown
- **category_id** (UUID, required) - Dropdown
- **status** (boolean, default true)

### AccessModuleForm

- **user_id** (UUID, required) - Dropdown
- **module_id** (UUID, required) - Dropdown
- **status** (boolean, default true)

### AccessMenuForm

- **user_id** (UUID, required) - Dropdown
- **menu_id** (UUID, required) - Dropdown
- **status** (boolean, default true)

### AccessMenuPermissionForm

- **access_menu_id** (UUID, required) - Dropdown
- **permission_type_id** (UUID, required) - Dropdown
- **status** (boolean, default true)

## 🎨 Customization

Semua form menggunakan Mantine components dan bisa dikustomisasi:

```tsx
<ApplicationCategoryForm
  opened={opened}
  onClose={onClose}
  onSubmit={handleSubmit}
  initialData={data}
  // Mantine Modal props juga bisa ditambahkan
/>
```

## 📦 Dependencies

Semua form sudah menggunakan:

- `@mantine/core` - UI components
- `@mantine/form` - Form management & validation
- `@mantine/hooks` - React hooks utilities

## 🔄 Integration dengan API

Gunakan dengan React Query hooks yang sudah ada:

```tsx
import { useCreateCategory, useUpdateCategory } from "@/hooks/useApi";

const createMutation = useCreateCategory();
const updateMutation = useUpdateCategory();

const handleSubmit = (values) => {
  if (editMode) {
    updateMutation.mutate({ id: editId, ...values });
  } else {
    createMutation.mutate(values);
  }
};
```

## ✨ Next Steps

1. Buat page untuk setiap tabel (mirip user.tsx dan role.tsx)
2. Tambahkan API endpoints di backend
3. Test CRUD operations
4. Implementasikan access control berdasarkan permission
