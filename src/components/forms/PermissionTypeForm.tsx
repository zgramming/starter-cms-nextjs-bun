import {
  Modal,
  TextInput,
  Textarea,
  Switch,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface PermissionType {
  id?: string;
  code: string;
  name: string;
  description?: string;
  status: boolean;
}

interface PermissionTypeFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: PermissionType) => void;
  initialData?: PermissionType | null;
}

export default function PermissionTypeForm({
  opened,
  onClose,
  onSubmit,
  initialData,
}: PermissionTypeFormProps) {
  const form = useForm<PermissionType>({
    initialValues: {
      code: initialData?.code || "",
      name: initialData?.name || "",
      description: initialData?.description || "",
      status: initialData?.status ?? true,
    },
    validate: {
      code: (value) =>
        !value
          ? "Code is required"
          : value.length > 20
          ? "Code max 20 characters"
          : null,
      name: (value) =>
        !value
          ? "Name is required"
          : value.length > 50
          ? "Name max 50 characters"
          : null,
    },
  });

  const handleSubmit = (values: PermissionType) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? "Edit Permission Type" : "Add Permission Type"}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Code"
          placeholder="Enter permission code (e.g., VIEW, ADD, EDIT)"
          required
          {...form.getInputProps("code")}
          mb="md"
        />

        <TextInput
          label="Name"
          placeholder="Enter permission name"
          required
          {...form.getInputProps("name")}
          mb="md"
        />

        <Textarea
          label="Description"
          placeholder="Enter description"
          {...form.getInputProps("description")}
          mb="md"
          minRows={3}
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
