import { Group } from "@mantine/core";

interface TableToolbarProps {
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  mb?: string | number;
}

export function TableToolbar({
  leftSide,
  rightSide,
  mb = "md",
}: TableToolbarProps) {
  return (
    <Group justify="space-between" align="center" mb={mb} wrap="wrap">
      <Group gap="xs">{leftSide}</Group>
      <Group gap="xs">{rightSide}</Group>
    </Group>
  );
}
