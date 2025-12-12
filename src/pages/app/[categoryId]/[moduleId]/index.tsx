import { useRouter } from "next/router";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { NavigationSidebar } from "@/components/layouts/NavigationSidebar";
import { Container, Title, Text, Breadcrumbs, Anchor } from "@mantine/core";
import { Menu } from "@/types";

// Mock data - replace with actual API call
const mockMenus: Menu[] = [
  {
    id: "menu-1",
    moduleId: "mod-1",
    name: "User",
    path: "user",
    order: 1,
  },
  {
    id: "menu-2",
    moduleId: "mod-1",
    name: "Role",
    path: "role",
    order: 2,
  },
  {
    id: "menu-3",
    moduleId: "mod-1",
    name: "Settings",
    path: "settings",
    order: 3,
    children: [
      {
        id: "menu-3-1",
        moduleId: "mod-1",
        name: "General",
        path: "settings/general",
        parentId: "menu-3",
        order: 1,
      },
      {
        id: "menu-3-2",
        moduleId: "mod-1",
        name: "Security",
        path: "settings/security",
        parentId: "menu-3",
        order: 2,
      },
    ],
  },
];

export default function ModulePage() {
  const router = useRouter();
  const { categoryId, moduleId } = router.query;

  return (
    <AdminLayout
      navbar={
        <NavigationSidebar
          menus={mockMenus}
          moduleId={moduleId as string}
          categoryId={categoryId as string}
        />
      }
    >
      <Container size="xl">
        <Breadcrumbs mb="md">
          <Anchor href="/dashboard">Dashboard</Anchor>
          <Anchor href={`/app/${categoryId}`}>Kategori</Anchor>
          <Text>Modul</Text>
        </Breadcrumbs>

        <Title order={2} mb="xs">
          Pilih Menu
        </Title>
        <Text c="dimmed" mb="xl">
          Pilih menu dari sidebar untuk melihat konten
        </Text>
      </Container>
    </AdminLayout>
  );
}
