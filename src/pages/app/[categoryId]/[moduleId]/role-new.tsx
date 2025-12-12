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
import { RoleForm } from "@/components/forms/RoleForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  useRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
} from "@/hooks/useApi";
import { Role } from "@/types";

function RoleManagementContent() {
  // State untuk UI
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);

  // React Query hooks
  const { data, isLoading, isError, error } = useRoles({
    page,
    pageSize: 10,
    search,
  });

  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();

  // Handlers
  const handleAdd = () => {
    setOpenedAdd(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setOpenedEdit(true);
  };

  const handleDelete = (role: Role) => {
    modals.openConfirmModal({
      title: "Delete Role",
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{role.name}</strong>? This
          action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteRole.mutate(role.id),
    });
  };

  const handleCreateSubmit = async (values: Partial<Role>) => {
    await createRole.mutateAsync(values);
    setOpenedAdd(false);
  };

  const handleUpdateSubmit = async (values: Partial<Role>) => {
    if (!selectedRole) return;
    await updateRole.mutateAsync({ id: selectedRole.id, data: values });
    setOpenedEdit(false);
    setSelectedRole(null);
  };

  // Table columns
  const columns = [
    {
      key: "name",
      label: "Role Name",
      render: (role: Role) => (
        <div>
          <Text fw={500}>{role.name}</Text>
          <Text size="xs" c="dimmed">
            {role.description}
          </Text>
        </div>
      ),
    },
    {
      key: "permissions",
      label: "Permissions",
      render: (role: Role) => (
        <Group gap="xs">
          {role.permissions && role.permissions.length > 0 ? (
            <>
              <Badge variant="light" color="blue">
                {role.permissions.length} permissions
              </Badge>
              {role.permissions[0] === "*" && (
                <Badge variant="filled" color="red">
                  Full Access
                </Badge>
              )}
            </>
          ) : (
            <Text size="sm" c="dimmed">
              No permissions
            </Text>
          )}
        </Group>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (role: Role) => (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEdit size={16} />}
              onClick={() => handleEdit(role)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size={16} />}
              color="red"
              onClick={() => handleDelete(role)}
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
            <Text c="dimmed">Loading roles...</Text>
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
            {error?.message || "Failed to load roles. Please try again."}
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
              <Title order={2}>Role Management</Title>
              <Text size="sm" c="dimmed">
                Manage roles and permissions
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
                  <Text c="dimmed">No roles found</Text>
                </Center>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Container>

      {/* Add Role Modal */}
      <RoleForm
        opened={openedAdd}
        onClose={() => setOpenedAdd(false)}
        onSubmit={handleCreateSubmit}
        loading={createRole.isPending}
      />

      {/* Edit Role Modal */}
      <RoleForm
        opened={openedEdit}
        onClose={() => {
          setOpenedEdit(false);
          setSelectedRole(null);
        }}
        role={selectedRole}
        onSubmit={handleUpdateSubmit}
        loading={updateRole.isPending}
      />
    </AdminLayout>
  );
}

export default function RoleManagementPage() {
  return (
    <ProtectedRoute>
      <RoleManagementContent />
    </ProtectedRoute>
  );
}
