import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

interface DeleteConfirmOptions {
  title: string;
  message?: string;
  itemName?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function openDeleteConfirm({
  title,
  message,
  itemName,
  onConfirm,
  onCancel,
}: DeleteConfirmOptions) {
  modals.openConfirmModal({
    title,
    children: (
      <Text size="sm">
        {message ||
          (itemName ? (
            <>
              Are you sure you want to delete <strong>{itemName}</strong>?
              <br />
              This action cannot be undone.
            </>
          ) : (
            "Are you sure you want to delete this item? This action cannot be undone."
          ))}
      </Text>
    ),
    labels: { confirm: "Delete", cancel: "Cancel" },
    confirmProps: { color: "red" },
    onConfirm,
    onCancel,
  });
}

// Usage example:
// openDeleteConfirm({
//   title: 'Delete User',
//   itemName: user.name,
//   onConfirm: () => deleteUser.mutate(user.id),
// });
