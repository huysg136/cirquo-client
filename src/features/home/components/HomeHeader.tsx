import {
  LaptopOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Flex, Image, Input, Layout, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import cirquoLogo from "../../../images/cirquo-logo.png";
import { ROUTES } from "../../../app/router/routePaths";

const navigationItems = ["iPhone", "Mac", "iPad", "Watch", "Tai nghe, loa", "Phụ kiện"];

export function HomeHeader() {
  const navigate = useNavigate();

  return (
    <Layout.Header className="home-header">
      <Flex align="center" justify="space-between" className="home-header-content">
        <Link className="home-brand" to="/" aria-label="Trang chủ Cirquo">
          <Image preview={false} src={cirquoLogo} alt="Cirquo" />
        </Link>

        <Flex align="center" gap={40} className="home-navigation">
          {navigationItems.map((item) => (
            <Typography.Link key={item} className="home-navigation-link">
              {item}
            </Typography.Link>
          ))}
        </Flex>

        <Flex align="center" gap={10} className="home-header-actions">
          <Input
            className="home-search"
            prefix={<SearchOutlined />}
            placeholder="Tìm sản phẩm"
            aria-label="Tìm sản phẩm"
          />
          <Badge count={0} showZero={false}>
            <Button
              shape="circle"
              type="text"
              icon={<ShoppingCartOutlined />}
              aria-label="Giỏ hàng"
            />
          </Badge>
          <Badge count={0} showZero={false}>
            <Button
              shape="circle"
              type="text"
              icon={<UserOutlined />}
              aria-label="Đăng nhập"
              onClick={() => navigate(ROUTES.USER.LOGIN)}
            />
          </Badge>
        </Flex>
      </Flex>

      <Flex align="center" gap={8} className="home-mobile-nav">
        <LaptopOutlined />
        <Typography.Text>Thiết bị công nghệ chính hãng</Typography.Text>
      </Flex>
    </Layout.Header>
  );
}
