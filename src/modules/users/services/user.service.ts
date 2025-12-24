import { BaseRepository } from "@/core/api/base-repository";
import type { User } from "@/types/user";
import type { BaseQueryParams } from "@/core/types/query-params";

export interface UserQueryParams extends BaseQueryParams {
  status?: string;
  role?: string;
}

class UserService extends BaseRepository<User> {
  constructor() {
    super("users");
  }
}

export const userService = new UserService();
