import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  MinusOutlined,
  MobileOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { App as AntdApp, Button, Divider, Flex, Form, Input, Radio, Select, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import { HomeHeader } from "../../home/components/HomeHeader";
import { ROUTES } from "../../../app/router/routePaths";
import "../styles/cart.scss";

const PRODUCT = {
  name: "iPhone 17",
  variant: "128GB · Xanh da trời",
  price: 24_990_000,
};

const money = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const [hasItem, setHasItem] = useState(true);
  const { message: messageApi } = AntdApp.useApp();
  const total = PRODUCT.price * quantity;

  const updateQuantity = (nextQuantity: number) => setQuantity(Math.max(1, nextQuantity));

  if (!hasItem) {
    return (
      <div className="cart-page">
        <HomeHeader />
        <main className="cart-empty">
          <ShoppingCartOutlined />
          <Typography.Title level={3}>Giỏ hàng đang trống</Typography.Title>
          <Typography.Text>Bạn chưa có sản phẩm nào trong giỏ hàng.</Typography.Text>
          <Button type="primary" size="large">
            <Link to={ROUTES.PUBLIC.HOME}>Tiếp tục mua sắm</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <HomeHeader />
      <main className="cart-container">
        <Flex justify="space-between" align="center" className="cart-heading">
          <Link to={ROUTES.PUBLIC.HOME} className="cart-back-link">
            <ArrowLeftOutlined /> Về trang chủ
          </Link>
          <Typography.Title level={3}>Giỏ hàng của bạn</Typography.Title>
        </Flex>

        <section className="cart-card" aria-label="Sản phẩm trong giỏ hàng">
          <Flex gap={20} className="cart-product">
            <div className="cart-product-image" aria-hidden="true">
              <MobileOutlined />
            </div>
            <Flex vertical justify="space-between" className="cart-product-details">
              <div>
                <Typography.Title level={4}>{PRODUCT.name}</Typography.Title>
                <Typography.Text type="secondary">Phiên bản: {PRODUCT.variant}</Typography.Text>
              </div>
              <Button type="link" danger icon={<DeleteOutlined />} onClick={() => setHasItem(false)}>
                Xóa sản phẩm
              </Button>
            </Flex>
            <Flex vertical align="flex-end" justify="space-between" className="cart-product-price">
              <Typography.Text strong>{money.format(PRODUCT.price)}</Typography.Text>
              <Flex align="center" className="cart-quantity">
                <Button
                  aria-label="Giảm số lượng"
                  icon={<MinusOutlined />}
                  disabled={quantity === 1}
                  onClick={() => updateQuantity(quantity - 1)}
                />
                <span>{quantity}</span>
                <Button aria-label="Tăng số lượng" icon={<PlusOutlined />} onClick={() => updateQuantity(quantity + 1)} />
              </Flex>
            </Flex>
          </Flex>
          <Divider />
          <Flex justify="space-between" className="cart-subtotal">
            <Typography.Text strong>Tạm tính ({quantity} sản phẩm)</Typography.Text>
            <Typography.Text strong>{money.format(total)}</Typography.Text>
          </Flex>
        </section>

        <Form
          layout="vertical"
          className="cart-form"
          onFinish={() => messageApi.success("Thông tin đơn hàng hợp lệ. Chức năng tạo đơn sẽ được kết nối khi Checkout API sẵn sàng.")}
        >
          <section className="cart-card">
            <Typography.Title level={4}>Thông tin nhận hàng</Typography.Title>
            <Flex gap={16} className="cart-form-row">
              <Form.Item label="Họ và tên người nhận" name="recipientName" rules={[{ required: true, message: "Vui lòng nhập họ tên người nhận" }]}>
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Flex>

            <Divider />
            <Typography.Title level={4}>Địa chỉ giao hàng</Typography.Title>
            <div className="cart-address">
              <Flex gap={16} className="cart-form-row">
                <Form.Item label="Tỉnh / Thành phố" name="province" rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}>
                  <Select placeholder="Chọn tỉnh / thành phố" options={[{ value: "Hồ Chí Minh" }, { value: "Hà Nội" }]} />
                </Form.Item>
                <Form.Item label="Phường / Xã" name="ward" rules={[{ required: true, message: "Vui lòng chọn phường/xã" }]}>
                  <Select placeholder="Chọn phường / xã" options={[{ value: "Phường Bến Nghé" }, { value: "Phường Sài Gòn" }]} />
                </Form.Item>
              </Flex>
              <Form.Item label="Địa chỉ chi tiết" name="addressLine" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
                <Input prefix={<EnvironmentOutlined />} placeholder="Số nhà, tên đường" />
              </Form.Item>
            </div>

            <Form.Item label="Ghi chú đơn hàng" name="note">
              <Input.TextArea placeholder="Nhập ghi chú cho đơn hàng (nếu có)" autoSize={{ minRows: 2, maxRows: 4 }} />
            </Form.Item>
          </section>

          <section className="cart-card cart-payment" aria-label="Mã giảm giá và thanh toán">
            <Typography.Title level={4}>Mã giảm giá</Typography.Title>
            <Flex gap={12} className="cart-coupon">
              <Form.Item name="couponCode">
                <Input placeholder="Nhập mã giảm giá" />
              </Form.Item>
              <Button>Áp dụng</Button>
            </Flex>
            <Divider />
            <Typography.Title level={4}>Phương thức thanh toán</Typography.Title>
            <Form.Item name="paymentMethod" initialValue="COD">
              <Radio.Group className="cart-payment-method">
                <Radio value="COD">Thanh toán khi nhận hàng</Radio>
                <Radio value="VNPAY">VNPay</Radio>
                <Radio value="MOMO">MoMo</Radio>
                <Radio value="BANK_TRANSFER">Chuyển khoản ngân hàng</Radio>
              </Radio.Group>
            </Form.Item>
          </section>

          <section className="cart-card cart-summary" aria-label="Tổng thanh toán">
            <Flex justify="space-between">
              <Typography.Text strong>Tổng tiền</Typography.Text>
              <Typography.Text strong className="cart-summary-total">{money.format(total)}</Typography.Text>
            </Flex>
            <Typography.Text type="secondary">Phí vận chuyển và giảm giá sẽ do hệ thống xác nhận khi tạo đơn.</Typography.Text>
            <Button type="primary" size="large" block htmlType="submit">Đặt hàng</Button>
            <Typography.Text type="secondary">Thông tin thanh toán được tạo cùng đơn hàng.</Typography.Text>
          </section>
        </Form>
      </main>
    </div>
  );
}
