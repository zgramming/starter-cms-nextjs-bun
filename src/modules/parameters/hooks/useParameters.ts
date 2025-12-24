import { createCrudHooks } from "@/shared/hooks/useCrudApi";
import {
  parameterService,
  type Parameter,
} from "../services/parameter.service";
import { useQuery } from "@tanstack/react-query";
import type { ApiError } from "@/types/api";

const baseCrudHooks = createCrudHooks("parameters", parameterService);

export const useParameters = baseCrudHooks.useList;
export const useParameter = baseCrudHooks.useDetail;
export const useCreateParameter = baseCrudHooks.useCreate;
export const useUpdateParameter = baseCrudHooks.useUpdate;
export const useDeleteParameter = baseCrudHooks.useDelete;
export const useBulkDeleteParameters = baseCrudHooks.useBulkDelete;

export function useParameterByCode(code: string) {
  return useQuery<Parameter, ApiError>({
    queryKey: ["parameters", "code", code],
    queryFn: async () => {
      const response = await parameterService.getByCode(code);
      return response.data.data;
    },
    enabled: !!code,
  });
}

export const parameterHooks = {
  ...baseCrudHooks,
  useByCode: useParameterByCode,
};
