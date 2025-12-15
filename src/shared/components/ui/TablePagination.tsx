import { Group, Select, Text, Button, Box } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface TablePaginationProps {
  /**
   * Current page (1-based)
   */
  page: number;
  /**
   * Total number of items
   */
  total: number;
  /**
   * Items per page
   */
  pageSize: number;
  /**
   * Options for page size
   * @default [10, 20, 50, 100]
   */
  pageSizeOptions?: number[];
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Callback when page size changes
   */
  onPageSizeChange: (size: number) => void;
  /**
   * Optional: custom label for info text
   */
  infoText?: (from: number, to: number, total: number) => string;
  /**
   * Disable previous/next if true
   */
  loading?: boolean;
}

export function TablePagination({
  page,
  total,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  infoText,
  loading,
}: TablePaginationProps) {
  const totalPages = Math.ceil(total / pageSize) || 1;
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const defaultInfo = `Showing ${from}-${to} of ${total} items`;

  return (
    <Group justify="space-between" align="center" mt="md" wrap="wrap">
      {/* Page size selector */}
      <Group gap="xs">
        <Text size="sm">Rows per page:</Text>
        <Select
          data={pageSizeOptions.map((n) => ({
            value: n.toString(),
            label: n.toString(),
          }))}
          value={pageSize.toString()}
          onChange={(val) => val && onPageSizeChange(Number(val))}
          size="xs"
          w={80}
          disabled={loading}
        />
      </Group>

      {/* Info text */}
      <Text size="sm" c="dimmed">
        {infoText ? infoText(from, to, total) : defaultInfo}
      </Text>

      {/* Prev/Next buttons */}
      <Group gap="xs">
        <Button
          variant="default"
          size="xs"
          leftSection={<IconChevronLeft size={16} />}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || loading}
        >
          Previous
        </Button>
        <Button
          variant="default"
          size="xs"
          rightSection={<IconChevronRight size={16} />}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || loading}
        >
          Next
        </Button>
      </Group>
    </Group>
  );
}
