import { Modal, Switch, Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

interface AccessCategory {
  id?: string;
  user_id: string;
  category_id: string;
  status: boolean;
}

interface AccessCategoryFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: AccessCategory) => void;
  initialData?: AccessCategory | null;
  users?: Array<{ value: string; label: string }>;
  categories?: Array<{ value: string; label: string }>;
}

export default function AccessCategoryForm({
  opened,
  onClose,
  onSubmit,
  initialData,
  users = [],
  categories = [],
}: AccessCategoryFormProps) {
  const form = useForm<AccessCategory>({
    initialValues: {
      user_id: initialData?.user_id || "",
      category_id: initialData?.category_id || "",
      status: initialData?.status ?? true,
    },
    validate: {
      user_id: (value) => (!value ? "User is required" : null),
      category_id: (value) => (!value ? "Category is required" : null),
    },
  });

  const handleSubmit = (values: AccessCategory) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? "Edit Access Category" : "Add Access Category"}
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
          label="Category"
          placeholder="Select category"
          required
          data={categories}
          {...form.getInputProps("category_id")}
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
