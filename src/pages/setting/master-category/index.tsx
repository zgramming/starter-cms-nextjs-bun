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
            searchValue={search}
            onSearchChange={setSearch}
            onAdd={() => {}}
            showAdd
          />
          <DataTable
            columns={columns}
            data={mockCategories}
            onEdit={(cat) => console.log(cat)}
            onDelete={(cat) => console.log(cat)}
          />
          <Pagination total={1} value={page} onChange={setPage} mt="md" />
        </Paper>
      </Container>
    </AdminLayout>
  );
}

export default MasterCategoryPage;
