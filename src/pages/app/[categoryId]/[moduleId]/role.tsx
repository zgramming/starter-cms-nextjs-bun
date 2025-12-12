import { useState } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { NavigationSidebar } from "@/components/layouts/NavigationSidebar";
import {
  Container,
  Title,
  Breadcrumbs,
  Anchor,
  Pagination,
  Paper,
  Badge,
} from "@mantine/core";
import { DataTable, Column } from "@/components/common/DataTable";
import { TableToolbar } from "@/components/common/TableToolbar";
import { Role, Menu } from "@/types";

// Mock menus
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
];

// Mock role data
const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access",
    permissions: ["*"],
  },
  {
    id: "2",
    name: "Admin",
    description: "Administrative access",
    permissions: ["user.read", "user.write", "role.read"],
  },
  {
    id: "3",
    name: "User",
    description: "Regular user access",
    permissions: ["user.read"],
  },
  {
    id: "4",
    name: "Guest",
    description: "Limited access",
    permissions: ["user.read"],
  },
];

export default function RoleManagementPage() {
  const router = useRouter();
  const { categoryId, moduleId } = router.query;
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);

  const columns: Column<Role>[] = [
    { key: "name", label: "Nama Role" },
    { key: "description", label: "Deskripsi" },
    {
      key: "permissions",
      label: "Jumlah Permission",
      render: (role) => (
        <Badge variant="light" color="blue">
          {role.permissions.length} permissions
        </Badge>
      ),
    },
  ];

  const handleEdit = (role: Role) => {
    console.log("Edit role:", role);
  };

  const handleDelete = (role: Role) => {
    console.log("Delete role:", role);
  };

  const handleView = (role: Role) => {
    console.log("View role:", role);
  };

  const handleAdd = () => {
    console.log("Add new role");
  };

  const handleImport = () => {
    console.log("Import roles");
  };

  const handleExport = () => {
    console.log("Export roles");
  };

  const filteredRoles = mockRoles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      role.description.toLowerCase().includes(searchValue.toLowerCase())
  );

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
          <Anchor href={`/app/${categoryId}`}>Manajemen Sistem</Anchor>
          <Anchor href={`/app/${categoryId}/${moduleId}`}>
            User Management
          </Anchor>
          <span>Role</span>
        </Breadcrumbs>

        <Title order={2} mb="xl">
          Management Role
        </Title>

        <Paper shadow="xs" p="md">
          <TableToolbar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onAdd={handleAdd}
            onImport={handleImport}
            onExport={handleExport}
          />

          <DataTable
            data={filteredRoles}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />

          <Pagination
            total={Math.ceil(filteredRoles.length / 10)}
            value={activePage}
            onChange={setActivePage}
            mt="md"
          />
        </Paper>
      </Container>
    </AdminLayout>
  );
}
