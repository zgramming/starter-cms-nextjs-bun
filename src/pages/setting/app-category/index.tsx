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
  const pageSize = 10;

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
            searchValue={search}
            onSearchChange={setSearch}
            onAdd={() => console.log("Add")}
            showAdd={true}
          />

          <DataTable
            columns={columns}
            data={mockCategories}
            onEdit={(cat) => console.log("Edit:", cat)}
            onDelete={(cat) => console.log("Delete:", cat)}
          />

          <Pagination
            total={Math.ceil(mockCategories.length / pageSize)}
            value={page}
            onChange={setPage}
            mt="md"
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
