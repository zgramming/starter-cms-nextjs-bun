import { useState } from "react";
import {
  Container,
  Title,
  Breadcrumbs,
  Anchor,
  Pagination,
  Paper,
  Badge,
  Code,
} from "@mantine/core";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable, type Column } from "@/shared/components/ui/DataTable";
import { TableToolbar } from "@/shared/components/ui/TableToolbar";
import type { Parameter } from "@/types/settings";

const mockParameters: Parameter[] = [
  {
    id: "1",
    key: "APP_NAME",
    value: "CMS Admin",
    type: "string",
    description: "Application name",
  },
  {
    id: "2",
    key: "MAX_UPLOAD_SIZE",
    value: "10485760",
    type: "number",
    description: "Maximum file upload size in bytes",
  },
];

function ParameterPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const columns: Column<Parameter>[] = [
    {
      key: "key",
      label: "Parameter Key",
      render: (param) => <Code>{param.key}</Code>,
    },
    { key: "value", label: "Value", render: (param) => param.value },
    {
      key: "type",
      label: "Type",
      render: (param) => (
        <Badge variant="light" color="blue">
          {param.type}
        </Badge>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (param) => param.description || "-",
    },
  ];

  return (
    <AdminLayout>
      <Container size="xl" py="md">
        <Breadcrumbs mb="md">
          <Anchor href="/dashboard">Dashboard</Anchor>
          <Anchor href="#">Setting</Anchor>
          <Anchor href="#">Parameter</Anchor>
        </Breadcrumbs>
        <Title order={2} mb="lg">
          System Parameter Management
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
            data={mockParameters}
            onEdit={(param) => console.log(param)}
            onDelete={(param) => console.log(param)}
          />
          <Pagination total={1} value={page} onChange={setPage} mt="md" />
        </Paper>
      </Container>
    </AdminLayout>
  );
}

export default ParameterPage;
