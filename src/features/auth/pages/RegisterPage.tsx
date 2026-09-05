import { Card, Flex, Typography } from "antd";
import { Link, Navigate } from "react-router-dom";

import { ROUTES } from "../../../app/router/routePaths";
import { AuthBrand } from "../components/AuthBrand";
import { RegisterForm } from "../components/RegisterForm";
import "../styles/auth.scss";
import { useAuthStore } from "../store/auth.store";

const { Paragraph, Text, Title } = Typography;

export function RegisterPage() {
  const user = useAuthStore((state) => state.user);

  if (user) return <Navigate replace to={ROUTES.PUBLIC.HOME} />;

  return (
    <Flex align="center" justify="center" className="auth-page auth-page--register">
      <Card
        className="auth-card auth-card--register"
        styles={{ body: { height: "100%", padding: 0 } }}
      >
        <Flex vertical className="auth-content">
          <AuthBrand />

          <Flex vertical justify="center" className="auth-center-content">
            <Title level={1} className="auth-title">
              Tạo tài khoản
            </Title>
            <Paragraph className="auth-subtitle">
              Đăng ký để mua sắm và quản lý đơn hàng tại Cirquo.
            </Paragraph>
            <RegisterForm />
          </Flex>

          <Text className="auth-footer">
            Bạn đã có tài khoản?{" "}
            <Link className="auth-link" to={ROUTES.USER.LOGIN}>
              Đăng nhập
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
