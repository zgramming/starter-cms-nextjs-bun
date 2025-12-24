import { createCrudHooks } from "@/shared/hooks/useCrudApi";
import { moduleService, type AppModule } from "../services/module.service";
import { useQuery } from "@tanstack/react-query";
import type { ApiError } from "@/types/api";
import { createQueryKeys } from "@/shared/hooks/queryKeys";

const baseCrudHooks = createCrudHooks("modules", moduleService);
const keys = createQueryKeys("modules");

export const useModules = baseCrudHooks.useList;
export const useModule = baseCrudHooks.useDetail;
export const useCreateModule = baseCrudHooks.useCreate;
export const useUpdateModule = baseCrudHooks.useUpdate;
export const useDeleteModule = baseCrudHooks.useDelete;
export const useBulkDeleteModules = baseCrudHooks.useBulkDelete;

export function useModuleByCode(code: string) {
  return useQuery<AppModule, ApiError>({
    queryKey: keys.custom("code", code),
    queryFn: async () => {
      const response = await moduleService.getByCode(code);
      return response.data.data;
    },
    enabled: !!code,
  });
}

export const moduleHooks = {
  ...baseCrudHooks,
  useByCode: useModuleByCode,
};
