// Domain Types - User Management
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  access_categories?: Array<{
    category_id: string;
    status: boolean;
  }>;
  access_modules?: Array<{
    module_id: string;
    status: boolean;
  }>;
  access_menus?: Array<{
    menu_id: string;
    status: boolean;
  }>;
}
