import {
  AppstoreOutlined,
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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../features/auth/store/auth.store";
import cirquoLogo from "../../../images/cirquo-logo.webp";
import { ROUTES } from "../../router/routePaths";

const navigationItems = [
  { label: "iPhone", path: ROUTES.CATEGORY.IPHONE },
  { label: "Mac", path: ROUTES.CATEGORY.MAC },
  { label: "iPad", path: ROUTES.CATEGORY.IPAD },
  { label: "Watch", path: ROUTES.CATEGORY.WATCH },
  { label: "Tai nghe, loa", path: ROUTES.CATEGORY.HEADPHONES },
  { label: "Phụ kiện", path: ROUTES.CATEGORY.ACCESSORIES },
];

export function SiteHeader() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const canAccessAdmin = user?.roleName === "ADMIN" || user?.roleName === "STAFF";

  const displayName =
    user?.fullName?.trim().split(/\s+/).at(-1) ?? user?.email.split("@")[0] ?? "Đăng nhập";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const navigateFromMobileMenu = (path: string) => {
    closeMobileMenu();
    navigate(path);
  };

  const accountMenuItems = [
    {
      key: "profile",
      label: (
        <span className="site-account-menu-label">
          <UserOutlined />
          Thông tin cá nhân
        </span>
      ),
      onClick: () => navigate(ROUTES.USER.PROFILE),
    },
    {
      key: "addresses",
      label: (
        <span className="site-account-menu-label">
          <EnvironmentOutlined />
          Địa chỉ giao hàng
        </span>
      ),
      onClick: () => navigate(ROUTES.USER.ADDRESSES),
    },
    {
      key: "orders",
      label: (
        <span className="site-account-menu-label">
          <FileTextOutlined />
          Đơn hàng của tôi
        </span>
      ),
      onClick: () => navigate(ROUTES.USER.ORDERS),
    },
    ...(canAccessAdmin
      ? [
          {
            key: "admin",
            label: (
              <span className="site-account-menu-label">
                <AppstoreOutlined />
                Trang quản trị
              </span>
            ),
            onClick: () => navigate(ROUTES.ADMIN.DASHBOARD),
          },
        ]
      : []),
    { type: "divider" as const },
    {
      key: "logout",
      danger: true,
      label: (
        <span className="site-account-menu-label">
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

  return (
    <Layout.Header className="site-header">
      <Flex align="center" justify="space-between" className="site-header-content">
        <Link className="site-brand" to={ROUTES.PUBLIC.HOME} aria-label="Trang chủ Cirquo">
          <Image preview={false} src={cirquoLogo} alt="Cirquo" />
        </Link>

        <Flex align="center" gap={40} className="site-navigation">
          {navigationItems.map((item) => (
            <Link key={item.path} className="site-navigation-link" to={item.path}>
              {item.label}
            </Link>
          ))}
        </Flex>

        <Flex align="center" gap={10} className="site-header-actions">
          <Input
            className="site-search"
            prefix={<SearchOutlined />}
            placeholder="Tìm sản phẩm"
            aria-label="Tìm sản phẩm"
          />
          <Badge className="site-cart-badge" count={1} showZero={false}>
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
              overlayClassName="site-account-button-dropdown"
            >
              <Button className="site-account-button" type="text" icon={<UserOutlined />}>
                <span className="site-account-button-name">{displayName}</span>
              </Button>
            </Dropdown>
          ) : (
            <Button
              className="site-account-button"
              type="text"
              icon={<UserOutlined />}
              onClick={() => navigate(ROUTES.USER.LOGIN)}
            >
              <span className="site-account-button-name">Đăng nhập</span>
            </Button>
          )}
          <Button
            className="site-menu-button"
            shape="circle"
            type="text"
            icon={<MenuOutlined />}
            aria-label="Mở menu"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </Flex>
      </Flex>

      <Drawer
        className="site-mobile-drawer"
        title="Danh mục"
        placement="right"
        open={isMobileMenuOpen}
        onClose={closeMobileMenu}
      >
        <Flex vertical className="site-mobile-navigation">
          {navigationItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={closeMobileMenu}>
              {item.label}
            </Link>
          ))}
        </Flex>
        {user ? (
          <Flex vertical gap={16} className="site-mobile-account">
            <Flex align="center" gap={12} className="site-mobile-account-summary">
              <Avatar size={40} icon={<UserOutlined />} />
              <Flex vertical gap={0}>
                <Typography.Text className="site-mobile-account-label">Tài khoản</Typography.Text>
                <Typography.Text strong>{displayName}</Typography.Text>
              </Flex>
            </Flex>

            <Flex vertical gap={4} className="site-mobile-account-actions">
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
              {canAccessAdmin ? (
                <Button
                  block
                  type="text"
                  icon={<AppstoreOutlined />}
                  onClick={() => navigateFromMobileMenu(ROUTES.ADMIN.DASHBOARD)}
                >
                  Trang quản trị
                </Button>
              ) : null}
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
            className="site-mobile-login"
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
