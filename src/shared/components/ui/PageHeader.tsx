import {
  Group,
  Title,
  Text,
  Breadcrumbs,
  Anchor,
  Box,
  Button,
  Stack,
} from "@mantine/core";
import { ReactNode } from "react";
import Link from "next/link";

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    variant?: "filled" | "light" | "outline";
  };
  extra?: ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
  extra,
}: PageHeaderProps) {
  return (
    <Box mb="xl">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs mb="md" separator="→">
          {breadcrumbs.map((item, index) => (
            <Anchor
              key={index}
              component={Link}
              href={item.href}
              c={index === breadcrumbs.length - 1 ? "dimmed" : "blue"}
              underline={index === breadcrumbs.length - 1 ? "never" : "hover"}
            >
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
      )}

      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Stack gap="xs" style={{ flex: 1 }}>
          <Title order={1} size="h2">
            {title}
          </Title>
          {description && (
            <Text size="sm" c="dimmed" maw={600}>
              {description}
            </Text>
          )}
        </Stack>

        {(action || extra) && (
          <Group gap="md" wrap="nowrap">
            {extra}
            {action && (
              <Button
                variant={action.variant || "filled"}
                color="green"
                leftSection={action.icon}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
          </Group>
        )}
      </Group>
    </Box>
  );
}
