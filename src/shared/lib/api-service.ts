import { AxiosRequestConfig } from "axios";
import { httpClient } from "./http-client";
import type { ApiResponse } from "@/types/api";

/**
 * API Service - High-level API helper functions
 * Provides clean interface for making HTTP requests
 */
export const apiService = {
  /**
   * GET request
   * @example
   * const response = await apiService.get<User[]>('/users');
   * const users = response.data.data;
   */
  get: <T>(url: string, config?: AxiosRequestConfig) => {
    return httpClient.get<ApiResponse<T>>(url, config);
  },

  /**
   * POST request
   * @example
   * const response = await apiService.post<User>('/users', { name: 'John' });
   * const newUser = response.data.data;
   */
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return httpClient.post<ApiResponse<T>>(url, data, config);
  },

  /**
   * PUT request
   * @example
   * const response = await apiService.put<User>('/users/1', { name: 'Jane' });
   * const updatedUser = response.data.data;
   */
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return httpClient.put<ApiResponse<T>>(url, data, config);
  },

  /**
   * PATCH request
   * @example
   * const response = await apiService.patch<User>('/users/1', { status: 'active' });
   */
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return httpClient.patch<ApiResponse<T>>(url, data, config);
  },

  /**
   * DELETE request
   * @example
   * await apiService.delete('/users/1');
   */
  delete: <T>(url: string, config?: AxiosRequestConfig) => {
    return httpClient.delete<ApiResponse<T>>(url, config);
  },

  /**
   * Upload file
   * @example
   * const formData = new FormData();
   * formData.append('file', file);
   * await apiService.upload<UploadResponse>('/users/import', formData);
   */
  upload: <T>(url: string, formData: FormData, config?: AxiosRequestConfig) => {
    return httpClient.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * Download file
   * @example
   * await apiService.download('/users/export', 'users.xlsx');
   */
  download: async (url: string, filename: string) => {
    const response = await httpClient.get(url, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(link.href);
  },
};

// Export as default for convenience
export default apiService;
