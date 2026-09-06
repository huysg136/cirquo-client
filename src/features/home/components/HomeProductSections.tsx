import { AppleFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useState } from "react";

import ipadImage from "../../../images/categories/ipad.webp";
import iphoneImage from "../../../images/categories/iphone.webp";
import macImage from "../../../images/categories/mac.webp";
import watchImage from "../../../images/categories/watch.webp";
import audioImage from "../../../images/categories/audio.webp";
import accessoriesImage from "../../../images/categories/accessories.webp";

interface ProductPreview {
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
}

interface ProductSection {
  title: string;
  products: ProductPreview[];
}

function ProductCard({ product }: { product: ProductPreview }) {
  const price = Number(product.price.replace(/\D/g, ""));
  const originalPrice = product.originalPrice
    ? Number(product.originalPrice.replace(/\D/g, ""))
    : 0;
  const discount =
    product.discount ??
    (originalPrice > price ? `-${Math.round(((originalPrice - price) / originalPrice) * 100)}%` : null);

  return (
    <Card hoverable className="home-product-card">
      <div className="home-product-image-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <div className="home-product-price">
        <strong>{product.price}</strong>
        {product.originalPrice && <del>{product.originalPrice}</del>}
        {discount && <span>{discount}</span>}
      </div>
    </Card>
  );
}

const productSections: ProductSection[] = [
  {
    title: "iPhone",
    products: [
      {
        name: "iPhone 17 Pro Max 256GB",
        price: "34.590.000đ",
        originalPrice: "36.990.000đ",
        image: iphoneImage,
      },
      {
        name: "iPhone 17 256GB",
        price: "24.590.000đ",
        originalPrice: "26.490.000đ",
        image: iphoneImage,
      },
      {
        name: "iPhone 15 Plus 128GB",
        price: "19.590.000đ",
        originalPrice: "21.990.000đ",
        image: iphoneImage,
      },
      {
        name: "iPhone Air 256GB",
        price: "22.990.000đ",
        originalPrice: "24.990.000đ",
        image: iphoneImage,
      },
      {
        name: "iPhone 16 Pro Max 256GB",
        price: "29.990.000đ",
        originalPrice: "31.990.000đ",
        image: iphoneImage,
      },
      {
        name: "iPhone 16 Pro 128GB",
        price: "22.490.000đ",
        originalPrice: "24.990.000đ",
        image: iphoneImage,
      },
      {
        name: "iPhone 16 128GB",
        price: "17.990.000đ",
        originalPrice: "19.990.000đ",
        image: iphoneImage,
      },
      {
        name: "iPhone 15 128GB",
        price: "15.490.000đ",
        originalPrice: "17.990.000đ",
        image: iphoneImage,
      },
    ],
  },
  {
    title: "Mac",
    products: [
      {
        name: "MacBook Neo 13 inch A18 Pro",
        price: "21.490.000đ",
        originalPrice: "22.990.000đ",
        image: macImage,
      },
      {
        name: "MacBook Neo 13 inch A18 Pro 8GB/256GB",
        price: "18.950.000đ",
        originalPrice: "19.490.000đ",
        image: macImage,
      },
      {
        name: "MacBook Air 13 inch M5 16GB/512GB",
        price: "35.490.000đ",
        originalPrice: "36.990.000đ",
        image: macImage,
      },
      {
        name: "MacBook Air 15 inch M5 16GB/512GB",
        price: "41.290.000đ",
        originalPrice: "44.990.000đ",
        image: macImage,
      },
      {
        name: "MacBook Pro 14 inch M5 Pro 512GB",
        price: "52.990.000đ",
        originalPrice: "55.990.000đ",
        image: macImage,
      },
      {
        name: "Mac mini M4 16GB/256GB",
        price: "14.990.000đ",
        originalPrice: "16.490.000đ",
        image: macImage,
      },
      {
        name: "iMac M4 24 inch 16GB/256GB",
        price: "34.990.000đ",
        originalPrice: "36.990.000đ",
        image: macImage,
      },
      {
        name: "MacBook Air 13 inch M4 16GB/256GB",
        price: "26.490.000đ",
        originalPrice: "28.990.000đ",
        image: macImage,
      },
    ],
  },
  {
    title: "iPad",
    products: [
      {
        name: "iPad Pro M5 11 inch Wi-Fi 256GB",
        price: "28.990.000đ",
        originalPrice: "30.990.000đ",
        image: ipadImage,
      },
      {
        name: "iPad Air M3 11 inch Wi-Fi 128GB",
        price: "16.490.000đ",
        originalPrice: "17.990.000đ",
        image: ipadImage,
      },
      {
        name: "iPad mini A17 Pro Wi-Fi 128GB",
        price: "12.990.000đ",
        originalPrice: "14.490.000đ",
        image: ipadImage,
      },
      {
        name: "iPad Air M3 13 inch Wi-Fi 256GB",
        price: "22.490.000đ",
        originalPrice: "23.990.000đ",
        image: ipadImage,
      },
      {
        name: "iPad Pro M5 13 inch Wi-Fi 256GB",
        price: "38.990.000đ",
        originalPrice: "40.990.000đ",
        image: ipadImage,
      },
      {
        name: "iPad 11 inch Wi-Fi 128GB",
        price: "10.990.000đ",
        originalPrice: "11.990.000đ",
        image: ipadImage,
      },
      {
        name: "iPad Air M3 11 inch Wi-Fi 256GB",
        price: "19.490.000đ",
        originalPrice: "20.990.000đ",
        image: ipadImage,
      },
      {
        name: "iPad mini A17 Pro Wi-Fi 256GB",
        price: "15.490.000đ",
        originalPrice: "16.990.000đ",
        image: ipadImage,
      },
    ],
  },
  {
    title: "Watch",
    products: [
      {
        name: "Apple Watch Series 11 GPS 42mm",
        price: "11.990.000đ",
        originalPrice: "12.990.000đ",
        image: watchImage,
      },
      {
        name: "Apple Watch Series 11 GPS 46mm",
        price: "12.990.000đ",
        originalPrice: "13.990.000đ",
        image: watchImage,
      },
      {
        name: "Apple Watch Ultra 3 GPS + Cellular 49mm",
        price: "23.990.000đ",
        originalPrice: "25.990.000đ",
        image: watchImage,
      },
      {
        name: "Apple Watch SE 3 GPS 40mm",
        price: "6.490.000đ",
        originalPrice: "7.490.000đ",
        image: watchImage,
      },
      {
        name: "Apple Watch SE 3 GPS 44mm",
        price: "7.490.000đ",
        originalPrice: "8.490.000đ",
        image: watchImage,
      },
      {
        name: "Apple Watch Hermès Series 11 42mm",
        price: "34.990.000đ",
        originalPrice: "36.990.000đ",
        image: watchImage,
      },
      {
        name: "Apple Watch Nike Series 11 GPS 46mm",
        price: "13.490.000đ",
        originalPrice: "14.490.000đ",
        image: watchImage,
      },
      {
        name: "Apple Watch Ultra 2 GPS + Cellular 49mm",
        price: "20.990.000đ",
        originalPrice: "22.990.000đ",
        image: watchImage,
      },
    ],
  },
  {
    title: "Tai nghe, loa",
    products: [
      {
        name: "AirPods Pro 3",
        price: "6.790.000đ",
        originalPrice: "7.490.000đ",
        image: audioImage,
      },
      {
        name: "AirPods 4",
        price: "3.490.000đ",
        originalPrice: "3.990.000đ",
        image: audioImage,
      },
      {
        name: "AirPods 4 chống ồn chủ động",
        price: "4.690.000đ",
        originalPrice: "4.990.000đ",
        image: audioImage,
      },
      {
        name: "AirPods Max USB-C",
        price: "12.990.000đ",
        originalPrice: "13.990.000đ",
        image: audioImage,
      },
      {
        name: "Beats Studio Pro",
        price: "7.490.000đ",
        originalPrice: "8.990.000đ",
        image: audioImage,
      },
      {
        name: "Beats Solo 4",
        price: "4.490.000đ",
        originalPrice: "5.490.000đ",
        image: audioImage,
      },
      {
        name: "Beats Pill",
        price: "3.290.000đ",
        originalPrice: "3.990.000đ",
        image: audioImage,
      },
      {
        name: "HomePod mini",
        price: "2.990.000đ",
        originalPrice: "3.490.000đ",
        image: audioImage,
      },
    ],
  },
  {
    title: "Phụ kiện",
    products: [
      {
        name: "Sạc Apple USB-C 20W",
        price: "490.000đ",
        originalPrice: "550.000đ",
        image: accessoriesImage,
      },
      {
        name: "Cáp sạc USB-C 60W 1m",
        price: "490.000đ",
        originalPrice: "590.000đ",
        image: accessoriesImage,
      },
      {
        name: "Sạc MagSafe",
        price: "990.000đ",
        originalPrice: "1.190.000đ",
        image: accessoriesImage,
      },
      {
        name: "Pin dự phòng MagSafe",
        price: "2.490.000đ",
        originalPrice: "2.990.000đ",
        image: accessoriesImage,
      },
      {
        name: "Magic Keyboard USB-C",
        price: "2.490.000đ",
        originalPrice: "2.990.000đ",
        image: accessoriesImage,
      },
      {
        name: "Magic Mouse USB-C",
        price: "1.990.000đ",
        originalPrice: "2.290.000đ",
        image: accessoriesImage,
      },
      {
        name: "Apple Pencil Pro",
        price: "3.190.000đ",
        originalPrice: "3.490.000đ",
        image: accessoriesImage,
      },
      {
        name: "AirTag",
        price: "790.000đ",
        originalPrice: "890.000đ",
        image: accessoriesImage,
      },
    ],
  },
];

export function HomeProductSections() {
  const [activePages, setActivePages] = useState<Record<string, number>>({});

  const changePage = (title: string, direction: number, totalPages: number) => {
    setActivePages((currentPages) => {
      const currentPage = currentPages[title] ?? 0;
      const nextPage = Math.min(Math.max(currentPage + direction, 0), totalPages - 1);

      return {
        ...currentPages,
        [title]: nextPage,
      };
    });
  };

  return (
    <section className="home-product-sections" aria-label="Sản phẩm nổi bật">
      {productSections.map((section) => {
        const productsPerPage = 4;
        const totalPages = Math.ceil(section.products.length / productsPerPage);
        const activePage = activePages[section.title] ?? 0;
        const productPages = Array.from(
          { length: totalPages },
          (_, pageIndex) =>
            section.products.slice(
              pageIndex * productsPerPage,
              (pageIndex + 1) * productsPerPage
            )
        );

        return (
          <div key={section.title} className="home-product-section">
            <h2>
              <AppleFilled />
              {section.title}
            </h2>

            <div className="home-product-carousel">
              <Button
                className="home-product-scroll-button home-product-scroll-button-left"
                shape="circle"
                type="text"
                icon={<LeftOutlined />}
                disabled={activePage === 0}
                aria-label={`Xem sản phẩm ${section.title} trước`}
                onClick={() => changePage(section.title, -1, totalPages)}
              />

              <div className="home-product-viewport">
                <div
                  className="home-product-track"
                  style={{ transform: `translateX(-${activePage * 100}%)` }}
                >
                  {productPages.map((products, pageIndex) => (
                    <div
                      key={pageIndex}
                      className="home-product-page"
                      aria-hidden={pageIndex !== activePage}
                    >
                      <div className="home-product-grid">
                        {products.map((product) => (
                          <ProductCard key={product.name} product={product} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="home-product-scroll-button home-product-scroll-button-right"
                shape="circle"
                type="text"
                icon={<RightOutlined />}
                disabled={activePage === totalPages - 1}
                aria-label={`Xem sản phẩm ${section.title} tiếp theo`}
                onClick={() => changePage(section.title, 1, totalPages)}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
