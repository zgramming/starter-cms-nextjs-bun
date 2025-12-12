import { Box, Text, Button, Stack, Paper } from "@mantine/core";
import {
  IconFileOff,
  IconSearch,
  IconDatabaseOff,
  IconCloudOff,
  IconMoodEmpty,
} from "@tabler/icons-react";
import { ReactNode } from "react";

type EmptyStateVariant = "no-data" | "search" | "error" | "offline" | "generic";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  compact?: boolean;
}

const variantConfig: Record<
  EmptyStateVariant,
  { icon: ReactNode; title: string; description: string }
> = {
  "no-data": {
    icon: <IconDatabaseOff size={80} stroke={1.5} opacity={0.3} />,
    title: "Belum Ada Data",
    description: "Data akan muncul di sini setelah Anda menambahkannya",
  },
  search: {
    icon: <IconSearch size={80} stroke={1.5} opacity={0.3} />,
    title: "Tidak Ada Hasil",
    description: "Tidak ada data yang cocok dengan pencarian Anda",
  },
  error: {
    icon: <IconFileOff size={80} stroke={1.5} opacity={0.3} />,
    title: "Terjadi Kesalahan",
    description: "Gagal memuat data. Silakan coba lagi",
  },
  offline: {
    icon: <IconCloudOff size={80} stroke={1.5} opacity={0.3} />,
    title: "Tidak Ada Koneksi",
    description: "Periksa koneksi internet Anda dan coba lagi",
  },
  generic: {
    icon: <IconMoodEmpty size={80} stroke={1.5} opacity={0.3} />,
    title: "Kosong",
    description: "Tidak ada yang ditampilkan",
  },
};

export function EmptyState({
  variant = "no-data",
  title,
  description,
  icon,
  action,
  compact = false,
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const displayIcon = icon ?? config.icon;
  const displayTitle = title ?? config.title;
  const displayDescription = description ?? config.description;

  return (
    <Paper
      p={compact ? "xl" : "xxxl"}
      style={{
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      <Stack align="center" gap={compact ? "md" : "lg"}>
        <Box c="gray.4">{displayIcon}</Box>

        <Stack align="center" gap="xs">
          <Text size={compact ? "lg" : "xl"} fw={600} c="gray.8">
            {displayTitle}
          </Text>

          <Text size="sm" c="gray.6" ta="center" maw={400}>
            {displayDescription}
          </Text>
        </Stack>

        {action && (
          <Button
            variant="light"
            color="green"
            mt="md"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
