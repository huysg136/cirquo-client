import { Layout } from "antd";

import { CategoryGrid } from "../components/CategoryGrid";
import { HomeFooter } from "../components/HomeFooter";
import { HomeHeader } from "../components/HomeHeader";
import { HomeHero } from "../components/HomeHero";
import { HomeProductSections } from "../components/HomeProductSections";
import "../styles/home.scss";

export function HomePage() {
  return (
    <Layout className="home-page">
      <HomeHeader />
      <Layout.Content className="home-content">
        <HomeHero />
        <CategoryGrid />
        <HomeProductSections />
      </Layout.Content>
      <HomeFooter />
    </Layout>
  );
}
