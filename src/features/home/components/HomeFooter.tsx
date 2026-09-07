import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "../../../app/router/routePaths";
import cirquoLogo from "../../../images/cirquo-logo.webp";

const productLinks = [
  { label: "iPhone", path: ROUTES.CATEGORY.IPHONE },
  { label: "Mac", path: ROUTES.CATEGORY.MAC },
  { label: "iPad", path: ROUTES.CATEGORY.IPAD },
  { label: "Apple Watch", path: ROUTES.CATEGORY.WATCH },
  { label: "Tai nghe, loa", path: ROUTES.CATEGORY.HEADPHONES },
  { label: "Phụ kiện", path: ROUTES.CATEGORY.ACCESSORIES },
];

const accountLinks = [
  { label: "Thông tin cá nhân", path: ROUTES.USER.PROFILE },
  { label: "Địa chỉ giao hàng", path: ROUTES.USER.ADDRESSES },
  { label: "Đơn hàng của tôi", path: ROUTES.USER.ORDERS },
  { label: "Giỏ hàng", path: ROUTES.PUBLIC.CART },
];

export function HomeFooter() {
  return (
    <Layout.Footer className="home-footer">
      <div className="home-footer-content">
        <div className="home-footer-brand">
          <Link className="home-footer-logo" to={ROUTES.PUBLIC.HOME} aria-label="Trang chủ Cirquo">
            <img src={cirquoLogo} alt="Cirquo" />
          </Link>
          <p>Chuyên cung cấp sản phẩm Apple chính hãng cùng trải nghiệm mua sắm tin cậy.</p>
          <a className="home-footer-contact" href="tel:19001009">
            <PhoneOutlined />
            <span>0906 026 912</span>
          </a>
          <a className="home-footer-contact" href="mailto:thaigiahuy6912@gmail.com">
            <MailOutlined />
            <span>thaigiahuy6912@gmail.com</span>
          </a>
        </div>

        <div className="home-footer-column">
          <h3>Sản phẩm</h3>
          <nav aria-label="Danh mục sản phẩm">
            {productLinks.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="home-footer-column">
          <h3>Tài khoản</h3>
          <nav aria-label="Tài khoản">
            {accountLinks.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="home-footer-column home-footer-support">
          <h3>Hỗ trợ khách hàng</h3>
          <p>
            <EnvironmentOutlined />
            123 Đường Công Nghệ, TP. Hồ Chí Minh
          </p>
          <p>Thứ Hai – Chủ Nhật: 08:00 – 21:00</p>
          <a
            className="home-footer-support-link"
            href="https://zalo.me/0906026912"
            target="_blank"
            rel="noreferrer"
          >
            Liên hệ tư vấn
            <RightOutlined />
          </a>
        </div>
      </div>

      <div className="home-footer-bottom">
        <span>© {new Date().getFullYear()} Cirquo. All rights reserved.</span>
        <span>Sản phẩm Apple chính hãng</span>
      </div>
    </Layout.Footer>
  );
}
