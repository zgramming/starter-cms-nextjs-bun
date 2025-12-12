import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { CategorySection } from "@/shared/components/ui/CategorySection";
import { Stack, Title } from "@mantine/core";
import type { Category } from "@/types/app-structure";

// Mock data untuk kategori dan modul
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Manajemen Sistem",
    description: "Kelola pengguna, peran, dan parameter sistem",
    modules: [
      {
        id: "user",
        categoryId: "1",
        name: "User Management",
        description: "Kelola data pengguna sistem",
        image:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400",
        menus: [
          {
            id: "user-list",
            moduleId: "user",
            name: "Daftar User",
            path: "/setting/user",
            order: 1,
          },
        ],
      },
      {
        id: "role",
        categoryId: "1",
        name: "Role Management",
        description: "Kelola peran dan hak akses",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
        menus: [
          {
            id: "role-list",
            moduleId: "role",
            name: "Daftar Role",
            path: "/setting/role",
            order: 1,
          },
        ],
      },
      {
        id: "parameter",
        categoryId: "1",
        name: "Parameter",
        description: "Konfigurasi parameter aplikasi",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
        menus: [
          {
            id: "parameter-list",
            moduleId: "parameter",
            name: "Daftar Parameter",
            path: "/setting/parameter",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Master Data",
    description: "Kelola data master aplikasi",
    modules: [
      {
        id: "master-category",
        categoryId: "2",
        name: "Master Kategori",
        description: "Kelola kategori master data",
        image:
          "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400",
        menus: [
          {
            id: "master-category-list",
            moduleId: "master-category",
            name: "Daftar Kategori",
            path: "/setting/master-category",
            order: 1,
          },
        ],
      },
      {
        id: "master-data",
        categoryId: "2",
        name: "Master Data",
        description: "Kelola data master aplikasi",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        menus: [
          {
            id: "master-data-list",
            moduleId: "master-data",
            name: "Daftar Master Data",
            path: "/setting/master-data",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Konfigurasi",
    description: "Konfigurasi menu, modul, dan access control",
    modules: [
      {
        id: "app-menu",
        categoryId: "3",
        name: "Menu",
        description: "Kelola menu aplikasi",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
        menus: [
          {
            id: "app-menu-list",
            moduleId: "app-menu",
            name: "Daftar Menu",
            path: "/setting/app-menu",
            order: 1,
          },
        ],
      },
      {
        id: "app-module",
        categoryId: "3",
        name: "Modul",
        description: "Kelola modul aplikasi",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
        menus: [
          {
            id: "app-module-list",
            moduleId: "app-module",
            name: "Daftar Modul",
            path: "/setting/app-module",
            order: 1,
          },
        ],
      },
      {
        id: "access-control",
        categoryId: "3",
        name: "Access Control",
        description: "Kelola hak akses per modul",
        image:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
        menus: [
          {
            id: "access-control-list",
            moduleId: "access-control",
            name: "Daftar Access Control",
            path: "/setting/access-control",
            order: 1,
          },
        ],
      },
    ],
  },
];

export default function DashboardPage() {
  return (
    <AdminLayout>
      <Stack gap="xl">
        <Title order={1}>Dashboard</Title>

        {mockCategories.map((category) => (
          <CategorySection
            key={category.id}
            categoryName={category.name}
            modules={category.modules}
            categoryId={category.id}
          />
        ))}
      </Stack>
    </AdminLayout>
  );
}
