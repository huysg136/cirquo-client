import { request } from "../../../shared/api/httpClient";
import type { AddressFormValues, UserAddress } from "../types/address.types";

function addressPath(userId: string): string {
  return `/users/${userId}/addresses`;
}

export function getUserAddresses(userId: string): Promise<UserAddress[]> {
  return request<UserAddress[]>(addressPath(userId));
}

export function createUserAddress(userId: string, values: AddressFormValues): Promise<UserAddress> {
  return request<UserAddress>(addressPath(userId), {
    method: "POST",
    body: values,
  });
}

export function updateUserAddress(
  userId: string,
  addressId: string,
  values: AddressFormValues,
): Promise<UserAddress> {
  return request<UserAddress>(`${addressPath(userId)}/${addressId}`, {
    method: "PUT",
    body: values,
  });
}

export function deleteUserAddress(userId: string, addressId: string): Promise<void> {
  return request<void>(`${addressPath(userId)}/${addressId}`, { method: "DELETE" });
}
