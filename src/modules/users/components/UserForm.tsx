import { Modal, TextInput, Select, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { User } from "@/types/user";
import {
  validationRules,
  composeValidators,
} from "@/shared/utils/validation-rules";

interface UserFormProps {
  opened: boolean;
  onClose: () => void;
  user?: User | null;
  onSubmit: (values: Partial<User>) => Promise<void>;
  loading?: boolean;
}

export function UserForm({
  opened,
  onClose,
  user,
  onSubmit,
  loading,
}: UserFormProps) {
  const form = useForm({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || ("user" as User["role"]),
      status: user?.status || ("active" as User["status"]),
    },
    validate: {
      name: composeValidators(
        validationRules.required("Name"),
        validationRules.minLength(2)
      ),
      email: composeValidators(
        validationRules.required("Email"),
        validationRules.email
      ),
      role: validationRules.required("Role"),
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
      title={user ? "Edit User" : "Add New User"}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Name"
            placeholder="Enter user name"
            required
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Email"
            placeholder="user@example.com"
            required
            type="email"
            {...form.getInputProps("email")}
          />

          <Select
            label="Role"
            placeholder="Select role"
            required
            data={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
              { value: "moderator", label: "Moderator" },
            ]}
            {...form.getInputProps("role")}
          />

          <Select
            label="Status"
            placeholder="Select status"
            required
            data={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            {...form.getInputProps("status")}
          />

          <Button type="submit" loading={loading} fullWidth>
            {user ? "Update" : "Create"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
