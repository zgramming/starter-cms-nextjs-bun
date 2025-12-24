import { Modal, TextInput, Textarea, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Role } from "@/types/user";

interface RoleFormProps {
  opened: boolean;
  onClose: () => void;
  role?: Role | null;
  onSubmit: (values: Partial<Role>) => Promise<void>;
  loading?: boolean;
}

export function RoleForm({
  opened,
  onClose,
  role,
  onSubmit,
  loading,
}: RoleFormProps) {
  const form = useForm({
    initialValues: {
      name: role?.name || "",
      description: role?.description || "",
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
      description: (value) =>
        value.trim().length > 0 ? null : "Description is required",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await onSubmit(values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={role ? "Edit Role" : "Add New Role"}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Role Name"
            placeholder="Enter role name (e.g., Admin, User, Moderator)"
            required
            {...form.getInputProps("name")}
          />

          <Textarea
            label="Description"
            placeholder="Enter role description"
            required
            minRows={3}
            {...form.getInputProps("description")}
          />

          <Button type="submit" loading={loading} fullWidth>
            {role ? "Update Role" : "Create Role"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
