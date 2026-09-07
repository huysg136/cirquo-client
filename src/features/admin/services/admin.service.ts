import { request } from "../../../shared/api/httpClient";
import type {
  AdminUser,
  CatalogStatus,
  Category,
  CategoryValues,
  PageResponse,
  Product,
  ProductFilters,
  ProductValues,
  RoleName,
  UserFilters,
  UserStatus,
} from "../types/admin.types";

function toQuery(params: object): string {
  const query = new URLSearchParams();

  Object.entries(params as Record<string, string | number | undefined>).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });

  const serialized = query.toString();
  return serialized ? `?${serialized}` : "";
}

export function getAdminUsers(filters: UserFilters): Promise<PageResponse<AdminUser>> {
  return request<PageResponse<AdminUser>>(`/admin/users${toQuery(filters)}`);
}

export function updateAdminUser(
  userId: string,
  values: Pick<AdminUser, "email" | "fullName" | "phone">,
): Promise<AdminUser> {
  return request<AdminUser>(`/admin/users/${userId}`, { method: "PUT", body: values });
}

export function changeAdminUserStatus(userId: string, status: UserStatus): Promise<void> {
  return request<void>(`/admin/users/${userId}/status`, { method: "PATCH", body: { status } });
}

export function changeAdminUserRole(userId: string, roleName: RoleName): Promise<AdminUser> {
  return request<AdminUser>(`/admin/users/${userId}/role`, { method: "PATCH", body: { roleName } });
}

export function getAdminCategories(): Promise<Category[]> {
  return request<Category[]>("/admin/categories");
}

export function createCategory(values: CategoryValues): Promise<Category> {
  return request<Category>("/admin/categories", { method: "POST", body: values });
}

export function updateCategory(categoryId: string, values: CategoryValues): Promise<Category> {
  const body = { parentId: values.parentId, name: values.name, slug: values.slug };
  return request<Category>(`/admin/categories/${categoryId}`, { method: "PUT", body });
}

export function changeCategoryStatus(categoryId: string, status: CatalogStatus): Promise<void> {
  return request<void>(`/admin/categories/${categoryId}/status`, { method: "PATCH", body: { status } });
}

export function getAdminProducts(filters: ProductFilters): Promise<PageResponse<Product>> {
  return request<PageResponse<Product>>(`/admin/products${toQuery(filters)}`);
}

export function createProduct(values: ProductValues): Promise<Product> {
  return request<Product>("/admin/products", { method: "POST", body: values });
}

export function updateProduct(productId: string, values: ProductValues): Promise<Product> {
  const body = {
    categoryId: values.categoryId,
    name: values.name,
    slug: values.slug,
    shortDescription: values.shortDescription,
    description: values.description,
    specs: values.specs,
  };
  return request<Product>(`/admin/products/${productId}`, { method: "PUT", body });
}

export function changeProductStatus(productId: string, status: CatalogStatus): Promise<void> {
  return request<void>(`/admin/products/${productId}/status`, { method: "PATCH", body: { status } });
}
