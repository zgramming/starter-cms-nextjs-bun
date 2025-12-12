import { useState } from "react";
import {
  Container,
  Title,
  Breadcrumbs,
  Anchor,
  Pagination,
  Paper,
  Badge,
  Text,
} from "@mantine/core";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable, type Column } from "@/shared/components/ui/DataTable";
import { TableToolbar } from "@/shared/components/ui/TableToolbar";

interface AccessControl {
  id: string;
  user_name: string;
  role_name: string;
  status: boolean;
}

const mockAccessControls: AccessControl[] = [
  { id: "1", user_name: "Admin User", role_name: "Super Admin", status: true },
];

function AccessControlPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const columns: Column<AccessControl>[] = [
    {
      key: "user",
      label: "User",
      render: (ac) => (
        <div>
          <Text size="sm" fw={500}>
            {ac.user_name}
          </Text>
          <Text size="xs" c="dimmed">
            {ac.role_name}
          </Text>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (ac) => (
        <Badge color={ac.status ? "green" : "gray"}>
          {ac.status ? "Active" : "Inactive"}
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
          <Anchor href="#">Access Control</Anchor>
        </Breadcrumbs>
        <Title order={2} mb="lg">
          Access Control Management
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
            data={mockAccessControls}
            onEdit={(ac) => console.log(ac)}
            onDelete={(ac) => console.log(ac)}
          />
          <Pagination total={1} value={page} onChange={setPage} mt="md" />
        </Paper>
      </Container>
    </AdminLayout>
  );
}

export default AccessControlPage;
