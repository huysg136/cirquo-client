import { FolderOpenOutlined, ShoppingOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "../../../app/router/routePaths";
import { AdminPageHeader } from "../components/AdminPageHeader";
import "../styles/admin.scss";

const shortcuts = [
  { icon: <TeamOutlined />, title: "Tài khoản", text: "Tìm kiếm và quản lý tài khoản khách hàng, nhân viên.", to: ROUTES.ADMIN.USERS },
  { icon: <FolderOpenOutlined />, title: "Danh mục", text: "Tổ chức các nhóm sản phẩm Apple trên cửa hàng.", to: ROUTES.ADMIN.CATEGORIES },
  { icon: <ShoppingOutlined />, title: "Sản phẩm", text: "Tạo, cập nhật và kiểm soát trạng thái sản phẩm.", to: ROUTES.ADMIN.PRODUCTS },
];

export function AdminDashboardPage() {
  return (
    <section className="admin-page">
      <AdminPageHeader title="Tổng quan" description="Chọn khu vực bạn muốn quản lý." />
      <Row gutter={[20, 20]}>
        {shortcuts.map((shortcut) => (
          <Col key={shortcut.to} xs={24} md={8}>
            <Link to={shortcut.to} className="admin-shortcut-link">
              <Card className="admin-shortcut-card">
                <span className="admin-shortcut-icon">{shortcut.icon}</span>
                <Typography.Title level={4}>{shortcut.title}</Typography.Title>
                <Typography.Text type="secondary">{shortcut.text}</Typography.Text>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
}
