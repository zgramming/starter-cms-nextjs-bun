import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { env } from "@/config/env";

// API Response Types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem(env.tokenKey);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem(env.refreshTokenKey);

        if (refreshToken) {
          const response = await axios.post(`${env.apiBaseUrl}/auth/refresh`, {
            refreshToken,
          });

          const { token } = response.data;
          localStorage.setItem(env.tokenKey, token);

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - redirect to login
        localStorage.removeItem(env.tokenKey);
        localStorage.removeItem(env.refreshTokenKey);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const apiError: ApiError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      errors: error.response?.data?.errors,
      statusCode: error.response?.status,
    };

    return Promise.reject(apiError);
  }
);

// API Helper Functions
export const api = {
  // GET request
  get: <T>(url: string, config?: AxiosRequestConfig) => {
    return apiClient.get<ApiResponse<T>>(url, config);
  },

  // POST request
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return apiClient.post<ApiResponse<T>>(url, data, config);
  },

  // PUT request
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return apiClient.put<ApiResponse<T>>(url, data, config);
  },

  // PATCH request
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return apiClient.patch<ApiResponse<T>>(url, data, config);
  },

  // DELETE request
  delete: <T>(url: string, config?: AxiosRequestConfig) => {
    return apiClient.delete<ApiResponse<T>>(url, config);
  },

  // Upload file
  upload: <T>(url: string, formData: FormData, config?: AxiosRequestConfig) => {
    return apiClient.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Download file
  download: async (url: string, filename: string) => {
    const response = await apiClient.get(url, {
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

export default apiClient;
