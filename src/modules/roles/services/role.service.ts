import { BaseRepository } from "@/core/api/base-repository";
import type { BaseQueryParams } from "@/core/types/query-params";
import { Role } from "@/types/user";

export type RoleQueryParams = BaseQueryParams;

class RoleService extends BaseRepository<Role> {
  constructor() {
    super("roles");
  }
}

export const roleService = new RoleService();
