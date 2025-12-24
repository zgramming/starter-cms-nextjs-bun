import { Skeleton, Table } from "@mantine/core";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <Table.Th key={columnIndex}>
              <Skeleton height={20} />
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Table.Tr key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Table.Td key={colIndex}>
                <Skeleton height={16} />
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
