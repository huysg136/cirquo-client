import { Card, Flex, Typography } from "antd";
import { Link } from "react-router-dom";

import { AuthBrand } from "../components/AuthBrand";
import { LoginForm } from "../components/LoginForm";
import "../styles/auth.css";

const { Paragraph, Text, Title } = Typography;

export function LoginPage() {
  return (
    <Flex align="center" justify="center" className="auth-page">
      <Card className="auth-card" styles={{ body: { height: "100%", padding: 0 } }}>
        <Flex vertical className="auth-content">
          <AuthBrand />

          <Flex vertical justify="center" className="auth-center-content">
            <Title level={1} className="auth-title">
              Holla,
              <br />
              Welcome Back
            </Title>
            <Paragraph className="auth-subtitle">Hey, welcome back to your special place</Paragraph>
            <LoginForm />
          </Flex>

          <Text className="auth-footer">
            New to Cirquo?{" "}
            <Link className="auth-link" to="/register">
              Create an account
            </Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
