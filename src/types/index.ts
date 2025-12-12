// Types untuk CMS
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

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  modules: Module[];
}

export interface Module {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface Menu {
  id: string;
  moduleId: string;
  name: string;
  path: string;
  icon?: string;
  parentId?: string;
  children?: Menu[];
  order: number;
}

export interface MasterData {
  id: string;
  code: string;
  name: string;
  value: string;
  description?: string;
}

export interface Parameter {
  id: string;
  key: string;
  value: string;
  type: "string" | "number" | "boolean" | "json";
  description?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
