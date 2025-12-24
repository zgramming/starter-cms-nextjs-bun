import { createCrudHooks } from "@/shared/hooks/useCrudApi";
import { categoryService, type Category } from "../services/category.service";
import { useQuery } from "@tanstack/react-query";
import type { ApiError } from "@/types/api";
import { createQueryKeys } from "@/shared/hooks/queryKeys";

const baseCrudHooks = createCrudHooks("categories", categoryService);
const keys = createQueryKeys("categories");

export const useCategories = baseCrudHooks.useList;
export const useCategory = baseCrudHooks.useDetail;
export const useCreateCategory = baseCrudHooks.useCreate;
export const useUpdateCategory = baseCrudHooks.useUpdate;
export const useDeleteCategory = baseCrudHooks.useDelete;
export const useBulkDeleteCategories = baseCrudHooks.useBulkDelete;

export function useCategoryTree() {
  return useQuery<Category[], ApiError>({
    queryKey: keys.custom("tree"),
    queryFn: async () => {
      const response = await categoryService.getTree();
      return response.data.data;
    },
  });
}

export const categoryHooks = {
  ...baseCrudHooks,
  useTree: useCategoryTree,
};
