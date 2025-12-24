import { createCrudHooks } from "@/shared/hooks/useCrudApi";
import { menuService, type Menu } from "../services/menu.service";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/types/api";
import { useMutationCallbacks } from "@/shared/utils/mutation-helpers";
import { createQueryKeys } from "@/shared/hooks/queryKeys";

const baseCrudHooks = createCrudHooks("menus", menuService);
const keys = createQueryKeys("menus");

export const useMenus = baseCrudHooks.useList;
export const useMenu = baseCrudHooks.useDetail;
export const useCreateMenu = baseCrudHooks.useCreate;
export const useUpdateMenu = baseCrudHooks.useUpdate;
export const useDeleteMenu = baseCrudHooks.useDelete;
export const useBulkDeleteMenus = baseCrudHooks.useBulkDelete;

export function useMenuTree() {
  return useQuery<Menu[], ApiError>({
    queryKey: keys.custom("tree"),
    queryFn: async () => {
      const response = await menuService.getTree();
      return response.data.data;
    },
  });
}

export function useReorderMenus() {
  const callbacks = useMutationCallbacks("menus", "reordered");
  return useMutation({
    mutationFn: (items: { id: string; order: number }[]) =>
      menuService.reorder(items),
    ...callbacks,
  });
}

export const menuHooks = {
  ...baseCrudHooks,
  useTree: useMenuTree,
  useReorder: useReorderMenus,
};
