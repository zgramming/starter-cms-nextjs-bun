import { Table, ActionIcon, Group, Text, rem } from "@mantine/core";
import { IconEdit, IconTrash, IconEye } from "@tabler/icons-react";

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  showActions?: boolean;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  showActions = true,
}: DataTableProps<T>) {
  const rows = data.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      {columns.map((column) => (
        <Table.Td key={column.key}>
          {column.render
            ? column.render(item)
            : String((item as Record<string, unknown>)[column.key] || "-")}
        </Table.Td>
      ))}
      {showActions && (
        <Table.Td>
          <Group gap="xs">
            {onView && (
              <ActionIcon
                variant="subtle"
                color="blue"
                onClick={() => onView(item)}
                aria-label="View"
              >
                <IconEye style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            )}
            {onEdit && (
              <ActionIcon
                variant="subtle"
                color="yellow"
                onClick={() => onEdit(item)}
                aria-label="Edit"
              >
                <IconEdit style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            )}
            {onDelete && (
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => onDelete(item)}
                aria-label="Delete"
              >
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            )}
          </Group>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "60px" }}>No</Table.Th>
            {columns.map((column) => (
              <Table.Th key={column.key}>{column.label}</Table.Th>
            ))}
            {showActions && (
              <Table.Th style={{ width: "120px" }}>Action</Table.Th>
            )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={columns.length + (showActions ? 2 : 1)}>
                <Text ta="center" c="dimmed">
                  Tidak ada data
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
