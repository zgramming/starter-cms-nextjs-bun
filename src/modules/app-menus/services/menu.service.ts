import { BaseRepository } from "@/core/api/base-repository";
import type { BaseQueryParams } from "@/core/types/query-params";

export interface Menu {
  id: string;
  name: string;
  icon?: string;
  path?: string;
  parent_id?: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type MenuQueryParams = BaseQueryParams;

class MenuService extends BaseRepository<Menu> {
  constructor() {
    super("menus");
  }

  async reorder(items: { id: string; order: number }[]) {
    return this.post(`/${this.resource}/reorder`, { items });
  }

  async getTree() {
    return this.get<Menu[]>(`/${this.resource}/tree`);
  }
}

export const menuService = new MenuService();
