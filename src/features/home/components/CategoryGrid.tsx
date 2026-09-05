import { Card, Flex, Typography } from "antd";

import accessoriesImage from "../../../images/categories/accessories.png";
import audioImage from "../../../images/categories/audio.png";
import ipadImage from "../../../images/categories/ipad.png";
import iphoneImage from "../../../images/categories/iphone.png";
import macImage from "../../../images/categories/mac.png";
import watchImage from "../../../images/categories/watch.png";
import { ROUTES } from "../../../app/router/routePaths";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  image: string;
  path: string;
}

const categories: Category[] = [
  { name: "iPhone", image: iphoneImage, path: ROUTES.CATEGORY.IPHONE },
  { name: "Mac", image: macImage, path: ROUTES.CATEGORY.MAC },
  { name: "iPad", image: ipadImage, path: ROUTES.CATEGORY.IPAD },
  { name: "Watch", image: watchImage, path: ROUTES.CATEGORY.WATCH },
  { name: "Tai nghe, loa", image: audioImage, path: ROUTES.CATEGORY.HEADPHONES },
  { name: "Phụ kiện", image: accessoriesImage, path: ROUTES.CATEGORY.ACCESSORIES },
];

export function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section className="home-categories" aria-label="Danh mục sản phẩm">
      <div className="home-category-grid">
        {categories.map((category) => (
          <Card key={category.name} hoverable className="home-category-card">
            <Flex
              vertical
              align="center"
              justify="space-between"
              className="home-category-card-content"
            >
              <img className="home-category-image" src={category.image} alt="" onClick={() => navigate(category.path)} />
              <Typography.Text strong>{category.name}</Typography.Text>
            </Flex>
          </Card>
        ))}
      </div>
    </section>
  );
}
