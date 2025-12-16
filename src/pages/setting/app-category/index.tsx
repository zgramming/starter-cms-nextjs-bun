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

interface ApplicationCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  status: boolean;
  order: number;
}

const mockCategories: ApplicationCategory[] = [
  {
    id: "1",
    name: "Setting",
    description: "System settings and configuration",
    icon: "settings",
    status: true,
    order: 1,
  },
];

function AppCategoryPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalRecords = mockCategories.length;

  const columns: Column<ApplicationCategory>[] = [
    {
      key: "name",
      label: "Category Name",
      render: (cat) => cat.name,
    },
    {
      key: "description",
      label: "Description",
      render: (cat) => cat.description,
    },
    {
      key: "order",
      label: "Order",
      render: (cat) => cat.order,
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

  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Setting", href: "#" },
    { title: "Application Category", href: "#" },
  ];

  return (
    <AdminLayout>
      <Container size="xl" py="md">
        <Breadcrumbs mb="md">
          {breadcrumbs.map((item, index) => (
            <Anchor href={item.href} key={index}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>

        <Title order={2} mb="lg">
          Application Category Management
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
            onEdit={(cat) => console.log("Edit:", cat)}
            onDelete={(cat) => console.log("Delete:", cat)}
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

        {/* Form will be integrated later */}
        {/* <ApplicationCategoryForm
          opened={opened}
          onClose={() => setOpened(false)}
          onSubmit={handleSubmit}
          initialData={selectedCategory}
          title={selectedCategory ? "Edit Category" : "Add Application Category"}
        /> */}
      </Container>
    </AdminLayout>
  );
}

export default AppCategoryPage;
