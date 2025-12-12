import { Modal, Switch, Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

interface AccessModule {
  id?: string;
  user_id: string;
  module_id: string;
  status: boolean;
}

interface AccessModuleFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: AccessModule) => void;
  initialData?: AccessModule | null;
  users?: Array<{ value: string; label: string }>;
  modules?: Array<{ value: string; label: string }>;
}

export default function AccessModuleForm({
  opened,
  onClose,
  onSubmit,
  initialData,
  users = [],
  modules = [],
}: AccessModuleFormProps) {
  const form = useForm<AccessModule>({
    initialValues: {
      user_id: initialData?.user_id || "",
      module_id: initialData?.module_id || "",
      status: initialData?.status ?? true,
    },
    validate: {
      user_id: (value) => (!value ? "User is required" : null),
      module_id: (value) => (!value ? "Module is required" : null),
    },
  });

  const handleSubmit = (values: AccessModule) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? "Edit Access Module" : "Add Access Module"}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="User"
          placeholder="Select user"
          required
          data={users}
          {...form.getInputProps("user_id")}
          mb="md"
          searchable
        />

        <Select
          label="Module"
          placeholder="Select module"
          required
          data={modules}
          {...form.getInputProps("module_id")}
          mb="md"
          searchable
        />

        <Switch
          label="Active"
          {...form.getInputProps("status", { type: "checkbox" })}
          mb="md"
        />

        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Update" : "Create"}</Button>
        </Group>
      </form>
    </Modal>
  );
}
