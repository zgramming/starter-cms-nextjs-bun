import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import type { ApiError } from "@/types/api";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function useMutationCallbacks(
  resource: string,
  action: "created" | "updated" | "deleted" | "reordered" | string,
  customSuccessMessage?: string
) {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
      notifications.show({
        title: "Success",
        message:
          customSuccessMessage ||
          `${capitalize(resource)} ${action} successfully`,
        color: "green",
      });
    },
    onError: (error: ApiError) => {
      const actionVerb = action.endsWith("ed") ? action.slice(0, -1) : action;
      notifications.show({
        title: "Error",
        message: error.message || `Failed to ${actionVerb} ${resource}`,
        color: "red",
      });
    },
  };
}
