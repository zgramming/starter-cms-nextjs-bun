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

interface ApplicationModule {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  description: string;
  status: boolean;
}

const mockModules: ApplicationModule[] = [
  {
    id: "1",
    category_id: "1",
    category_name: "Setting",
    name: "User Management",
    description: "Manage users",
    status: true,
  },
];

function AppModulePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const columns: Column<ApplicationModule>[] = [
    { key: "name", label: "Module Name", render: (m) => m.name },
    {
      key: "category",
      label: "Category",
      render: (m) => <Badge>{m.category_name}</Badge>,
    },
    { key: "description", label: "Description", render: (m) => m.description },
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
          <Anchor href="#">Application Module</Anchor>
        </Breadcrumbs>
        <Title order={2} mb="lg">
          Application Module Management
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
            data={mockModules}
            onEdit={(m) => console.log(m)}
            onDelete={(m) => console.log(m)}
          />
          <Pagination total={1} value={page} onChange={setPage} mt="md" />
        </Paper>
      </Container>
    </AdminLayout>
  );
}

export default AppModulePage;
