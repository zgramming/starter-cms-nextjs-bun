// API Types - Request & Response Payloads
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

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
