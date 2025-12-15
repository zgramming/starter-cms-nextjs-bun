import {
  Alert,
  Stack,
  Button,
  Text,
  type MantineStyleProp,
} from "@mantine/core";
import { IconAlertCircle, IconRefresh } from "@tabler/icons-react";

interface ErrorStateProps {
  /**
   * Error title
   * @default "Error"
   */
  title?: string;
  /**
   * Error message to display
   */
  message?: string;
  /**
   * Optional retry callback
   */
  onRetry?: () => void;
  /**
   * Color of the alert
   * @default "red"
   */
  color?: string;
  /**
   * Custom styles for the container
   */
  style?: MantineStyleProp;
}

/**
 * Minimalist error state component
 * Menampilkan error alert dengan optional retry button
 */
export function ErrorState({
  title = "Error",
  message,
  onRetry,
  color = "red",
  style,
}: ErrorStateProps) {
  return (
    <Alert
      icon={<IconAlertCircle size={20} />}
      title={title}
      color={color}
      style={style}
    >
      <Stack gap="md">
        <Text size="sm">
          {message || "Something went wrong. Please try again."}
        </Text>
        {onRetry && (
          <Button
            variant="light"
            color={color}
            size="sm"
            leftSection={<IconRefresh size={16} />}
            onClick={onRetry}
            w="fit-content"
          >
            Retry
          </Button>
        )}
      </Stack>
    </Alert>
  );
}
