import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { env } from "@/core/config/env";
import type { ApiError } from "@/types/api";

// ==================== AXIOS INSTANCE ====================

/**
 * HTTP Client - Axios instance with interceptors
 * Handles authentication via cookies and automatic token refresh
 */
export const httpClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

// ==================== REQUEST INTERCEPTOR ====================

httpClient.interceptors.request.use(
  (config) => {
    // Cookies (auth-token, auth-refresh-token) are automatically sent by browser
    // No need to manually set Authorization header
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== RESPONSE INTERCEPTOR ====================

httpClient.interceptors.response.use(
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
        // Try to refresh token (refresh-token cookie is sent automatically)
        await axios.post(
          `${env.apiBaseUrl}/auth/refresh`,
          {},
          { withCredentials: true } // Send cookies
        );

        // Backend should set new auth-token cookie in response
        // No need to manually save token - browser handles it

        // Retry original request (new cookie will be sent automatically)
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - redirect to login
        // Clear cookies by calling logout endpoint or just redirect
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

export default httpClient;
