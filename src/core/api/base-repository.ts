import { api } from "@/shared/lib/http-client";
import type { PaginatedResponse } from "@/types/api";
import type { BaseQueryParams } from "@/core/types/query-params";

export class BaseRepository<T> {
  constructor(protected readonly resource: string) {}

  async getAll(params?: BaseQueryParams) {
    return api.get<PaginatedResponse<T>>(`/${this.resource}`, {
      params,
    });
  }

  async getById(id: string) {
    return api.get<T>(`/${this.resource}/${id}`);
  }

  async create(data: Partial<T>) {
    return api.post<T>(`/${this.resource}`, data);
  }

  async update(id: string, data: Partial<T>) {
    return api.put<T>(`/${this.resource}/${id}`, data);
  }

  async delete(id: string) {
    return api.delete(`/${this.resource}/${id}`);
  }

  async bulkDelete(ids: string[]) {
    return api.post(`/${this.resource}/bulk-delete`, { ids });
  }

  async export(filename: string) {
    return api.download(`/${this.resource}/export`, filename);
  }

  async import(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return api.upload(`/${this.resource}/import`, formData);
  }

  protected async get<R = T>(url: string) {
    return api.get<R>(url);
  }

  protected async post<R = T>(url: string, data?: unknown) {
    return api.post<R>(url, data);
  }

  protected async put<R = T>(url: string, data?: unknown) {
    return api.put<R>(url, data);
  }

  protected async patch<R = T>(url: string, data?: unknown) {
    return api.patch<R>(url, data);
  }
}
