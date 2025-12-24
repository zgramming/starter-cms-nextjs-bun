import { createCrudHooks } from "@/shared/hooks/useCrudApi";
import { userService } from "../services/user.service";

const baseCrudHooks = createCrudHooks("users", userService);

export const useUsers = baseCrudHooks.useList;
export const useUser = baseCrudHooks.useDetail;
export const useCreateUser = baseCrudHooks.useCreate;
export const useUpdateUser = baseCrudHooks.useUpdate;
export const useDeleteUser = baseCrudHooks.useDelete;
export const useBulkDeleteUsers = baseCrudHooks.useBulkDelete;

export const userHooks = {
  ...baseCrudHooks,
};
