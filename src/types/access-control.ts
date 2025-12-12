// Domain Types - Access Control & Permissions

// Legacy format (from backend)
export interface AccessCategory {
  category_id: string;
  status: boolean;
}

export interface AccessModule {
  module_id: string;
  status: boolean;
}

export interface AccessMenu {
  menu_id: string;
  status: boolean;
}

// Modern format (for frontend state)
export interface AccessControl {
  id: string;
  roleId: string;
  categoryId: string;
  moduleId?: string;
  menuId?: string;
  permissions: string[];
}

export interface AccessMenuPermission {
  id: string;
  menuId: string;
  roleId: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}
