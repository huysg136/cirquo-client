import { Layout } from "antd";

import { CategoryGrid } from "../components/CategoryGrid";
import { HomeHeader } from "../components/HomeHeader";
import { HomeHero } from "../components/HomeHero";
import "../styles/home.css";

export function HomePage() {
  return (
    <Layout className="home-page">
      <HomeHeader />
      <Layout.Content className="home-content">
        <HomeHero />
        <CategoryGrid />
      </Layout.Content>
    </Layout>
  );
}
