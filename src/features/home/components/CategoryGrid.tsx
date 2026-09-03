import type { ReactNode } from "react";
import {
  ClockCircleOutlined,
  CustomerServiceOutlined,
  DesktopOutlined,
  MobileOutlined,
  SoundOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";

interface Category {
  name: string;
  icon: ReactNode;
}

const categories: Category[] = [
  { name: "Điện thoại", icon: <MobileOutlined /> },
  { name: "Laptop", icon: <DesktopOutlined /> },
  { name: "Tablet", icon: <TabletOutlined /> },
  { name: "Đồng hồ", icon: <ClockCircleOutlined /> },
  { name: "Âm thanh", icon: <CustomerServiceOutlined /> },
  { name: "Phụ kiện", icon: <SoundOutlined /> },
];

export function CategoryGrid() {
  return (
    <section className="home-categories" aria-label="Danh mục sản phẩm">
      <div className="home-category-grid">
        {categories.map((category) => (
          <Card key={category.name} hoverable className="home-category-card">
            <Flex vertical align="center" gap={14}>
              <span className="home-category-icon">{category.icon}</span>
              <Typography.Text strong>{category.name}</Typography.Text>
            </Flex>
          </Card>
        ))}
      </div>
    </section>
  );
}
