import {
  EnvironmentOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Flex,
  Image,
  Input,
  Layout,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../auth/store/auth.store";

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
  const navigateFromMobileMenu = (path: string) => {
    closeMobileMenu();
    navigate(path);
  };

  const user = useAuthStore((state) => state.user);
  const displayName =
    user?.fullName?.trim().split(/\s+/).at(-1) ?? user?.email.split("@")[0] ?? "Đăng nhập";

  const accountMenuItems = [
    {
      key: "profile",
      label: (
        <span className="home-account-menu-label">
          <UserOutlined />
          Thông tin cá nhân
        </span>
      ),
      onClick: () => navigate(ROUTES.USER.PROFILE),
    },
    {
      key: "addresses",
      label: (
        <span className="home-account-menu-label">
          <EnvironmentOutlined />
          Địa chỉ giao hàng
        </span>
      ),
      onClick: () => navigate(ROUTES.USER.ADDRESSES),
    },
    {
      key: "orders",
      label: (
        <span className="home-account-menu-label">
          <FileTextOutlined />
          Đơn hàng của tôi
        </span>
      ),
      onClick: () => navigate(ROUTES.USER.ORDERS),
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      danger: true,
      label: (
        <span className="home-account-menu-label">
          <LogoutOutlined />
          Đăng xuất
        </span>
      ),
      onClick: () => {
        logout();
        navigate(ROUTES.PUBLIC.HOME);
      },
    },
  ];

  const logout = useAuthStore((state) => state.logout);

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
          <Badge className="home-cart-badge" count={1} showZero={false}>
            <Button
              shape="circle"
              type="text"
              icon={<ShoppingCartOutlined />}
              aria-label="Giỏ hàng"
              onClick={() => navigate(ROUTES.PUBLIC.CART)}
            />
          </Badge>
          {user ? (
            <Dropdown
              menu={{ items: accountMenuItems }}
              trigger={["hover"]}
              placement="bottomRight"
              overlayClassName="home-account-button-dropdown"
            >
              <Button className="home-account-button" type="text" icon={<UserOutlined />}>
                <span className="home-account-button-name">{displayName}</span>
              </Button>
            </Dropdown>
          ) : (
            <Button
              className="home-account-button"
              type="text"
              icon={<UserOutlined />}
              onClick={() => navigate(ROUTES.USER.LOGIN)}
            >
              <span className="home-account-button-name">Đăng nhập</span>
            </Button>
          )}
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
        {user ? (
          <Flex vertical gap={16} className="home-mobile-account">
            <Flex align="center" gap={12} className="home-mobile-account-summary">
              <Avatar size={40} icon={<UserOutlined />} />
              <Flex vertical gap={0}>
                <Typography.Text className="home-mobile-account-label">Tài khoản</Typography.Text>
                <Typography.Text strong>{displayName}</Typography.Text>
              </Flex>
            </Flex>

            <Flex vertical gap={4} className="home-mobile-account-actions">
              <Button
                block
                type="text"
                icon={<UserOutlined />}
                onClick={() => navigateFromMobileMenu(ROUTES.USER.PROFILE)}
              >
                Hồ sơ cá nhân
              </Button>
              <Button
                block
                type="text"
                icon={<EnvironmentOutlined />}
                onClick={() => navigateFromMobileMenu(ROUTES.USER.ADDRESSES)}
              >
                Địa chỉ giao hàng
              </Button>
              <Button
                block
                type="text"
                icon={<FileTextOutlined />}
                onClick={() => navigateFromMobileMenu(ROUTES.USER.ORDERS)}
              >
                Đơn hàng của tôi
              </Button>
              <Button
                block
                danger
                type="text"
                icon={<LogoutOutlined />}
                onClick={() => {
                  logout();
                  navigateFromMobileMenu(ROUTES.PUBLIC.HOME);
                }}
              >
                Đăng xuất
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Button
            block
            className="home-mobile-login"
            icon={<UserOutlined />}
            onClick={() => navigateFromMobileMenu(ROUTES.USER.LOGIN)}
          >
            Đăng nhập
          </Button>
        )}
      </Drawer>
    </Layout.Header>
  );
}
