import type { BaseQueryParams } from "@/core/types/query-params";

export function createQueryKeys(resource: string) {
  return {
    all: [resource] as const,
    lists: () => [resource, "list"] as const,
    list: (params?: BaseQueryParams) => [resource, "list", params] as const,
    details: () => [resource, "detail"] as const,
    detail: (id: string) => [resource, "detail", id] as const,
    custom: (...keys: (string | number | boolean)[]) =>
      [resource, ...keys] as const,
  };
}
