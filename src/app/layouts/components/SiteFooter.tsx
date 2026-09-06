import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import cirquoLogo from "../../../images/cirquo-logo.webp";
import { ROUTES } from "../../router/routePaths";

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

export function SiteFooter() {
  return (
    <Layout.Footer className="site-footer">
      <div className="site-footer-content">
        <div className="site-footer-brand">
          <Link className="site-footer-logo" to={ROUTES.PUBLIC.HOME} aria-label="Trang chủ Cirquo">
            <img src={cirquoLogo} alt="Cirquo" />
          </Link>
          <p>Chuyên cung cấp sản phẩm Apple chính hãng cùng trải nghiệm mua sắm tin cậy.</p>
          <a className="site-footer-contact" href="tel:0906026912">
            <PhoneOutlined />
            <span>0906 026 912</span>
          </a>
          <a className="site-footer-contact" href="mailto:thaigiahuy6912@gmail.com">
            <MailOutlined />
            <span>thaigiahuy6912@gmail.com</span>
          </a>
        </div>

        <div className="site-footer-column">
          <h3>Sản phẩm</h3>
          <nav aria-label="Danh mục sản phẩm">
            {productLinks.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer-column">
          <h3>Tài khoản</h3>
          <nav aria-label="Tài khoản">
            {accountLinks.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer-column site-footer-support">
          <h3>Hỗ trợ khách hàng</h3>
          <p>
            <EnvironmentOutlined />
            123 Đường Công Nghệ, TP. Hồ Chí Minh
          </p>
          <p>Thứ Hai – Chủ Nhật: 08:00 – 21:00</p>
          <a
            className="site-footer-support-link"
            href="https://zalo.me/0906026912"
            target="_blank"
            rel="noreferrer"
          >
            Liên hệ tư vấn
            <RightOutlined />
          </a>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Cirquo. All rights reserved.</span>
        <span>Sản phẩm Apple chính hãng</span>
      </div>
    </Layout.Footer>
  );
}
