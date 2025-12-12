// Domain Types - Settings & Configuration
export interface MasterData {
  id: string;
  code: string;
  name: string;
  description?: string;
  categoryId?: string;
  isActive?: boolean;
  value?: string;
}

export interface MasterCategory {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface Parameter {
  id: string;
  key: string;
  value: string;
  description?: string;
  type: "string" | "number" | "boolean" | "json";
  isSystem?: boolean;
}
