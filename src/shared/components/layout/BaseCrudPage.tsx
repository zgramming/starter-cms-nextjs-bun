import { ReactNode } from "react";
import { Stack, Title, Group, Button, Paper, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ErrorState } from "@/shared/components/ui/ErrorState";
import { TableSkeleton } from "@/shared/components/ui/TableSkeleton";

interface BaseCrudPageProps {
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  onCreateClick?: () => void;
  createButtonLabel?: string;
  headerActions?: ReactNode;
  children: ReactNode;
  withPaper?: boolean;
  paperProps?: React.ComponentProps<typeof Paper>;
}

interface BaseCrudPageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

interface BaseCrudPageContentProps {
  isLoading?: boolean;
  loadingSkeleton?: ReactNode;
  children: ReactNode;
  withPaper?: boolean;
  paperProps?: React.ComponentProps<typeof Paper>;
}

export function BaseCrudPageHeader({
  title,
  subtitle,
  actions,
}: BaseCrudPageHeaderProps) {
  return (
    <Group justify="space-between" align="flex-start">
      <Stack gap={4}>
        <Title order={2}>{title}</Title>
        {subtitle && (
          <Text c="dimmed" size="sm">
            {subtitle}
          </Text>
        )}
      </Stack>
      {actions && <Group>{actions}</Group>}
    </Group>
  );
}

export function BaseCrudPageContent({
  isLoading,
  loadingSkeleton,
  children,
  withPaper = true,
  paperProps = {},
}: BaseCrudPageContentProps) {
  const content = isLoading
    ? loadingSkeleton || <TableSkeleton rows={5} columns={4} />
    : children;

  if (withPaper) {
    return (
      <Paper shadow="xs" p="md" radius="md" {...paperProps}>
        {content}
      </Paper>
    );
  }

  return <>{content}</>;
}

export function BaseCrudPage({
  title,
  subtitle,
  isLoading = false,
  isError = false,
  error = null,
  onRetry,
  onCreateClick,
  createButtonLabel = "Add New",
  headerActions,
  children,
  withPaper = true,
  paperProps,
}: BaseCrudPageProps) {
  if (isError) {
    return (
      <ErrorState
        title="Failed to load data"
        message={error?.message || "An error occurred"}
        onRetry={onRetry}
      />
    );
  }

  return (
    <Stack gap="md">
      {title && (
        <BaseCrudPageHeader
          title={title}
          subtitle={subtitle}
          actions={
            <>
              {headerActions}
              {onCreateClick && (
                <Button
                  leftSection={<IconPlus size={16} />}
                  onClick={onCreateClick}
                >
                  {createButtonLabel}
                </Button>
              )}
            </>
          }
        />
      )}

      <BaseCrudPageContent
        isLoading={isLoading}
        withPaper={withPaper}
        paperProps={paperProps}
      >
        {children}
      </BaseCrudPageContent>
    </Stack>
  );
}

BaseCrudPage.Header = BaseCrudPageHeader;
BaseCrudPage.Content = BaseCrudPageContent;
