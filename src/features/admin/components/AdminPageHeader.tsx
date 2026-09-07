import { Flex, Typography } from "antd";
import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <Flex className="admin-page-header" align="flex-start" justify="space-between" gap={16} wrap>
      <div>
        <Typography.Title level={2}>{title}</Typography.Title>
        <Typography.Text type="secondary">{description}</Typography.Text>
      </div>
      {action}
    </Flex>
  );
}
