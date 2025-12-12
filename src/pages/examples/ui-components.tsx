// Example usage of new UI components
import { useState } from "react";
import { AdminLayout } from "@/shared/components/layout/AdminLayout";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { LoadingState } from "@/shared/components/ui/LoadingState";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
import { useToast } from "@/shared/hooks/useToast";
import { Container, Button, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function ExamplePage() {
  const [loading, setLoading] = useState(false);
  const [confirmOpened, setConfirmOpened] = useState(false);
  const toast = useToast();

  const handleDelete = () => {
    toast.success("Item deleted successfully!");
    setConfirmOpened(false);
  };

  return (
    <AdminLayout>
      <Container size="xl">
        <PageHeader
          title="Example Page"
          description="Demonstrasi penggunaan komponen UI/UX baru"
          breadcrumbs={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Examples", href: "#" },
          ]}
          action={{
            label: "Add New",
            onClick: () => toast.info("Add button clicked"),
            icon: <IconPlus size={16} />,
          }}
        />

        <Stack gap="xl">
          {/* Toggle Loading Button */}
          <Button onClick={() => setLoading(!loading)} variant="outline">
            {loading ? "Hide" : "Show"} Loading State
          </Button>

          {/* Loading State Example */}
          {loading && <LoadingState type="card" rows={4} />}

          {/* Empty State Example */}
          {!loading && (
            <EmptyState
              variant="no-data"
              action={{
                label: "Create First Item",
                onClick: () => toast.info("Create action triggered"),
              }}
            />
          )}

          {/* Confirm Modal Example */}
          <Button onClick={() => setConfirmOpened(true)}>
            Open Confirm Modal
          </Button>

          <ConfirmModal
            opened={confirmOpened}
            onClose={() => setConfirmOpened(false)}
            onConfirm={handleDelete}
            title="Delete Item"
            message="Are you sure you want to delete this item? This action cannot be undone."
            variant="delete"
            confirmLabel="Delete"
          />
        </Stack>
      </Container>
    </AdminLayout>
  );
}
