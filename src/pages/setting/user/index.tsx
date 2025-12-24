import { useState } from "react";
import Head from "next/head";
import {
  Container,
  Title,
  Breadcrumbs,
  Anchor,
  Paper,
  Badge,
  Select,
  TextInput,
  Button,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable, type Column } from "@/shared/components/ui/DataTable";
import { TableToolbar } from "@/shared/components/ui/TableToolbar";
import { UserForm } from "@/modules/users/components/UserForm";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/modules/users/hooks/useUsers";
import type { User } from "@/types/user";
import { TablePagination } from "@/shared/components/ui/TablePagination";
import {
  IconSearch,
  IconPlus,
  IconFileExport,
  IconFileImport,
} from "@tabler/icons-react";

function UserManagementPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);

  const { data, isLoading } = useUsers({
    pageNumber: page,
    pageSize,
    searchTerm: search,
  });

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Setting", href: "#" },
    { title: "User", href: "#" },
  ];

  const handleAdd = () => {
    setSelectedUser(null);
    setOpenedAdd(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenedEdit(true);
  };

  const handleDelete = (user: User) => {
    modals.openConfirmModal({
      title: "Delete User",
      children: `Are you sure you want to delete user "${user.name}"? This action cannot be undone.`,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteMutation.mutate(user.id),
    });
  };

  const handleSubmitAdd = async (values: Partial<User>) => {
    createMutation.mutate(values as Omit<User, "id">, {
      onSuccess: () => setOpenedAdd(false),
    });
  };

  const handleSubmitEdit = async (values: Partial<User>) => {
    if (selectedUser) {
      updateMutation.mutate(
        { id: selectedUser.id, data: values },
        {
          onSuccess: () => setOpenedEdit(false),
        }
      );
    }
  };

  // if (isLoading) {
  //   return (
  //     <AdminLayout>
  //       <Container size="xl" py="md">
  //         <LoadingState message="Loading users..." />
  //       </Container>
  //     </AdminLayout>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <AdminLayout>
  //       <Container size="xl" py="md">
  //         <ErrorState
  //           title="Failed to Load Users"
  //           message={
  //             error?.message || "Unable to fetch user data. Please try again."
  //           }
  //         />
  //       </Container>
  //     </AdminLayout>
  //   );
  // }

  // Dummy data for UI preview
  const dummyUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "inactive",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      role: "user",
      status: "active",
    },
    {
      id: "4",
      name: "Emily White",
      email: "emily@example.com",
      role: "moderator",
      status: "inactive",
    },
    {
      id: "5",
      name: "David Green",
      email: "david@example.com",
      role: "admin",
      status: "active",
    },
  ];

  const users = data?.data && data.data.length > 0 ? data.data : dummyUsers;
  const totalRecords =
    data?.totalRecords && data.totalRecords > 0
      ? data.totalRecords
      : dummyUsers.length;

  const columns: Column<User>[] = [
    {
      key: "name",
      label: "Name",
      render: (user) => user.name,
    },
    {
      key: "email",
      label: "Email",
      render: (user) => user.email,
    },
    {
      key: "role",
      label: "Role",
      render: (user) => <Badge>{user.role}</Badge>,
    },
    {
      key: "status",
      label: "Status",
      render: (user) => (
        <Badge color={user.status === "active" ? "green" : "gray"}>
          {user.status || "active"}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>User Management | Admin</title>
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
            User Management
          </Title>

          <Paper shadow="xs" p="md">
            <TableToolbar
              leftSide={
                <>
                  <TextInput
                    placeholder="Cari..."
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    leftSection={
                      <IconSearch style={{ width: 16, height: 16 }} />
                    }
                    size="xs"
                    w={180}
                  />
                  <Select
                    data={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                    value={status}
                    onChange={setStatus}
                    placeholder="Status"
                    clearable
                    size="xs"
                    w={110}
                  />
                  <Select
                    data={[
                      { value: "admin", label: "Admin" },
                      { value: "user", label: "User" },
                      { value: "guest", label: "Guest" },
                    ]}
                    value={role}
                    onChange={setRole}
                    placeholder="Role"
                    clearable
                    size="xs"
                    w={110}
                  />
                </>
              }
              rightSide={
                <>
                  <Button
                    variant="default"
                    leftSection={
                      <IconFileImport style={{ width: 16, height: 16 }} />
                    }
                    size="xs"
                    // onClick={handleImport}
                  >
                    Import
                  </Button>
                  <Button
                    variant="default"
                    leftSection={
                      <IconFileExport style={{ width: 16, height: 16 }} />
                    }
                    size="xs"
                    // onClick={handleExport}
                  >
                    Export
                  </Button>
                  <Button
                    leftSection={<IconPlus style={{ width: 16, height: 16 }} />}
                    size="xs"
                    onClick={handleAdd}
                  >
                    Tambah
                  </Button>
                </>
              }
            />
            <DataTable
              columns={columns}
              data={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <TablePagination
              page={page}
              total={totalRecords}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1); // Reset to first page if page size changes
              }}
              loading={isLoading}
            />
          </Paper>

          <UserForm
            opened={openedAdd}
            onClose={() => setOpenedAdd(false)}
            onSubmit={handleSubmitAdd}
          />

          <UserForm
            opened={openedEdit}
            onClose={() => setOpenedEdit(false)}
            onSubmit={handleSubmitEdit}
          />
        </Container>
      </AdminLayout>
    </>
  );
}

export default UserManagementPage;
