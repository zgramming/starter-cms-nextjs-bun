import { BaseRepository } from "@/core/api/base-repository";
import type { BaseQueryParams } from "@/core/types/query-params";

export interface AppModule {
  id: string;
  code: string;
  name: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type ModuleQueryParams = BaseQueryParams;

class ModuleService extends BaseRepository<AppModule> {
  constructor() {
    super("modules");
  }

  async getByCode(code: string) {
    return this.get(`/${this.resource}/code/${code}`);
  }
}

export const moduleService = new ModuleService();
