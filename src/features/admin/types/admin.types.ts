export type CatalogStatus = "ACTIVE" | "INACTIVE";
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type RoleName = "CUSTOMER" | "STAFF" | "ADMIN";

export interface PageResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  status: UserStatus;
  roleName: RoleName;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  status: CatalogStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  specs: Record<string, string> | null;
  status: CatalogStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UserFilters {
  status?: UserStatus;
  roleName?: RoleName;
  keyword?: string;
  page: number;
  size: number;
}

export interface ProductFilters {
  categoryId?: string;
  status?: CatalogStatus;
  keyword?: string;
  page: number;
  size: number;
}

export interface CategoryValues {
  parentId?: string;
  name: string;
  slug: string;
  status?: CatalogStatus;
}

export interface ProductValues {
  categoryId: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  specs?: Record<string, string>;
  status?: CatalogStatus;
}
