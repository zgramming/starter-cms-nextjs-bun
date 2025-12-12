import {
  TextInput,
  PasswordInput,
  Textarea,
  NumberInput,
  Select,
  MultiSelect,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ReactNode } from "react";

interface FormFieldProps {
  form: UseFormReturnType<Record<string, unknown>>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "password" | "textarea" | "number" | "select" | "multiselect";
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  data?: Array<{ value: string; label: string }>;
  rows?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  autoFocus?: boolean;
}

export function FormField({
  form,
  name,
  label,
  placeholder,
  description,
  required = false,
  disabled = false,
  type = "text",
  leftSection,
  rightSection,
  data,
  rows = 4,
  maxLength,
  min,
  max,
  autoFocus = false,
}: FormFieldProps) {
  const baseProps = {
    label,
    placeholder,
    description,
    required,
    disabled,
    withAsterisk: required,
    autoFocus,
    ...form.getInputProps(name),
  };

  if (type === "password") {
    return <PasswordInput {...baseProps} leftSection={leftSection} />;
  }

  if (type === "textarea") {
    return (
      <Textarea
        {...baseProps}
        rows={rows}
        maxLength={maxLength}
        autosize={!rows}
        minRows={rows}
      />
    );
  }

  if (type === "number") {
    return (
      <NumberInput
        {...baseProps}
        min={min}
        max={max}
        leftSection={leftSection}
        rightSection={rightSection}
      />
    );
  }

  if (type === "select") {
    return (
      <Select
        {...baseProps}
        data={data || []}
        searchable
        clearable
        leftSection={leftSection}
      />
    );
  }

  if (type === "multiselect") {
    return (
      <MultiSelect {...baseProps} data={data || []} searchable clearable />
    );
  }

  return (
    <TextInput
      {...baseProps}
      leftSection={leftSection}
      rightSection={rightSection}
      maxLength={maxLength}
    />
  );
}
