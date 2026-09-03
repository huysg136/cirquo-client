import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getErrorMessage } from "../../../shared/config/errorMessages";
import { useAuthStore } from "../store/auth.store";
import type { LoginFormValues } from "../types/auth.types";

export function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const status = useAuthStore((state) => state.status);

  async function handleSubmit({ email, password, rememberMe }: LoginFormValues): Promise<void> {
    try {
      await login({ email, password }, rememberMe);
      toast.success("Đăng nhập thành công.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <Form<LoginFormValues>
      className="auth-form"
      layout="vertical"
      requiredMark={false}
      initialValues={{ rememberMe: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email." },
          { type: "email", message: "Email không đúng định dạng." },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          aria-label="Email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu." }]}>
        <Input.Password
          prefix={<LockOutlined />}
          aria-label="Mật khẩu"
          autoComplete="current-password"
          placeholder="Nhập mật khẩu"
        />
      </Form.Item>

      <Flex align="center" justify="space-between" className="auth-form-actions">
        <Form.Item name="rememberMe" valuePropName="checked" noStyle>
          <Checkbox>Duy trì đăng nhập</Checkbox>
        </Form.Item>
        <Link className="auth-link" to="/forgot-password">
          Quên mật khẩu?
        </Link>
      </Flex>

      <Button
        className="auth-submit-button"
        type="primary"
        htmlType="submit"
        loading={status === "loading"}
      >
        Đăng nhập
      </Button>
    </Form>
  );
}
