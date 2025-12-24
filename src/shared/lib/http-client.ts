import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { env } from "@/core/config/env";
import type { ApiError, ApiResponse } from "@/types/api";

export const httpClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        return httpClient(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    const apiError: ApiError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      errors: error.response?.data?.errors,
      statusCode: error.response?.status,
    };

    return Promise.reject(apiError);
  }
);

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) => {
    return httpClient.get<ApiResponse<T>>(url, config);
  },

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return httpClient.post<ApiResponse<T>>(url, data, config);
  },

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return httpClient.put<ApiResponse<T>>(url, data, config);
  },

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return httpClient.patch<ApiResponse<T>>(url, data, config);
  },

  delete: <T>(url: string, config?: AxiosRequestConfig) => {
    return httpClient.delete<ApiResponse<T>>(url, config);
  },

  upload: <T>(url: string, formData: FormData, config?: AxiosRequestConfig) => {
    return httpClient.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  },

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

export default httpClient;
