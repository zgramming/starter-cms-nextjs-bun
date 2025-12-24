import {
  Modal,
  TextInput,
  Textarea,
  Switch,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface MasterCategory {
  id?: string;
  code: string;
  name: string;
  description?: string;
  status: boolean;
}

interface MasterCategoryFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: MasterCategory) => void;
  initialData?: MasterCategory | null;
}

export default function MasterCategoryForm({
  opened,
  onClose,
  onSubmit,
  initialData,
}: MasterCategoryFormProps) {
  const form = useForm<MasterCategory>({
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
          : value.length > 50
          ? "Code max 50 characters"
          : null,
      name: (value) =>
        !value
          ? "Name is required"
          : value.length > 100
          ? "Name max 100 characters"
          : null,
    },
  });

  const handleSubmit = (values: MasterCategory) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? "Edit Master Category" : "Add Master Category"}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Code"
          placeholder="Enter category code"
          required
          {...form.getInputProps("code")}
          mb="md"
        />

        <TextInput
          label="Name"
          placeholder="Enter category name"
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
