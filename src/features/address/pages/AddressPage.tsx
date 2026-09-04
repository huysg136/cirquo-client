import {
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  StarFilled,
} from "@ant-design/icons";
import {
  App as AntdApp,
  Button,
  Card,
  Checkbox,
  Empty,
  Flex,
  Form,
  Input,
  Modal,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import { useEffect, useRef, useState } from "react";

import { getErrorMessage } from "../../../shared/config/errorMessages";
import { HomeHeader } from "../../home/components/HomeHeader";
import { useAuthStore } from "../../auth/store/auth.store";
import {
  createUserAddress,
  deleteUserAddress,
  getUserAddresses,
  updateUserAddress,
} from "../services/address.service";
import type { AddressFormValues, UserAddress } from "../types/address.types";
import "../styles/address.scss";

const PHONE_PATTERN = /^0[35789]\d{8}$/;

function toFormValues(address: UserAddress): AddressFormValues {
  return {
    recipientName: address.recipientName,
    phone: address.phone,
    province: address.province,
    ward: address.ward,
    addressLine: address.addressLine,
    defaultAddress: address.defaultAddress,
  };
}

function sortAddresses(addresses: UserAddress[]): UserAddress[] {
  return [...addresses].sort(
    (first, second) => Number(second.defaultAddress) - Number(first.defaultAddress),
  );
}

export function AddressPage() {
  const user = useAuthStore((state) => state.user);
  const { message: messageApi } = AntdApp.useApp();
  const [addressForm] = Form.useForm<AddressFormValues>();
  const [modal, modalContextHolder] = Modal.useModal();
  const requestedUserId = useRef<string | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [changingDefaultId, setChangingDefaultId] = useState<string | null>(null);
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || requestedUserId.current === user.id) return;

    requestedUserId.current = user.id;
    getUserAddresses(user.id)
      .then((result) => setAddresses(sortAddresses(result)))
      .catch((error) => {
        requestedUserId.current = null;
        messageApi.error({ key: "address-load-error", content: getErrorMessage(error) });
      })
      .finally(() => setIsLoading(false));
  }, [messageApi, user]);

  function openCreateModal(): void {
    setEditingAddress(null);
    addressForm.resetFields();
    addressForm.setFieldsValue({ defaultAddress: addresses.length === 0 });
    setIsModalOpen(true);
  }

  function openEditModal(address: UserAddress): void {
    setEditingAddress(address);
    addressForm.setFieldsValue(toFormValues(address));
    setIsModalOpen(true);
  }

  function closeModal(): void {
    if (!isSaving) setIsModalOpen(false);
  }

  async function handleSubmit(values: AddressFormValues): Promise<void> {
    if (!user) return;

    setIsSaving(true);
    try {
      const savedAddress = editingAddress
        ? await updateUserAddress(user.id, editingAddress.id, values)
        : await createUserAddress(user.id, values);

      setAddresses((currentAddresses) => {
        const remainingAddresses = currentAddresses
          .filter((address) => address.id !== savedAddress.id)
          .map((address) =>
            savedAddress.defaultAddress ? { ...address, defaultAddress: false } : address,
          );

        return sortAddresses([...remainingAddresses, savedAddress]);
      });
      setIsModalOpen(false);
      messageApi.success(editingAddress ? "Đã cập nhật địa chỉ." : "Đã thêm địa chỉ mới.");
    } catch (error) {
      messageApi.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSetDefault(address: UserAddress): Promise<void> {
    if (!user || address.defaultAddress) return;

    setChangingDefaultId(address.id);
    try {
      const updatedAddress = await updateUserAddress(user.id, address.id, {
        ...toFormValues(address),
        defaultAddress: true,
      });

      setAddresses((currentAddresses) =>
        sortAddresses(
          currentAddresses.map((currentAddress) =>
            currentAddress.id === updatedAddress.id
              ? updatedAddress
              : { ...currentAddress, defaultAddress: false },
          ),
        ),
      );
      messageApi.success("Đã đặt địa chỉ mặc định.");
    } catch (error) {
      messageApi.error(getErrorMessage(error));
    } finally {
      setChangingDefaultId(null);
    }
  }

  async function handleDelete(addressId: string): Promise<void> {
    if (!user) return;

    setDeletingAddressId(addressId);
    try {
      await deleteUserAddress(user.id, addressId);
      setAddresses((currentAddresses) =>
        currentAddresses.filter((address) => address.id !== addressId),
      );
      messageApi.success("Đã xóa địa chỉ.");
    } catch (error) {
      messageApi.error(getErrorMessage(error));
    } finally {
      setDeletingAddressId(null);
    }
  }

  function confirmDelete(address: UserAddress): void {
    modal.confirm({
      title: "Xóa địa chỉ này?",
      content: `${address.recipientName} · ${address.addressLine}`,
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { danger: true },
      onOk: () => handleDelete(address.id),
    });
  }

  return (
    <div className="address-page">
      {modalContextHolder}
      <HomeHeader />
      <main className="address-container">
        <Flex justify="space-between" align="flex-start" gap={16} className="address-heading">
          <Flex vertical gap={6}>
            <Typography.Title level={2}>Địa chỉ giao hàng</Typography.Title>
            <Typography.Text type="secondary">
              Quản lý các địa chỉ nhận hàng của bạn.
            </Typography.Text>
          </Flex>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
            Thêm địa chỉ
          </Button>
        </Flex>

        {isLoading ? (
          <Card className="address-card">
            <Skeleton active paragraph={{ rows: 5 }} />
          </Card>
        ) : addresses.length === 0 ? (
          <Card className="address-card address-empty">
            <Empty description="Bạn chưa có địa chỉ giao hàng" />
          </Card>
        ) : (
          <Flex vertical gap={16}>
            {addresses.map((address) => (
              <Card key={address.id} className="address-card">
                <Flex justify="space-between" gap={16} className="address-card-content">
                  <Flex vertical gap={8} className="address-card-details">
                    <Flex align="center" gap={10} wrap>
                      <Typography.Text strong>{address.recipientName}</Typography.Text>
                      <Typography.Text type="secondary">{address.phone}</Typography.Text>
                      {address.defaultAddress && <Tag icon={<StarFilled />}>Mặc định</Tag>}
                    </Flex>
                    <Typography.Text>{address.addressLine}</Typography.Text>
                    <Typography.Text type="secondary">
                      {address.ward}, {address.province}
                    </Typography.Text>
                  </Flex>
                  <Flex gap={4} wrap className="address-card-actions">
                    {!address.defaultAddress && (
                      <Button
                        type="link"
                        loading={changingDefaultId === address.id}
                        onClick={() => handleSetDefault(address)}
                      >
                        Đặt mặc định
                      </Button>
                    )}
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => openEditModal(address)}
                    >
                      Sửa
                    </Button>
                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      loading={deletingAddressId === address.id}
                      onClick={() => confirmDelete(address)}
                    >
                      Xóa
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
        )}
      </main>

      <Modal
        title={editingAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isSaving}
            onClick={() => addressForm.submit()}
          >
            {editingAddress ? "Lưu thay đổi" : "Thêm địa chỉ"}
          </Button>,
        ]}
      >
        <Form form={addressForm} layout="vertical" onFinish={handleSubmit} className="address-form">
          <Form.Item
            name="recipientName"
            label="Họ và tên người nhận"
            rules={[
              { required: true, message: "Vui lòng nhập họ tên người nhận." },
              { max: 255, message: "Họ tên không được quá 255 ký tự." },
            ]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại." },
              { pattern: PHONE_PATTERN, message: "Số điện thoại chưa đúng định dạng." },
            ]}
          >
            <Input autoComplete="tel" placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="province"
            label="Tỉnh / Thành phố"
            rules={[
              { required: true, message: "Vui lòng nhập tỉnh/thành phố." },
              { max: 100, message: "Không được quá 100 ký tự." },
            ]}
          >
            <Input placeholder="Ví dụ: Hồ Chí Minh" />
          </Form.Item>
          <Form.Item
            name="ward"
            label="Phường / Xã"
            rules={[
              { required: true, message: "Vui lòng nhập phường/xã." },
              { max: 100, message: "Không được quá 100 ký tự." },
            ]}
          >
            <Input placeholder="Ví dụ: Phường Bến Nghé" />
          </Form.Item>
          <Form.Item
            name="addressLine"
            label="Địa chỉ chi tiết"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ chi tiết." },
              { max: 255, message: "Không được quá 255 ký tự." },
            ]}
          >
            <Input prefix={<HomeOutlined />} placeholder="Số nhà, tên đường" />
          </Form.Item>
          <Form.Item name="defaultAddress" valuePropName="checked" noStyle>
            <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
