import { apiService } from "@/shared/lib/api-service";
import type { PaginatedResponse } from "@/types/api";

// Generic REST API Service Factory
// Creates a standard REST API client for any resource with common CRUD operations
// Use this as a base and extend with custom methods as needed

export function createRestApiService<T>(resource: string) {
  return {
    getAll: (params?: Record<string, unknown>) => {
      return apiService.get<PaginatedResponse<T>>(`/${resource}`, { params });
    },

    getById: (id: string) => {
      return apiService.get<T>(`/${resource}/${id}`);
    },

    create: (data: Partial<T>) => {
      return apiService.post<T>(`/${resource}`, data);
    },

    update: (id: string, data: Partial<T>) => {
      return apiService.put<T>(`/${resource}/${id}`, data);
    },

    delete: (id: string) => {
      return apiService.delete(`/${resource}/${id}`);
    },

    bulkDelete: (ids: string[]) => {
      return apiService.post(`/${resource}/bulk-delete`, { ids });
    },

    export: (filename: string) => {
      return apiService.download(`/${resource}/export`, filename);
    },

    import: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiService.upload(`/${resource}/import`, formData);
    },
  };
}
