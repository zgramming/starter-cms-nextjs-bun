import { Skeleton, Stack, Box, Card, SimpleGrid, Group } from "@mantine/core";

interface LoadingStateProps {
  type?: "table" | "card" | "form" | "detail" | "grid";
  rows?: number;
  columns?: number;
}

export function LoadingState({
  type = "table",
  rows = 5,
  columns = 3,
}: LoadingStateProps) {
  if (type === "table") {
    return (
      <Stack gap="md">
        {/* Table Header */}
        <Group gap="md">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} height={40} flex={1} radius="md" />
          ))}
        </Group>

        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Group key={rowIndex} gap="md">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} height={50} flex={1} radius="md" />
            ))}
          </Group>
        ))}
      </Stack>
    );
  }

  if (type === "card") {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {Array.from({ length: rows }).map((_, i) => (
          <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Skeleton height={160} />
            </Card.Section>
            <Stack gap="md" mt="md">
              <Skeleton height={20} width="70%" />
              <Skeleton height={15} />
              <Skeleton height={15} width="90%" />
              <Skeleton height={36} mt="sm" />
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  if (type === "form") {
    return (
      <Stack gap="md">
        {Array.from({ length: rows }).map((_, i) => (
          <Box key={i}>
            <Skeleton height={15} width={100} mb={8} />
            <Skeleton height={40} radius="md" />
          </Box>
        ))}
        <Group justify="flex-end" mt="xl">
          <Skeleton height={40} width={100} radius="md" />
          <Skeleton height={40} width={100} radius="md" />
        </Group>
      </Stack>
    );
  }

  if (type === "detail") {
    return (
      <Stack gap="xl">
        <Skeleton height={40} width="40%" />
        <Stack gap="md">
          {Array.from({ length: rows }).map((_, i) => (
            <Group key={i} gap="md">
              <Skeleton height={20} width={150} />
              <Skeleton height={20} flex={1} />
            </Group>
          ))}
        </Stack>
      </Stack>
    );
  }

  if (type === "grid") {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: columns }} spacing="lg">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} height={200} radius="md" />
        ))}
      </SimpleGrid>
    );
  }

  return null;
}

// Skeleton Row for custom layouts
export function SkeletonRow({
  height = 50,
  columns = 3,
}: {
  height?: number;
  columns?: number;
}) {
  return (
    <Group gap="md">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} height={height} flex={1} radius="md" />
      ))}
    </Group>
  );
}
