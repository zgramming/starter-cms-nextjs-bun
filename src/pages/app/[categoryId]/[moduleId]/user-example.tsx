/**
 * CONTOH IMPLEMENTASI REAL API
 * User Management dengan React Query + Mantine
 *
 * File ini adalah contoh lengkap bagaimana menggunakan API integration
 * yang sudah dikonfigurasi. Copy pattern ini ke file user.tsx Anda.
 */

import { useState } from "react";

import {
  Container,
  Paper,
  Title,
  Group,
  Badge,
  ActionIcon,
  Menu,
  Text,
  Pagination,
  Stack,
  Loader,
  Center,
  Alert,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconEdit,
  IconTrash,
  IconDots,
  IconAlertCircle,
} from "@tabler/icons-react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { DataTable } from "@/components/common/DataTable";
import { TableToolbar } from "@/components/common/TableToolbar";
import { UserForm } from "@/components/forms/UserForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks/useApi";
import { User } from "@/types";

export default function UserManagementPage() {
  return (
    <ProtectedRoute>
      <UserManagementContent />
    </ProtectedRoute>
  );
}

function UserManagementContent() {
  // State untuk UI
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);

  // React Query hooks
  const { data, isLoading, isError, error } = useUsers({
    page,
    pageSize: 10,
    search,
  });

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  // Handlers
  const handleAdd = () => {
    setOpenedAdd(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenedEdit(true);
  };

  const handleDelete = (user: User) => {
    modals.openConfirmModal({
      title: "Delete User",
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{user.name}</strong>? This
          action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteUser.mutate(user.id),
    });
  };

  const handleCreateSubmit = async (values: Partial<User>) => {
    await createUser.mutateAsync(values);
    setOpenedAdd(false);
  };

  const handleUpdateSubmit = async (values: Partial<User>) => {
    if (!selectedUser) return;
    await updateUser.mutateAsync({ id: selectedUser.id, data: values });
    setOpenedEdit(false);
    setSelectedUser(null);
  };

  // Table columns
  const columns = [
    {
      key: "name",
      label: "Name",
      render: (user: User) => (
        <div>
          <Text fw={500}>{user.name}</Text>
          <Text size="xs" c="dimmed">
            {user.email}
          </Text>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user: User) => (
        <Badge
          color={
            user.role === "admin"
              ? "red"
              : user.role === "moderator"
              ? "blue"
              : "gray"
          }
          variant="light"
        >
          {user.role}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (user: User) => (
        <Badge
          color={user.status === "active" ? "green" : "gray"}
          variant="dot"
        >
          {user.status}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (user: User) => (
        <Text size="sm">
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("id-ID")
            : "-"}
        </Text>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (user: User) => (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEdit size={16} />}
              onClick={() => handleEdit(user)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size={16} />}
              color="red"
              onClick={() => handleDelete(user)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <AdminLayout>
        <Center h={400}>
          <Stack align="center" gap="md">
            <Loader size="lg" color="green" />
            <Text c="dimmed">Loading users...</Text>
          </Stack>
        </Center>
      </AdminLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <AdminLayout>
        <Container size="lg" py="xl">
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error"
            color="red"
            variant="filled"
          >
            {error?.message || "Failed to load users. Please try again."}
          </Alert>
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container size="xl" py="xl">
        <Stack gap="lg">
          {/* Header */}
          <Group justify="space-between">
            <div>
              <Title order={2}>User Management</Title>
              <Text size="sm" c="dimmed">
                Manage users, roles, and permissions
              </Text>
            </div>
          </Group>

          {/* Table */}
          <Paper shadow="sm" radius="md" p="md">
            <Stack gap="md">
              <TableToolbar
                searchValue={search}
                onSearchChange={setSearch}
                onAdd={handleAdd}
              />

              <DataTable
                data={data?.data || []}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              {data && data.totalPages > 1 && (
                <Group justify="center" mt="md">
                  <Pagination
                    total={data.totalPages}
                    value={page}
                    onChange={setPage}
                    color="green"
                  />
                </Group>
              )}

              {data?.data.length === 0 && (
                <Center h={200}>
                  <Text c="dimmed">No users found</Text>
                </Center>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Container>

      {/* Add User Modal */}
      <UserForm
        opened={openedAdd}
        onClose={() => setOpenedAdd(false)}
        onSubmit={handleCreateSubmit}
        loading={createUser.isPending}
      />

      {/* Edit User Modal */}
      <UserForm
        opened={openedEdit}
        onClose={() => {
          setOpenedEdit(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSubmit={handleUpdateSubmit}
        loading={updateUser.isPending}
      />
    </AdminLayout>
  );
}
