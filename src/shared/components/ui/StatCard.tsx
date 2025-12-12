import { Paper, Text, Group, Stack } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  subtitle,
}: StatCardProps) {
  return (
    <Paper
      p="xl"
      radius="lg"
      style={{
        background: "white",
        border: "1px solid #f1f3f5",
        transition: "all 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <Group justify="space-between" mb="md">
        <Text size="sm" c="dimmed" fw={500}>
          {title}
        </Text>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "linear-gradient(135deg, #40c057 0%, #2f9e44 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {icon}
        </div>
      </Group>

      <Stack gap={4}>
        <Text size="32px" fw={700} lh={1.2}>
          {value}
        </Text>

        <Group gap="xs">
          {trend && (
            <Group gap={4}>
              {trend.isPositive ? (
                <IconTrendingUp size={16} color="#40c057" />
              ) : (
                <IconTrendingDown size={16} color="#fa5252" />
              )}
              <Text
                size="sm"
                fw={600}
                c={trend.isPositive ? "#40c057" : "#fa5252"}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </Text>
            </Group>
          )}
          {subtitle && (
            <Text size="xs" c="dimmed">
              {subtitle}
            </Text>
          )}
        </Group>
      </Stack>
    </Paper>
  );
}
