// Example: How to extend createRestApiService with custom methods

import { apiService } from "@/shared/lib/api-service";
import { createRestApiService } from "./crud";

// ===============================================
// PATTERN 1: Simple Extend (Recommended)
// ===============================================

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export const productApi = {
  // Get all CRUD methods (getAll, getById, create, update, delete, etc.)
  ...createRestApiService<Product>("products"),

  // Add custom methods specific to Product
  updateStock: (productId: string, quantity: number) => {
    return apiService.patch(`/products/${productId}/stock`, { quantity });
  },

  getByCategory: (categoryId: string) => {
    return apiService.get(`/products/category/${categoryId}`);
  },

  bulkUpdatePrice: (updates: { id: string; price: number }[]) => {
    return apiService.post("/products/bulk-update-price", { updates });
  },
};

// ===============================================
// PATTERN 2: Override CRUD Method
// ===============================================

interface Order {
  id: string;
  userId: string;
  items: unknown[];
  total: number;
}

export const orderApi = {
  ...createRestApiService<Order>("orders"),

  // Override default getAll to add custom logic
  getAll: (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    // Custom implementation with extra filters
    return apiService.get("/orders", { params });
  },

  // Custom methods
  cancelOrder: (orderId: string, reason: string) => {
    return apiService.post(`/orders/${orderId}/cancel`, { reason });
  },

  getOrderTracking: (orderId: string) => {
    return apiService.get(`/orders/${orderId}/tracking`);
  },
};

// ===============================================
// PATTERN 3: Selective CRUD Methods
// ===============================================

interface Report {
  id: string;
  name: string;
  type: string;
}

// Only use specific CRUD methods (no delete, no update)
const baseCrud = createRestApiService<Report>("reports");

export const reportApi = {
  // Only expose read operations
  getAll: baseCrud.getAll,
  getById: baseCrud.getById,

  // Custom methods
  generate: (reportType: string, params: Record<string, unknown>) => {
    return apiService.post("/reports/generate", { type: reportType, params });
  },

  download: (reportId: string, format: "pdf" | "excel") => {
    return apiService.download(
      `/reports/${reportId}/download`,
      `report.${format}`
    );
  },

  schedule: (reportId: string, cron: string) => {
    return apiService.post(`/reports/${reportId}/schedule`, { cron });
  },
};

// ===============================================
// PATTERN 4: Composition (Multiple Resources)
// ===============================================

interface Invoice {
  id: string;
  orderId: string;
  amount: number;
}

export const invoiceApi = {
  ...createRestApiService<Invoice>("invoices"),

  // Methods that involve other resources
  getByOrder: (orderId: string) => {
    return apiService.get(`/orders/${orderId}/invoices`);
  },

  sendEmail: (invoiceId: string, email: string) => {
    return apiService.post(`/invoices/${invoiceId}/send`, { email });
  },

  markAsPaid: (invoiceId: string, paymentData: unknown) => {
    return apiService.post(`/invoices/${invoiceId}/mark-paid`, paymentData);
  },

  downloadPdf: (invoiceId: string) => {
    return apiService.download(`/invoices/${invoiceId}/pdf`, "invoice.pdf");
  },
};
