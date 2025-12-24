import { BaseRepository } from "@/core/api/base-repository";
import type { BaseQueryParams } from "@/core/types/query-params";

export interface Category {
  id: string;
  name: string;
  description?: string;
  parent_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type CategoryQueryParams = BaseQueryParams;

class CategoryService extends BaseRepository<Category> {
  constructor() {
    super("categories");
  }

  async getTree() {
    return this.get<Category[]>(`/${this.resource}/tree`);
  }
}

export const categoryService = new CategoryService();
