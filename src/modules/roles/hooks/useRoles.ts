import { createCrudHooks } from "@/shared/hooks/useCrudApi";
import { roleService } from "../services/role.service";

const baseCrudHooks = createCrudHooks("roles", roleService);

export const useRoles = baseCrudHooks.useList;
export const useRole = baseCrudHooks.useDetail;
export const useCreateRole = baseCrudHooks.useCreate;
export const useUpdateRole = baseCrudHooks.useUpdate;
export const useDeleteRole = baseCrudHooks.useDelete;
export const useBulkDeleteRoles = baseCrudHooks.useBulkDelete;

export const roleHooks = {
  ...baseCrudHooks,
};
