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

interface MasterData {
  id: string;
  category_id: string;
  category_name: string;
  code: string;
  name: string;
  value: string;
  status: boolean;
}

const mockMasterData: MasterData[] = [
  {
    id: "1",
    category_id: "1",
    category_name: "Status",
    code: "ACT",
    name: "Active",
    value: "1",
    status: true,
  },
];

function MasterDataPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const columns: Column<MasterData>[] = [
    {
      key: "category",
      label: "Category",
      render: (data) => <Badge>{data.category_name}</Badge>,
    },
    {
      key: "code",
      label: "Code",
      render: (data) => <Badge variant="outline">{data.code}</Badge>,
    },
    { key: "name", label: "Name", render: (data) => data.name },
    { key: "value", label: "Value", render: (data) => data.value },
    {
      key: "status",
      label: "Status",
      render: (data) => (
        <Badge color={data.status ? "green" : "gray"}>
          {data.status ? "Active" : "Inactive"}
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
          <Anchor href="#">Master Data</Anchor>
        </Breadcrumbs>
        <Title order={2} mb="lg">
          Master Data Management
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
            data={mockMasterData}
            onEdit={(data) => console.log(data)}
            onDelete={(data) => console.log(data)}
          />
          <Pagination total={1} value={page} onChange={setPage} mt="md" />
        </Paper>
      </Container>
    </AdminLayout>
  );
}

export default MasterDataPage;
