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
import { IconSearch, IconPlus } from "@tabler/icons-react";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable, type Column } from "@/shared/components/ui/DataTable";
import { TableToolbar } from "@/shared/components/ui/TableToolbar";
import { TablePagination } from "@/shared/components/ui/TablePagination";

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
  const [pageSize, setPageSize] = useState(10);
  const totalRecords = mockMenus.length;

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
          <DataTable
            columns={columns}
            data={mockMenus}
            onEdit={(m) => console.log(m)}
            onDelete={(m) => console.log(m)}
          />
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

export default AppMenuPage;
