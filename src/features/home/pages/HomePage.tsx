import { CategoryGrid } from "../components/CategoryGrid";
import { HomeHero } from "../components/HomeHero";
import { HomeProductSections } from "../components/HomeProductSections";
import "../styles/home.scss";

export function HomePage() {
  return (
    <div className="home-page">
      <HomeHero />
      <CategoryGrid />
      <HomeProductSections />
    </div>
  );
}
