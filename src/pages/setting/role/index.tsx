import { useState } from "react";
import Head from "next/head";
import {
  Container,
  Title,
  Breadcrumbs,
  Anchor,
  Paper,
  Badge,
  TextInput,
  Button,
} from "@mantine/core";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable, type Column } from "@/shared/components/ui/DataTable";
import { TableToolbar } from "@/shared/components/ui/TableToolbar";
import { TablePagination } from "@/shared/components/ui/TablePagination";
import type { Role } from "@/types/user";
import {
  IconSearch,
  IconPlus,
  IconFileExport,
  IconFileImport,
} from "@tabler/icons-react";

// Dummy data for UI preview
const dummyRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access",
    permissions: ["*"],
  },
  {
    id: "2",
    name: "Admin",
    description: "Administrative access",
    permissions: ["user.read", "user.write", "role.read"],
  },
  {
    id: "3",
    name: "User",
    description: "Basic user access",
    permissions: ["user.read"],
  },
];

function RolePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: Column<Role>[] = [
    {
      key: "name",
      label: "Role Name",
      render: (role) => role.name,
    },
    {
      key: "description",
      label: "Description",
      render: (role) => role.description,
    },
    {
      key: "permissions",
      label: "Permissions",
      render: (role) => (
        <Badge color="blue">{role.permissions.length} permissions</Badge>
      ),
    },
  ];

  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Setting", href: "#" },
    { title: "Role", href: "#" },
  ];

  const roles = dummyRoles;
  const totalRecords = roles.length;

  return (
    <>
      <Head>
        <title>Role Management | Admin</title>
      </Head>
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
            Role Management
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
                <>
                  <Button
                    variant="default"
                    leftSection={
                      <IconFileImport style={{ width: 16, height: 16 }} />
                    }
                    size="xs"
                  >
                    Import
                  </Button>
                  <Button
                    variant="default"
                    leftSection={
                      <IconFileExport style={{ width: 16, height: 16 }} />
                    }
                    size="xs"
                  >
                    Export
                  </Button>
                  <Button
                    leftSection={<IconPlus style={{ width: 16, height: 16 }} />}
                    size="xs"
                    onClick={() => console.log("Add role")}
                  >
                    Tambah
                  </Button>
                </>
              }
            />

            <DataTable
              columns={columns}
              data={roles}
              onEdit={(role) => console.log("Edit:", role)}
              onDelete={(role) => console.log("Delete:", role)}
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
    </>
  );
}

export default RolePage;
