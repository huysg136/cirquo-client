import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { App as AntdApp, Button, Card, Form, Input, Modal, Select, Space, Table } from "antd";
import type { TablePaginationConfig } from "antd";
import { useCallback, useEffect, useState } from "react";

import { getErrorMessage } from "../../../shared/config/errorMessages";
import { useAuthStore } from "../../auth/store/auth.store";
import { AdminPageHeader } from "../components/AdminPageHeader";
import {
  changeAdminUserRole,
  changeAdminUserStatus,
  getAdminUsers,
  updateAdminUser,
} from "../services/admin.service";
import type { AdminUser, RoleName, UserFilters, UserStatus } from "../types/admin.types";
import "../styles/admin.scss";

const DEFAULT_FILTERS: UserFilters = { page: 0, size: 20 };

export function AdminUsersPage() {
  const { message: messageApi } = AntdApp.useApp();
  const canManageUsers = useAuthStore((state) => state.user?.roleName === "ADMIN");
  const [filters, setFilters] = useState<UserFilters>(DEFAULT_FILTERS);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm<Pick<AdminUser, "email" | "fullName" | "phone">>();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAdminUsers(filters);
      setUsers(response.items);
      setTotal(response.totalElements);
    } catch (error) {
      messageApi.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [filters, messageApi]);

  useEffect(() => { void Promise.resolve().then(loadUsers); }, [loadUsers]);

  function updateFilters(values: Pick<UserFilters, "keyword" | "status" | "roleName">): void {
    setFilters((current) => ({ ...current, ...values, page: 0 }));
  }

  async function updateStatus(user: AdminUser, status: UserStatus): Promise<void> {
    try {
      await changeAdminUserStatus(user.id, status);
      messageApi.success("Đã cập nhật trạng thái tài khoản.");
      void loadUsers();
    } catch (error) { messageApi.error(getErrorMessage(error)); }
  }

  async function updateRole(user: AdminUser, roleName: RoleName): Promise<void> {
    try {
      await changeAdminUserRole(user.id, roleName);
      messageApi.success("Đã cập nhật vai trò.");
      void loadUsers();
    } catch (error) { messageApi.error(getErrorMessage(error)); }
  }

  async function saveUser(values: Pick<AdminUser, "email" | "fullName" | "phone">): Promise<void> {
    if (!editingUser) return;
    setSaving(true);
    try {
      await updateAdminUser(editingUser.id, values);
      messageApi.success("Đã cập nhật tài khoản.");
      setEditingUser(null);
      void loadUsers();
    } catch (error) { messageApi.error(getErrorMessage(error)); }
    finally { setSaving(false); }
  }

  const pagination: TablePaginationConfig = {
    current: filters.page + 1,
    pageSize: filters.size,
    total,
    showSizeChanger: true,
    onChange: (page, size) => setFilters((current) => ({ ...current, page: page - 1, size })),
  };

  return (
    <section className="admin-page">
      <AdminPageHeader title="Tài khoản" description="Quản lý khách hàng, nhân viên và quản trị viên." />
      <Card className="admin-panel">
        <Space wrap className="admin-filters">
          <Input.Search allowClear placeholder="Tìm tên hoặc email" onSearch={(keyword) => updateFilters({ keyword })} />
          <Select allowClear placeholder="Trạng thái" options={["ACTIVE", "INACTIVE", "SUSPENDED"].map((value) => ({ value }))} onChange={(status) => updateFilters({ status })} />
          <Select allowClear placeholder="Vai trò" options={["CUSTOMER", "STAFF", "ADMIN"].map((value) => ({ value }))} onChange={(roleName) => updateFilters({ roleName })} />
          <Button icon={<ReloadOutlined />} onClick={() => setFilters(DEFAULT_FILTERS)}>Đặt lại</Button>
        </Space>
        <Table<AdminUser> rowKey="id" loading={loading} dataSource={users} pagination={pagination} scroll={{ x: 900 }} columns={[
          { title: "Họ tên", dataIndex: "fullName", width: 190 },
          { title: "Email", dataIndex: "email", width: 230 },
          { title: "Điện thoại", dataIndex: "phone", width: 130, render: (phone) => phone ?? "—" },
          { title: "Vai trò", dataIndex: "roleName", width: 150, render: (roleName, user) => <Select disabled={!canManageUsers} value={roleName} size="small" options={["CUSTOMER", "STAFF", "ADMIN"].map((value) => ({ value }))} onChange={(value) => void updateRole(user, value)} /> },
          { title: "Trạng thái", dataIndex: "status", width: 150, render: (status, user) => <Select disabled={!canManageUsers} value={status} size="small" options={["ACTIVE", "INACTIVE", "SUSPENDED"].map((value) => ({ value }))} onChange={(value) => void updateStatus(user, value)} /> },
          { title: "", width: 64, fixed: "right", render: (_, user) => canManageUsers ? <Button type="text" aria-label="Sửa tài khoản" icon={<EditOutlined />} onClick={() => { setEditingUser(user); form.setFieldsValue(user); }} /> : null },
        ]} />
      </Card>
      <Modal open={Boolean(editingUser)} title="Cập nhật tài khoản" okText="Lưu" cancelText="Hủy" confirmLoading={saving} onCancel={() => setEditingUser(null)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={saveUser}>
          <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}><Input /></Form.Item>
          <Form.Item name="phone" label="Số điện thoại"><Input /></Form.Item>
        </Form>
      </Modal>
    </section>
  );
}
