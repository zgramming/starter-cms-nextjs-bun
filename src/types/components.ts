// Component Props Types - Reusable UI Components
export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  showActions?: boolean;
}

export interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAdd?: () => void;
  onExport?: () => void;
  onImport?: (file: File) => void;
  addLabel?: string;
  searchPlaceholder?: string;
}

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export interface DeleteConfirmOptions {
  title?: string;
  message?: string;
  confirmLabel?: string;
  onConfirm: () => void;
}
