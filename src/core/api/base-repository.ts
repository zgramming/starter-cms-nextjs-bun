import { apiService } from "@/shared/lib/api-service";
import type { PaginatedResponse } from "@/types/api";

export class BaseRepository<T> {
  constructor(protected readonly resource: string) {}

  async getAll(params?: Record<string, unknown>) {
    return apiService.get<PaginatedResponse<T>>(`/${this.resource}`, {
      params,
    });
  }

  async getById(id: string) {
    return apiService.get<T>(`/${this.resource}/${id}`);
  }

  async create(data: Partial<T>) {
    return apiService.post<T>(`/${this.resource}`, data);
  }

  async update(id: string, data: Partial<T>) {
    return apiService.put<T>(`/${this.resource}/${id}`, data);
  }

  async delete(id: string) {
    return apiService.delete(`/${this.resource}/${id}`);
  }

  async bulkDelete(ids: string[]) {
    return apiService.post(`/${this.resource}/bulk-delete`, { ids });
  }

  async export(filename: string) {
    return apiService.download(`/${this.resource}/export`, filename);
  }

  async import(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return apiService.upload(`/${this.resource}/import`, formData);
  }
}
