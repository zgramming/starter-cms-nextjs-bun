import {
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  Switch,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface ApplicationCategory {
  id?: string;
  code: string;
  name: string;
  description?: string;
  order_index: number;
  route?: string;
  icon?: string;
  status: boolean;
}

interface ApplicationCategoryFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: ApplicationCategory) => void;
  initialData?: ApplicationCategory | null;
}

export default function ApplicationCategoryForm({
  opened,
  onClose,
  onSubmit,
  initialData,
}: ApplicationCategoryFormProps) {
  const form = useForm<ApplicationCategory>({
    initialValues: {
      code: initialData?.code || "",
      name: initialData?.name || "",
      description: initialData?.description || "",
      order_index: initialData?.order_index || 0,
      route: initialData?.route || "",
      icon: initialData?.icon || "",
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
      route: (value) =>
        value && value.length > 255 ? "Route max 255 characters" : null,
      icon: (value) =>
        value && value.length > 100 ? "Icon max 100 characters" : null,
    },
  });

  const handleSubmit = (values: ApplicationCategory) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        initialData ? "Edit Application Category" : "Add Application Category"
      }
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

        <NumberInput
          label="Order Index"
          placeholder="Enter order index"
          {...form.getInputProps("order_index")}
          mb="md"
          min={0}
        />

        <TextInput
          label="Route"
          placeholder="Enter route (e.g., /dashboard)"
          {...form.getInputProps("route")}
          mb="md"
        />

        <TextInput
          label="Icon"
          placeholder="Enter icon name"
          {...form.getInputProps("icon")}
          mb="md"
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
