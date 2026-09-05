import { Card, Flex, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { AuthBrand } from "../components/AuthBrand";
import { LoginForm } from "../components/LoginForm";
import "../styles/auth.scss";
import { useAuthStore } from "../store/auth.store";
import { ROUTES } from "../../../app/router/routePaths";

const { Paragraph, Text, Title } = Typography;

export function LoginPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  if (user) {
    navigate(ROUTES.PUBLIC.HOME);
  }

  return (
    <Flex align="center" justify="center" className="auth-page">
      <Card className="auth-card" styles={{ body: { height: "100%", padding: 0 } }}>
        <Flex vertical className="auth-content">
          <AuthBrand />

          <Flex vertical justify="center" className="auth-center-content">
            <Title level={1} className="auth-title">
              Chào mừng
              <br />
              trở lại
            </Title>
            <Paragraph className="auth-subtitle">
              Đăng nhập để tiếp tục khám phá thế giới công nghệ cùng Cirquo.
            </Paragraph>
            <LoginForm />
          </Flex>

          <Text className="auth-footer">
            Bạn chưa có tài khoản?{" "}
            <Link className="auth-link" to="/register">
              Đăng ký ngay
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
