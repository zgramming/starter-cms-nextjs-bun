import { useState } from "react";
import {
  Container,
  Title,
  Breadcrumbs,
  Anchor,
  Paper,
  Badge,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import { IconSearch, IconPlus } from "@tabler/icons-react";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable, type Column } from "@/shared/components/ui/DataTable";
import { TableToolbar } from "@/shared/components/ui/TableToolbar";
import { TablePagination } from "@/shared/components/ui/TablePagination";

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
  const [pageSize, setPageSize] = useState(10);
  const totalRecords = mockAccessControls.length;

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
            leftSide={
              <TextInput
                placeholder="Cari..."
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                leftSection={<IconSearch style={{ width: 16, height: 16 }} />}
                size="xs"
                w={180}
              />
            }
            rightSide={
              <Button
                leftSection={<IconPlus style={{ width: 16, height: 16 }} />}
                size="xs"
                onClick={() => {}}
              >
                Tambah
              </Button>
            }
          />
          <DataTable columns={columns} data={mockAccessControls} />
          <TablePagination
            page={page}
            total={totalRecords}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
            loading={false}
          />
        </Paper>
      </Container>
    </AdminLayout>
  );
}

export default AccessControlPage;
