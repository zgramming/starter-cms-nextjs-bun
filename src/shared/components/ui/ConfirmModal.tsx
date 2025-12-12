import { Modal, Button, Group, Text, Stack } from "@mantine/core";
import { IconAlertTriangle, IconTrash } from "@tabler/icons-react";

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "delete" | "warning" | "info";
  loading?: boolean;
}

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "info",
  loading = false,
}: ConfirmModalProps) {
  const variantConfig = {
    delete: {
      color: "red",
      icon: <IconTrash size={48} />,
    },
    warning: {
      color: "yellow",
      icon: <IconAlertTriangle size={48} />,
    },
    info: {
      color: "blue",
      icon: <IconAlertTriangle size={48} />,
    },
  };

  const config = variantConfig[variant];

  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Stack gap="lg">
        <Group gap="md">
          <div style={{ color: `var(--mantine-color-${config.color}-6)` }}>
            {config.icon}
          </div>
          <Text flex={1}>{message}</Text>
        </Group>

        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button color={config.color} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
