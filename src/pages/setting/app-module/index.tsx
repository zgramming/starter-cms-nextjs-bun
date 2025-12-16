import { useState } from "react";
import {
  Container,
  Title,
  Breadcrumbs,
  Anchor,
  Pagination,
  Paper,
  Badge,
  TextInput,
  Button,
} from "@mantine/core";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable, type Column } from "@/shared/components/ui/DataTable";
import { TableToolbar } from "@/shared/components/ui/TableToolbar";
import { TablePagination } from "@/shared/components/ui/TablePagination";
import { IconSearch, IconPlus } from "@tabler/icons-react";

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
  const [pageSize, setPageSize] = useState(10);
  const totalRecords = mockModules.length;

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
          <DataTable columns={columns} data={mockModules} />
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

export default AppModulePage;
