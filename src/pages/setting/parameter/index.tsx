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
  TextInput,
  Button,
} from "@mantine/core";
import { IconSearch, IconPlus } from "@tabler/icons-react";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable, type Column } from "@/shared/components/ui/DataTable";
import { TableToolbar } from "@/shared/components/ui/TableToolbar";
import type { Parameter } from "@/types/settings";
import { TablePagination } from "@/shared/components/ui/TablePagination";

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
  const [pageSize, setPageSize] = useState(10);
  const totalRecords = mockParameters.length;

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
          <DataTable columns={columns} data={mockParameters} />
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

export default ParameterPage;
