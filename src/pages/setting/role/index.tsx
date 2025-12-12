import { useState } from "react";
import {
  Container,
  Title,
  Breadcrumbs,
  Anchor,
  Pagination,
  Paper,
  Badge,
} from "@mantine/core";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable, type Column } from "@/shared/components/ui/DataTable";
import { TableToolbar } from "@/shared/components/ui/TableToolbar";
import type { Role } from "@/types/user";

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
    description: "Basic user access",
    permissions: ["user.read"],
  },
];

function RolePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const columns: Column<Role>[] = [
    {
      key: "name",
      label: "Role Name",
      render: (role) => role.name,
    },
    {
      key: "description",
      label: "Description",
      render: (role) => role.description,
    },
    {
      key: "permissions",
      label: "Permissions",
      render: (role) => (
        <Badge color="blue">{role.permissions.length} permissions</Badge>
      ),
    },
  ];

  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Setting", href: "#" },
    { title: "Role", href: "#" },
  ];

  return (
    <AdminLayout>
      <Container size="xl" py="md">
        <Breadcrumbs mb="md">
          {breadcrumbs.map((item, index) => (
            <Anchor href={item.href} key={index}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>

        <Title order={2} mb="lg">
          Role Management
        </Title>

        <Paper shadow="xs" p="md">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            onAdd={() => console.log("Add role")}
            showAdd={true}
          />

          <DataTable
            columns={columns}
            data={mockRoles}
            onEdit={(role) => console.log("Edit:", role)}
            onDelete={(role) => console.log("Delete:", role)}
          />

          <Pagination
            total={Math.ceil(mockRoles.length / pageSize)}
            value={page}
            onChange={setPage}
            mt="md"
          />
        </Paper>
      </Container>
    </AdminLayout>
  );
}

export default RolePage;
