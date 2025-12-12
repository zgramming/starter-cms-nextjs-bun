import { Modal, Switch, Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

interface AccessMenu {
  id?: string;
  user_id: string;
  menu_id: string;
  status: boolean;
}

interface AccessMenuFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: AccessMenu) => void;
  initialData?: AccessMenu | null;
  users?: Array<{ value: string; label: string }>;
  menus?: Array<{ value: string; label: string }>;
}

export default function AccessMenuForm({
  opened,
  onClose,
  onSubmit,
  initialData,
  users = [],
  menus = [],
}: AccessMenuFormProps) {
  const form = useForm<AccessMenu>({
    initialValues: {
      user_id: initialData?.user_id || "",
      menu_id: initialData?.menu_id || "",
      status: initialData?.status ?? true,
    },
    validate: {
      user_id: (value) => (!value ? "User is required" : null),
      menu_id: (value) => (!value ? "Menu is required" : null),
    },
  });

  const handleSubmit = (values: AccessMenu) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? "Edit Access Menu" : "Add Access Menu"}
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
          label="Menu"
          placeholder="Select menu"
          required
          data={menus}
          {...form.getInputProps("menu_id")}
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
