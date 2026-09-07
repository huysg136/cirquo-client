import {
  AppstoreOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Typography } from "antd";
import { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../features/auth/store/auth.store";
import { ROUTES } from "../router/routePaths";
import "./styles/adminLayout.scss";

const menuItems = [
  { key: ROUTES.ADMIN.DASHBOARD, icon: <AppstoreOutlined />, label: "Tổng quan" },
  { key: ROUTES.ADMIN.USERS, icon: <TeamOutlined />, label: "Tài khoản" },
  { key: ROUTES.ADMIN.CATEGORIES, icon: <FolderOpenOutlined />, label: "Danh mục" },
  { key: ROUTES.ADMIN.PRODUCTS, icon: <ShoppingOutlined />, label: "Sản phẩm" },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const selectedKey = useMemo(
    () => menuItems.find((item) => location.pathname.startsWith(item.key))?.key ?? ROUTES.ADMIN.DASHBOARD,
    [location.pathname],
  );

  function handleLogout(): void {
    logout();
    navigate(ROUTES.USER.LOGIN, { replace: true });
  }

  return (
    <Layout className="admin-layout">
      <Layout.Sider breakpoint="lg" collapsedWidth="0" className="admin-sidebar">
        <button className="admin-brand" type="button" onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}>
          Cirquo <span>Admin</span>
        </button>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
        <div className="admin-sidebar-bottom">
          <Typography.Text>{user?.fullName ?? user?.email}</Typography.Text>
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </Layout.Sider>
      <Layout>
        <Layout.Header className="admin-header">
          <Button icon={<HomeOutlined />} type="text" onClick={() => navigate(ROUTES.PUBLIC.HOME)}>
            Xem cửa hàng
          </Button>
          <Typography.Text>{user?.roleName}</Typography.Text>
        </Layout.Header>
        <Layout.Content className="admin-content">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
