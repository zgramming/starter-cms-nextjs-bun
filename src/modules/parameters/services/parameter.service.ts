import { BaseRepository } from "@/core/api/base-repository";
import type { BaseQueryParams } from "@/core/types/query-params";

export interface Parameter {
  id: string;
  code: string;
  name: string;
  value: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type ParameterQueryParams = BaseQueryParams;

class ParameterService extends BaseRepository<Parameter> {
  constructor() {
    super("parameters");
  }

  async getByCode(code: string) {
    return this.get(`/${this.resource}/code/${code}`);
  }
}

export const parameterService = new ParameterService();
