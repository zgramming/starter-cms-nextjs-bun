import { useState } from "react";
import {
  Container,
  Title,
  Breadcrumbs,
  Anchor,
  Pagination,
  Paper,
  Badge,
  Loader,
  Center,
  Alert,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconAlertCircle } from "@tabler/icons-react";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { DataTable, type Column } from "@/shared/components/ui/DataTable";
import { TableToolbar } from "@/shared/components/ui/TableToolbar";
import { UserForm } from "@/modules/setting/user/components/UserForm";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/modules/setting/user/hooks/useUsers";
import type { User } from "@/types/user";

function UserManagementPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);

  const { data, isLoading, isError, error } = useUsers({
    page,
    pageSize: 10,
    search,
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
        { ...selectedUser, ...values },
        {
          onSuccess: () => setOpenedEdit(false),
        }
      );
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <Container size="xl" py="md">
          <Center h={400}>
            <Loader size="lg" />
          </Center>
        </Container>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <Container size="xl" py="md">
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
            {error?.message || "Failed to load users"}
          </Alert>
        </Container>
      </AdminLayout>
    );
  }

  const users = data?.data || [];
  const totalPages = Math.ceil(
    (data?.totalRecords || 0) / (data?.pageSize || 10)
  );

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
            searchValue={search}
            onSearchChange={setSearch}
            onAdd={handleAdd}
            showAdd={true}
          />

          <DataTable
            columns={columns}
            data={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            total={totalPages}
            value={page}
            onChange={setPage}
            mt="md"
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
  );
}

export default UserManagementPage;
