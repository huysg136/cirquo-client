import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getErrorMessage } from "../../../shared/config/errorMessages";
import { useAuthStore } from "../store/auth.store";

export function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const status = useAuthStore((state) => state.status);

  async function handleSubmit({ email, password, rememberMe = false }) {
    try {
      await login({ email, password }, rememberMe);
      toast.success("Signed in successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <Form
      className="auth-form"
      layout="vertical"
      requiredMark={false}
      initialValues={{ rememberMe: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please enter your email address." },
          { type: "email", message: "Please enter a valid email address." },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          aria-label="Email address"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your password." }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          aria-label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
        />
      </Form.Item>

      <Flex align="center" justify="space-between" className="auth-form-actions">
        <Form.Item name="rememberMe" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Link className="auth-link" to="/forgot-password">
          Forgot password?
        </Link>
      </Flex>

      <Button
        className="auth-submit-button"
        type="primary"
        htmlType="submit"
        loading={status === "loading"}
      >
        Sign in
      </Button>
    </Form>
  );
}
