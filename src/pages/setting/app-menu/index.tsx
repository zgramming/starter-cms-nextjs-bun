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

interface ApplicationMenu {
  id: string;
  module_id: string;
  module_name: string;
  name: string;
  url: string;
  status: boolean;
}

const mockMenus: ApplicationMenu[] = [
  {
    id: "1",
    module_id: "1",
    module_name: "User Management",
    name: "Users",
    url: "/setting/user",
    status: true,
  },
  {
    id: "2",
    module_id: "1",
    module_name: "User Management",
    name: "Roles",
    url: "/setting/role",
    status: true,
  },
];

function AppMenuPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const columns: Column<ApplicationMenu>[] = [
    { key: "name", label: "Menu Name", render: (m) => m.name },
    {
      key: "module",
      label: "Module",
      render: (m) => <Badge>{m.module_name}</Badge>,
    },
    { key: "url", label: "URL", render: (m) => m.url },
    {
      key: "status",
      label: "Status",
      render: (m) => (
        <Badge color={m.status ? "green" : "gray"}>
          {m.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Container size="xl" py="md">
        <Breadcrumbs mb="md">
          <Anchor href="/dashboard">Dashboard</Anchor>
          <Anchor href="#">Setting</Anchor>
          <Anchor href="#">Application Menu</Anchor>
        </Breadcrumbs>
        <Title order={2} mb="lg">
          Application Menu Management
        </Title>
        <Paper shadow="xs" p="md">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            onAdd={() => {}}
            showAdd
          />
          <DataTable
            columns={columns}
            data={mockMenus}
            onEdit={(m) => console.log(m)}
            onDelete={(m) => console.log(m)}
          />
          <Pagination total={1} value={page} onChange={setPage} mt="md" />
        </Paper>
      </Container>
    </AdminLayout>
  );
}

export default AppMenuPage;
