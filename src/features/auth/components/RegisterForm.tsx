import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { App as AntdApp, Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../app/router/routePaths";
import { getErrorMessage } from "../../../shared/config/errorMessages";
import { registerRequest } from "../services/auth.service";
import type { RegisterFormValues } from "../types/auth.types";

const PHONE_PATTERN = /^0[35789]\d{8}$/;

export function RegisterForm() {
  const navigate = useNavigate();
  const { message: messageApi } = AntdApp.useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values: RegisterFormValues): Promise<void> {
    setIsSubmitting(true);
    try {
      await registerRequest(values);
      messageApi.success("Tạo tài khoản thành công. Hãy đăng nhập để tiếp tục.");
      navigate(ROUTES.USER.LOGIN);
    } catch (error) {
      messageApi.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form<RegisterFormValues>
      className="auth-form"
      layout="vertical"
      requiredMark={false}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="fullName"
        rules={[
          { required: true, message: "Vui lòng nhập họ và tên." },
          { max: 100, message: "Họ và tên không được quá 100 ký tự." },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          aria-label="Họ và tên"
          autoComplete="name"
          placeholder="Họ và tên"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email." },
          { type: "email", message: "Email không đúng định dạng." },
          { max: 255, message: "Email không được quá 255 ký tự." },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          aria-label="Email"
          autoComplete="email"
          placeholder="you@gmail.com"
        />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ pattern: PHONE_PATTERN, message: "Số điện thoại chưa đúng định dạng." }]}
      >
        <Input
          prefix={<PhoneOutlined />}
          aria-label="Số điện thoại"
          autoComplete="tel"
          placeholder="Số điện thoại (không bắt buộc)"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Vui lòng nhập mật khẩu." },
          { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự." },
          { max: 72, message: "Mật khẩu không được quá 72 ký tự." },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          aria-label="Mật khẩu"
          autoComplete="new-password"
          placeholder="Tạo mật khẩu"
        />
      </Form.Item>

      <Button
        className="auth-submit-button"
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
      >
        Đăng ký
      </Button>
    </Form>
  );
}
