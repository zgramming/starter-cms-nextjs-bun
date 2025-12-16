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

interface MasterCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  status: boolean;
}

const mockCategories: MasterCategory[] = [
  {
    id: "1",
    code: "STS",
    name: "Status",
    description: "General status categories",
    status: true,
  },
];

function MasterCategoryPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalRecords = mockCategories.length;

  const columns: Column<MasterCategory>[] = [
    {
      key: "code",
      label: "Code",
      render: (cat) => <Badge variant="outline">{cat.code}</Badge>,
    },
    { key: "name", label: "Category Name", render: (cat) => cat.name },
    {
      key: "description",
      label: "Description",
      render: (cat) => cat.description,
    },
    {
      key: "status",
      label: "Status",
      render: (cat) => (
        <Badge color={cat.status ? "green" : "gray"}>
          {cat.status ? "Active" : "Inactive"}
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
          <Anchor href="#">Master Category</Anchor>
        </Breadcrumbs>
        <Title order={2} mb="lg">
          Master Category Management
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
            data={mockCategories}
            onEdit={(cat) => console.log(cat)}
            onDelete={(cat) => console.log(cat)}
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

export default MasterCategoryPage;
