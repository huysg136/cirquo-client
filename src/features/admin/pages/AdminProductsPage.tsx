import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { App as AntdApp, Button, Card, Col, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import type { TablePaginationConfig } from "antd";
import { useCallback, useEffect, useState } from "react";

import { getErrorMessage } from "../../../shared/config/errorMessages";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { changeProductStatus, createProduct, getAdminCategories, getAdminProducts, updateProduct } from "../services/admin.service";
import type { CatalogStatus, Category, Product, ProductFilters, ProductValues } from "../types/admin.types";
import "../styles/admin.scss";

const DEFAULT_FILTERS: ProductFilters = { page: 0, size: 20 };

interface SpecEntry {
  key?: string;
  value?: string;
}

interface ProductFormValues extends Omit<ProductValues, "specs"> {
  specs?: SpecEntry[];
}

function toProductValues(values: ProductFormValues): ProductValues {
  const specs = Object.fromEntries(
    (values.specs ?? [])
      .filter((spec) => spec.key?.trim() && spec.value?.trim())
      .map((spec) => [spec.key!.trim(), spec.value!.trim()]),
  );

  return { ...values, specs };
}

export function AdminProductsPage() {
  const { message: messageApi } = AntdApp.useApp();
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm<ProductFormValues>();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAdminProducts(filters);
      setProducts(response.items);
      setTotal(response.totalElements);
    } catch (error) { messageApi.error(getErrorMessage(error)); }
    finally { setLoading(false); }
  }, [filters, messageApi]);

  useEffect(() => { void Promise.resolve().then(loadProducts); }, [loadProducts]);
  useEffect(() => { getAdminCategories().then(setCategories).catch((error) => messageApi.error(getErrorMessage(error))); }, [messageApi]);

  function openCreate(): void { form.resetFields(); form.setFieldValue("status", "ACTIVE"); setEditingProduct(null); }
  function openEdit(product: Product): void {
    form.setFieldsValue({
      categoryId: product.categoryId,
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription ?? undefined,
      description: product.description ?? undefined,
      specs: Object.entries(product.specs ?? {}).map(([key, value]) => ({ key, value })),
    });
    setEditingProduct(product);
  }

  async function saveProduct(values: ProductFormValues): Promise<void> {
    setSaving(true);
    try {
      const productValues = toProductValues(values);
      if (editingProduct) await updateProduct(editingProduct.id, productValues);
      else await createProduct(productValues);
      messageApi.success(editingProduct ? "Đã cập nhật sản phẩm." : "Đã tạo sản phẩm.");
      setEditingProduct(undefined);
      void loadProducts();
    } catch (error) { messageApi.error(getErrorMessage(error)); }
    finally { setSaving(false); }
  }

  async function updateStatus(product: Product, status: CatalogStatus): Promise<void> {
    try { await changeProductStatus(product.id, status); messageApi.success("Đã cập nhật trạng thái sản phẩm."); void loadProducts(); }
    catch (error) { messageApi.error(getErrorMessage(error)); }
  }

  const pagination: TablePaginationConfig = { current: filters.page + 1, pageSize: filters.size, total, showSizeChanger: true, onChange: (page, size) => setFilters((current) => ({ ...current, page: page - 1, size })) };

  return (
    <section className="admin-page">
      <AdminPageHeader title="Sản phẩm" description="Quản lý catalog sản phẩm trước khi thêm phiên bản và hình ảnh." action={<Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Thêm sản phẩm</Button>} />
      <Card className="admin-panel">
        <Space wrap className="admin-filters">
          <Input.Search allowClear placeholder="Tìm tên hoặc slug" onSearch={(keyword) => setFilters((current) => ({ ...current, keyword, page: 0 }))} />
          <Select allowClear placeholder="Danh mục" options={categories.map((category) => ({ value: category.id, label: category.name }))} onChange={(categoryId) => setFilters((current) => ({ ...current, categoryId, page: 0 }))} />
          <Select allowClear placeholder="Trạng thái" options={["ACTIVE", "INACTIVE"].map((value) => ({ value }))} onChange={(status) => setFilters((current) => ({ ...current, status, page: 0 }))} />
          <Button icon={<ReloadOutlined />} onClick={() => setFilters(DEFAULT_FILTERS)}>Đặt lại</Button>
        </Space>
        <Table<Product> rowKey="id" loading={loading} dataSource={products} pagination={pagination} scroll={{ x: 950 }} columns={[
          { title: "Sản phẩm", dataIndex: "name", width: 230 },
          { title: "Danh mục", dataIndex: "categoryName", width: 150 },
          { title: "Slug", dataIndex: "slug", width: 210 },
          { title: "Mô tả ngắn", dataIndex: "shortDescription", ellipsis: true, render: (value) => value ?? "—" },
          { title: "Trạng thái", dataIndex: "status", width: 145, render: (status, product) => <Select value={status} size="small" options={["ACTIVE", "INACTIVE"].map((value) => ({ value }))} onChange={(value) => void updateStatus(product, value)} /> },
          { title: "", width: 64, fixed: "right", render: (_, product) => <Button type="text" aria-label="Sửa sản phẩm" icon={<EditOutlined />} onClick={() => openEdit(product)} /> },
        ]} />
      </Card>
      <Modal centered width={760} open={editingProduct !== undefined} title={editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"} okText="Lưu" cancelText="Hủy" confirmLoading={saving} onCancel={() => setEditingProduct(undefined)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={saveProduct}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}><Select options={categories.map((category) => ({ value: category.id, label: category.name }))} /></Form.Item>
            </Col>
            {!editingProduct ? <Col xs={24} sm={12}><Form.Item name="status" label="Trạng thái"><Select options={["ACTIVE", "INACTIVE"].map((value) => ({ value }))} /></Form.Item></Col> : null}
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }, { max: 255 }]}><Input /></Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="slug" label="Slug" rules={[{ required: true }, { pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: "Chỉ dùng chữ thường, số và dấu gạch ngang." }]}><Input /></Form.Item>
            </Col>
          </Row>
          <Form.Item name="shortDescription" label="Mô tả ngắn"><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="description" label="Mô tả chi tiết"><Input.TextArea rows={4} /></Form.Item>
          <Form.List name="specs">
            {(fields, { add, remove }) => (
              <Form.Item label="Thông số kỹ thuật" className="admin-specifications">
                {fields.map((field) => (
                  <Space key={field.key} className="admin-specification-row" align="baseline">
                    <Form.Item {...field} name={[field.name, "key"]} rules={[{ required: true, message: "Nhập tên thông số." }]}><Input placeholder="Ví dụ: Màn hình" /></Form.Item>
                    <Form.Item {...field} name={[field.name, "value"]} rules={[{ required: true, message: "Nhập giá trị." }]}><Input placeholder="Ví dụ: 6.9 inch" /></Form.Item>
                    <Button type="text" danger aria-label="Xóa thông số" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add()}>
                  Thêm thông số
                </Button>
              </Form.Item>
            )}
          </Form.List>
        </Form>
      </Modal>
    </section>
  );
}
