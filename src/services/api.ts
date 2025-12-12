import { api, PaginatedResponse } from "@/lib/api-client";
import { User, Role } from "@/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Authentication API
export const authApi = {
  login: (data: LoginRequest) => {
    return api.post<LoginResponse>("/auth/login", data);
  },

  register: (data: RegisterRequest) => {
    return api.post<LoginResponse>("/auth/register", data);
  },

  logout: () => {
    return api.post("/auth/logout");
  },

  refreshToken: (refreshToken: string) => {
    return api.post<{ token: string }>("/auth/refresh", { refreshToken });
  },

  getProfile: () => {
    return api.get<User>("/auth/profile");
  },

  updateProfile: (data: Partial<User>) => {
    return api.put<User>("/auth/profile", data);
  },

  changePassword: (data: { oldPassword: string; newPassword: string }) => {
    return api.post("/auth/change-password", data);
  },
};

// User API
export const userApi = {
  getAll: (params?: { page?: number; pageSize?: number; search?: string }) => {
    return api.get<PaginatedResponse<User>>("/users", { params });
  },

  getById: (id: string) => {
    return api.get<User>(`/users/${id}`);
  },

  create: (data: Partial<User>) => {
    return api.post<User>("/users", data);
  },

  update: (id: string, data: Partial<User>) => {
    return api.put<User>(`/users/${id}`, data);
  },

  delete: (id: string) => {
    return api.delete(`/users/${id}`);
  },

  bulkDelete: (ids: string[]) => {
    return api.post("/users/bulk-delete", { ids });
  },

  export: () => {
    return api.download("/users/export", "users.xlsx");
  },

  import: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.upload("/users/import", formData);
  },
};

// Role API
export const roleApi = {
  getAll: (params?: { page?: number; pageSize?: number; search?: string }) => {
    return api.get<PaginatedResponse<Role>>("/roles", { params });
  },

  getById: (id: string) => {
    return api.get(`/roles/${id}`);
  },

  create: (data: Partial<Role>) => {
    return api.post("/roles", data);
  },

  update: (id: string, data: Partial<Role>) => {
    return api.put(`/roles/${id}`, data);
  },

  delete: (id: string) => {
    return api.delete(`/roles/${id}`);
  },
};

// Generic CRUD API Factory
export function createCrudApi<T>(resource: string) {
  return {
    getAll: (params?: Record<string, unknown>) => {
      return api.get<PaginatedResponse<T>>(`/${resource}`, { params });
    },

    getById: (id: string) => {
      return api.get<T>(`/${resource}/${id}`);
    },

    create: (data: Partial<T>) => {
      return api.post<T>(`/${resource}`, data);
    },

    update: (id: string, data: Partial<T>) => {
      return api.put<T>(`/${resource}/${id}`, data);
    },

    delete: (id: string) => {
      return api.delete(`/${resource}/${id}`);
    },

    bulkDelete: (ids: string[]) => {
      return api.post(`/${resource}/bulk-delete`, { ids });
    },

    export: (filename: string) => {
      return api.download(`/${resource}/export`, filename);
    },

    import: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return api.upload(`/${resource}/import`, formData);
    },
  };
}

// Example: Create API for other resources
export const parameterApi = createCrudApi("parameters");
export const categoryApi = createCrudApi("categories");
export const moduleApi = createCrudApi("modules");
export const menuApi = createCrudApi("menus");
