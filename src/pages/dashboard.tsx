import { AdminLayout } from "@/components/layouts/AdminLayout";
import { CategorySection } from "@/components/dashboard/CategorySection";
import { Container, Title, Text } from "@mantine/core";
import { Category } from "@/types";

// Mock data - replace with actual API call
const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Manajemen Sistem",
    description: "Kelola sistem dan konfigurasi",
    modules: [
      {
        id: "mod-1",
        categoryId: "cat-1",
        name: "User Management",
        description: "Kelola user dan hak akses",
        image: "https://via.placeholder.com/300x160/667eea/ffffff?text=Users",
      },
      {
        id: "mod-2",
        categoryId: "cat-1",
        name: "Role Management",
        description: "Kelola role dan permission",
        image: "https://via.placeholder.com/300x160/764ba2/ffffff?text=Roles",
      },
      {
        id: "mod-3",
        categoryId: "cat-1",
        name: "Parameter",
        description: "Kelola parameter sistem",
        image:
          "https://via.placeholder.com/300x160/f093fb/ffffff?text=Parameter",
      },
    ],
  },
  {
    id: "cat-2",
    name: "Master Data",
    description: "Kelola data master aplikasi",
    modules: [
      {
        id: "mod-4",
        categoryId: "cat-2",
        name: "Master Kategori",
        description: "Kelola kategori master",
        image:
          "https://via.placeholder.com/300x160/4facfe/ffffff?text=Kategori",
      },
      {
        id: "mod-5",
        categoryId: "cat-2",
        name: "Master Data",
        description: "Kelola data master",
        image: "https://via.placeholder.com/300x160/00f2fe/ffffff?text=Master",
      },
    ],
  },
  {
    id: "cat-3",
    name: "Konfigurasi",
    description: "Konfigurasi menu dan akses",
    modules: [
      {
        id: "mod-6",
        categoryId: "cat-3",
        name: "Menu Management",
        description: "Kelola menu aplikasi",
        image: "https://via.placeholder.com/300x160/43e97b/ffffff?text=Menu",
      },
      {
        id: "mod-7",
        categoryId: "cat-3",
        name: "Modul Management",
        description: "Kelola modul aplikasi",
        image: "https://via.placeholder.com/300x160/38f9d7/ffffff?text=Modul",
      },
      {
        id: "mod-8",
        categoryId: "cat-3",
        name: "Access Control",
        description: "Kelola hak akses kategori, modul, menu",
        image: "https://via.placeholder.com/300x160/fa709a/ffffff?text=Access",
      },
    ],
  },
];

export default function DashboardPage() {
  return (
    <AdminLayout>
      <Container size="xl">
        <Title order={1} mb="xs">
          Dashboard
        </Title>
        <Text c="dimmed" mb="xl">
          Pilih kategori dan modul untuk memulai
        </Text>

        {mockCategories.map((category) => (
          <CategorySection
            key={category.id}
            categoryName={category.name}
            modules={category.modules}
            categoryId={category.id}
          />
        ))}
      </Container>
    </AdminLayout>
  );
}
