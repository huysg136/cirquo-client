import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Drawer, Flex, Image, Input, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import cirquoLogo from "../../../images/cirquo-logo.png";
import { ROUTES } from "../../../app/router/routePaths";

const navigationItems = [
  { label: "iPhone", path: ROUTES.CATEGORY.IPHONE },
  { label: "Mac", path: ROUTES.CATEGORY.MAC },
  { label: "iPad", path: ROUTES.CATEGORY.IPAD },
  { label: "Watch", path: ROUTES.CATEGORY.WATCH },
  { label: "Tai nghe, loa", path: ROUTES.CATEGORY.HEADPHONES },
  { label: "Phụ kiện", path: ROUTES.CATEGORY.ACCESSORIES },
];

export function HomeHeader() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <Layout.Header className="home-header">
      <Flex align="center" justify="space-between" className="home-header-content">
        <Link className="home-brand" to="/" aria-label="Trang chủ Cirquo">
          <Image preview={false} src={cirquoLogo} alt="Cirquo" />
        </Link>

        <Flex align="center" gap={40} className="home-navigation">
          {navigationItems.map((item) => (
            <Link key={item.path} className="home-navigation-link" to={item.path}>
              {item.label}
            </Link>
          ))}
        </Flex>

        <Flex align="center" gap={10} className="home-header-actions">
          <Input
            className="home-search"
            prefix={<SearchOutlined />}
            placeholder="Tìm sản phẩm"
            aria-label="Tìm sản phẩm"
          />
          <Badge className="home-cart-badge" count={100} showZero={false}>
            <Button
              shape="circle"
              type="text"
              icon={<ShoppingCartOutlined />}
              aria-label="Giỏ hàng"
            />
          </Badge>
          <Button
            className="home-account-button"
            shape="circle"
            type="text"
            icon={<UserOutlined />}
            aria-label="Đăng nhập"
            onClick={() => navigate(ROUTES.USER.LOGIN)}
          />
          <Button
            className="home-menu-button"
            shape="circle"
            type="text"
            icon={<MenuOutlined />}
            aria-label="Mở menu"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </Flex>
      </Flex>

      <Drawer
        className="home-mobile-drawer"
        title="Danh mục"
        placement="right"
        open={isMobileMenuOpen}
        onClose={closeMobileMenu}
      >
        <Flex vertical className="home-mobile-navigation">
          {navigationItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={closeMobileMenu}>
              {item.label}
            </Link>
          ))}
        </Flex>
        <Button
          block
          className="home-mobile-login"
          icon={<UserOutlined />}
          onClick={() => {
            closeMobileMenu();
            navigate(ROUTES.USER.LOGIN);
          }}
        >
          Đăng nhập
        </Button>
      </Drawer>
    </Layout.Header>
  );
}
