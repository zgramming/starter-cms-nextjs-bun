import { Button, type ButtonProps } from "@mantine/core";
import type { ComponentPropsWithoutRef } from "react";
import {
  IconPlus,
  IconFileImport,
  IconFileExport,
  IconTrash,
  IconEdit,
  IconRefresh,
  IconDownload,
  IconUpload,
  IconFilter,
  IconSearch,
} from "@tabler/icons-react";

type ActionButtonProps = {
  label?: string;
  iconSize?: number;
} & Omit<ButtonProps, "children" | "leftSection"> &
  Pick<ComponentPropsWithoutRef<"button">, "onClick">;

export function ButtonAdd({
  label = "Add",
  iconSize = 16,
  size = "xs",
  ...props
}: ActionButtonProps) {
  return (
    <Button leftSection={<IconPlus size={iconSize} />} size={size} {...props}>
      {label}
    </Button>
  );
}

export function ButtonImport({
  label = "Import",
  iconSize = 16,
  size = "xs",
  variant = "default",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      leftSection={<IconFileImport size={iconSize} />}
      size={size}
      variant={variant}
      {...props}
    >
      {label}
    </Button>
  );
}

export function ButtonExport({
  label = "Export",
  iconSize = 16,
  size = "xs",
  variant = "default",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      leftSection={<IconFileExport size={iconSize} />}
      size={size}
      variant={variant}
      {...props}
    >
      {label}
    </Button>
  );
}

export function ButtonDelete({
  label = "Delete",
  iconSize = 16,
  size = "xs",
  color = "red",
  variant = "light",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      leftSection={<IconTrash size={iconSize} />}
      size={size}
      color={color}
      variant={variant}
      {...props}
    >
      {label}
    </Button>
  );
}

export function ButtonEdit({
  label = "Edit",
  iconSize = 16,
  size = "xs",
  variant = "light",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      leftSection={<IconEdit size={iconSize} />}
      size={size}
      variant={variant}
      {...props}
    >
      {label}
    </Button>
  );
}

export function ButtonRefresh({
  label = "Refresh",
  iconSize = 16,
  size = "xs",
  variant = "subtle",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      leftSection={<IconRefresh size={iconSize} />}
      size={size}
      variant={variant}
      {...props}
    >
      {label}
    </Button>
  );
}

export function ButtonDownload({
  label = "Download",
  iconSize = 16,
  size = "xs",
  variant = "default",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      leftSection={<IconDownload size={iconSize} />}
      size={size}
      variant={variant}
      {...props}
    >
      {label}
    </Button>
  );
}

export function ButtonUpload({
  label = "Upload",
  iconSize = 16,
  size = "xs",
  variant = "default",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      leftSection={<IconUpload size={iconSize} />}
      size={size}
      variant={variant}
      {...props}
    >
      {label}
    </Button>
  );
}

export function ButtonFilter({
  label = "Filter",
  iconSize = 16,
  size = "xs",
  variant = "default",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      leftSection={<IconFilter size={iconSize} />}
      size={size}
      variant={variant}
      {...props}
    >
      {label}
    </Button>
  );
}

export function ButtonSearch({
  label = "Search",
  iconSize = 16,
  size = "xs",
  ...props
}: ActionButtonProps) {
  return (
    <Button leftSection={<IconSearch size={iconSize} />} size={size} {...props}>
      {label}
    </Button>
  );
}
