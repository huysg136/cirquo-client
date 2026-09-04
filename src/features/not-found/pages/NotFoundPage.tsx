import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../app/router/routePaths";
import "../styles/notFound.scss";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <Result
        status="404"
        title="404"
        subTitle="Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển."
        extra={
          <Button type="primary" onClick={() => navigate(ROUTES.PUBLIC.HOME)}>
            Về trang chủ
          </Button>
        }
      />
    </main>
  );
}