export interface UserAddress {
  id: string;
  recipientName: string;
  phone: string;
  province: string;
  ward: string;
  addressLine: string;
  defaultAddress: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddressFormValues {
  recipientName: string;
  phone: string;
  province: string;
  ward: string;
  addressLine: string;
  defaultAddress: boolean;
}
