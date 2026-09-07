import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { App as AntdApp, Button, Card, Form, Input, Modal, Select, Table } from "antd";
import { useCallback, useEffect, useState } from "react";

import { getErrorMessage } from "../../../shared/config/errorMessages";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { changeCategoryStatus, createCategory, getAdminCategories, updateCategory } from "../services/admin.service";
import type { CatalogStatus, Category, CategoryValues } from "../types/admin.types";
import "../styles/admin.scss";

export function AdminCategoriesPage() {
  const { message: messageApi } = AntdApp.useApp();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm<CategoryValues>();

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try { setCategories(await getAdminCategories()); }
    catch (error) { messageApi.error(getErrorMessage(error)); }
    finally { setLoading(false); }
  }, [messageApi]);

  useEffect(() => { void Promise.resolve().then(loadCategories); }, [loadCategories]);

  function openCreate(): void {
    form.resetFields();
    form.setFieldValue("status", "ACTIVE");
    setEditingCategory(null);
  }

  function openEdit(category: Category): void {
    form.setFieldsValue({ ...category, parentId: category.parentId ?? undefined });
    setEditingCategory(category);
  }

  async function saveCategory(values: CategoryValues): Promise<void> {
    setSaving(true);
    try {
      if (editingCategory) await updateCategory(editingCategory.id, values);
      else await createCategory(values);
      messageApi.success(editingCategory ? "Đã cập nhật danh mục." : "Đã tạo danh mục.");
      setEditingCategory(undefined);
      void loadCategories();
    } catch (error) { messageApi.error(getErrorMessage(error)); }
    finally { setSaving(false); }
  }

  async function updateStatus(category: Category, status: CatalogStatus): Promise<void> {
    try {
      await changeCategoryStatus(category.id, status);
      messageApi.success("Đã cập nhật trạng thái danh mục.");
      void loadCategories();
    } catch (error) { messageApi.error(getErrorMessage(error)); }
  }

  return (
    <section className="admin-page">
      <AdminPageHeader title="Danh mục" description="Phân nhóm sản phẩm hiển thị trên cửa hàng." action={<Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Thêm danh mục</Button>} />
      <Card className="admin-panel">
        <Table<Category> rowKey="id" loading={loading} dataSource={categories} pagination={false} scroll={{ x: 760 }} columns={[
          { title: "Tên", dataIndex: "name", width: 210 },
          { title: "Slug", dataIndex: "slug", width: 220 },
          { title: "Danh mục cha", dataIndex: "parentId", width: 190, render: (parentId) => categories.find((category) => category.id === parentId)?.name ?? "—" },
          { title: "Trạng thái", dataIndex: "status", width: 150, render: (status, category) => <Select value={status} size="small" options={["ACTIVE", "INACTIVE"].map((value) => ({ value }))} onChange={(value) => void updateStatus(category, value)} /> },
          { title: "", width: 64, fixed: "right", render: (_, category) => <Button type="text" aria-label="Sửa danh mục" icon={<EditOutlined />} onClick={() => openEdit(category)} /> },
        ]} />
      </Card>
      <Modal open={editingCategory !== undefined} title={editingCategory ? "Cập nhật danh mục" : "Thêm danh mục"} okText="Lưu" cancelText="Hủy" confirmLoading={saving} onCancel={() => setEditingCategory(undefined)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={saveCategory}>
          <Form.Item name="name" label="Tên danh mục" rules={[{ required: true }, { max: 100 }]}><Input /></Form.Item>
          <Form.Item name="slug" label="Slug" rules={[{ required: true }, { pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: "Chỉ dùng chữ thường, số và dấu gạch ngang." }]}><Input /></Form.Item>
          <Form.Item name="parentId" label="Danh mục cha"><Select allowClear options={categories.filter((category) => category.id !== editingCategory?.id).map((category) => ({ value: category.id, label: category.name }))} /></Form.Item>
          {!editingCategory ? <Form.Item name="status" label="Trạng thái"><Select options={["ACTIVE", "INACTIVE"].map((value) => ({ value }))} /></Form.Item> : null}
        </Form>
      </Modal>
    </section>
  );
}
