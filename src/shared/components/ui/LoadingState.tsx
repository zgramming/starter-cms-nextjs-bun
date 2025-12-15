import {
  Center,
  Stack,
  Loader,
  Text,
  Skeleton,
  Card,
  SimpleGrid,
  Group,
  Box,
  type MantineStyleProp,
} from "@mantine/core";

interface LoadingStateProps {
  /**
   * Type of loading state to display
   * - "spinner": Simple centered spinner with optional message
   * - "table": Skeleton loading for table
   * - "card": Skeleton loading for card grid
   * - "form": Skeleton loading for form
   * @default "spinner"
   */
  type?: "spinner" | "table" | "card" | "form" | "detail" | "grid";
  /**
   * Height of the spinner container (only for type="spinner")
   * @default 400
   */
  height?: number | string;
  /**
   * Size of the loader (only for type="spinner")
   * @default "lg"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Optional loading message (only for type="spinner")
   */
  message?: string;
  /**
   * Number of rows/items to show in skeleton
   * @default 5
   */
  rows?: number;
  /**
   * Number of columns to show in skeleton
   * @default 3
   */
  columns?: number;
  /**
   * Custom styles for the container
   */
  style?: MantineStyleProp;
}

/**
 * Minimalist loading state component
 * Support berbagai tipe loading: spinner, table skeleton, card skeleton, form skeleton
 */
export function LoadingState({
  type = "spinner",
  height = 400,
  size = "lg",
  message,
  rows = 5,
  columns = 3,
  style,
}: LoadingStateProps) {
  // Simple spinner loading
  if (type === "spinner") {
    return (
      <Center h={height} style={style}>
        <Stack align="center" gap="md">
          <Loader size={size} color="green.5" />
          {message && (
            <Text size="sm" c="dimmed">
              {message}
            </Text>
          )}
        </Stack>
      </Center>
    );
  }

  // Table skeleton loading
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
