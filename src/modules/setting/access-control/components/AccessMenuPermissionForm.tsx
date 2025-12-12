import { Modal, Switch, Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

interface AccessMenuPermission {
  id?: string;
  access_menu_id: string;
  permission_type_id: string;
  status: boolean;
}

interface AccessMenuPermissionFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: AccessMenuPermission) => void;
  initialData?: AccessMenuPermission | null;
  accessMenus?: Array<{ value: string; label: string }>;
  permissionTypes?: Array<{ value: string; label: string }>;
}

export default function AccessMenuPermissionForm({
  opened,
  onClose,
  onSubmit,
  initialData,
  accessMenus = [],
  permissionTypes = [],
}: AccessMenuPermissionFormProps) {
  const form = useForm<AccessMenuPermission>({
    initialValues: {
      access_menu_id: initialData?.access_menu_id || "",
      permission_type_id: initialData?.permission_type_id || "",
      status: initialData?.status ?? true,
    },
    validate: {
      access_menu_id: (value) => (!value ? "Access Menu is required" : null),
      permission_type_id: (value) =>
        !value ? "Permission Type is required" : null,
    },
  });

  const handleSubmit = (values: AccessMenuPermission) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        initialData
          ? "Edit Access Menu Permission"
          : "Add Access Menu Permission"
      }
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Access Menu"
          placeholder="Select access menu"
          required
          data={accessMenus}
          {...form.getInputProps("access_menu_id")}
          mb="md"
          searchable
        />

        <Select
          label="Permission Type"
          placeholder="Select permission type"
          required
          data={permissionTypes}
          {...form.getInputProps("permission_type_id")}
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
