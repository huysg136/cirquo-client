import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./styles/storeLayout.scss";

export function StoreLayout() {
  return (
    <Layout className="store-layout">
      <SiteHeader />
      <Layout.Content className="store-content">
        <Outlet />
      </Layout.Content>
      <SiteFooter />
    </Layout>
  );
}
