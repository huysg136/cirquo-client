import { request } from "../../../shared/api/httpClient";
import type { AddressFormValues, UserAddress } from "../types/address.types";

const ADDRESS_PATH = "/addresses";

export function getUserAddresses(): Promise<UserAddress[]> {
  return request<UserAddress[]>(ADDRESS_PATH);
}

export function createUserAddress(values: AddressFormValues): Promise<UserAddress> {
  return request<UserAddress>(ADDRESS_PATH, {
    method: "POST",
    body: values,
  });
}

export function updateUserAddress(
  addressId: string,
  values: AddressFormValues,
): Promise<UserAddress> {
  return request<UserAddress>(`${ADDRESS_PATH}/${addressId}`, {
    method: "PUT",
    body: values,
  });
}

export function deleteUserAddress(addressId: string): Promise<void> {
  return request<void>(`${ADDRESS_PATH}/${addressId}`, { method: "DELETE" });
}
