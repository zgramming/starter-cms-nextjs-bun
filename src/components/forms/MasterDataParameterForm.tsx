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

interface MasterDataParameter {
  id?: string;
  master_data_id: string;
  key: string;
  value: string;
  description?: string;
  status: boolean;
}

interface MasterDataParameterFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: MasterDataParameter) => void;
  initialData?: MasterDataParameter | null;
  masterDataList?: Array<{ value: string; label: string }>;
}

export default function MasterDataParameterForm({
  opened,
  onClose,
  onSubmit,
  initialData,
  masterDataList = [],
}: MasterDataParameterFormProps) {
  const form = useForm<MasterDataParameter>({
    initialValues: {
      master_data_id: initialData?.master_data_id || "",
      key: initialData?.key || "",
      value: initialData?.value || "",
      description: initialData?.description || "",
      status: initialData?.status ?? true,
    },
    validate: {
      master_data_id: (value) => (!value ? "Master Data is required" : null),
      key: (value) =>
        !value
          ? "Key is required"
          : value.length > 100
          ? "Key max 100 characters"
          : null,
      value: (value) => (!value ? "Value is required" : null),
    },
  });

  const handleSubmit = (values: MasterDataParameter) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        initialData ? "Edit Master Data Parameter" : "Add Master Data Parameter"
      }
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Master Data"
          placeholder="Select master data"
          required
          data={masterDataList}
          {...form.getInputProps("master_data_id")}
          mb="md"
          searchable
        />

        <TextInput
          label="Key"
          placeholder="Enter parameter key"
          required
          {...form.getInputProps("key")}
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
