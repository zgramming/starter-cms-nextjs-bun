import {
  Modal,
  TextInput,
  Textarea,
  Switch,
  Button,
  Group,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface Parameter {
  id?: string;
  code: string;
  name: string;
  value: string;
  description?: string;
  data_type: string;
  status: boolean;
}

interface ParameterFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: Parameter) => void;
  initialData?: Parameter | null;
}

const DATA_TYPES = [
  { value: "string", label: "String" },
  { value: "int", label: "Integer" },
  { value: "float", label: "Float" },
  { value: "boolean", label: "Boolean" },
  { value: "json", label: "JSON" },
];

export default function ParameterForm({
  opened,
  onClose,
  onSubmit,
  initialData,
}: ParameterFormProps) {
  const form = useForm<Parameter>({
    initialValues: {
      code: initialData?.code || "",
      name: initialData?.name || "",
      value: initialData?.value || "",
      description: initialData?.description || "",
      data_type: initialData?.data_type || "string",
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
      value: (value) => (!value ? "Value is required" : null),
      data_type: (value) => (!value ? "Data type is required" : null),
    },
  });

  const handleSubmit = (values: Parameter) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? "Edit Parameter" : "Add Parameter"}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Code"
          placeholder="Enter parameter code"
          required
          {...form.getInputProps("code")}
          mb="md"
        />

        <TextInput
          label="Name"
          placeholder="Enter parameter name"
          required
          {...form.getInputProps("name")}
          mb="md"
        />

        <Select
          label="Data Type"
          placeholder="Select data type"
          required
          data={DATA_TYPES}
          {...form.getInputProps("data_type")}
          mb="md"
        />

        <Textarea
          label="Value"
          placeholder="Enter parameter value"
          required
          {...form.getInputProps("value")}
          mb="md"
          minRows={3}
        />

        <Textarea
          label="Description"
          placeholder="Enter description"
          {...form.getInputProps("description")}
          mb="md"
          minRows={2}
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
