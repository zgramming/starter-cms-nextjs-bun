// Domain Types - Application Structure
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
  menus?: Menu[]; // List of menus in this module
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

export interface BreadcrumbItem {
  title: string;
  href: string;
}
