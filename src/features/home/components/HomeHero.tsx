import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Carousel, Image } from "antd";
import type { CarouselRef } from "antd";
import { useRef, useState } from "react";

import iphone17Banner from "../assets/banners/iphone-17-cirquo.png";
import iphone17ProMaxBanner from "../assets/banners/iphone-17-pro-max-cirquo.png";
import { useNavigate } from "react-router-dom";

interface Banner {
  image: string;
  alt: string;
  path: string;
}

const banners: Banner[] = [
  { image: iphone17ProMaxBanner, alt: "iPhone 17 Pro Max tại Cirquo", path: "/iphone/iphone-17" },
  { image: iphone17Banner, alt: "iPhone 17 tại Cirquo", path: "/iphone/iphone-17" },
];

export function HomeHero() {
  const carouselRef = useRef<CarouselRef | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  return (
    <section className="home-hero" aria-label="Ưu đãi nổi bật">
      <Carousel
        ref={carouselRef}
        autoplay
        autoplaySpeed={7000}
        dots={false}
        className="home-banner-carousel"
        afterChange={setActiveSlide}
      >
        {banners.map((banner) => (
          <div key={banner.alt} className="home-banner-slide">
            <Image preview={false} src={banner.image} alt={banner.alt} onClick={() => navigate(banner.path)} />
          </div>
        ))}
      </Carousel>

      <Button
        className="home-slider-button home-slider-button-left"
        shape="circle"
        icon={<LeftOutlined />}
        aria-label="Banner trước"
        onClick={() => carouselRef.current?.prev()}
      />
      <Button
        className="home-slider-button home-slider-button-right"
        shape="circle"
        icon={<RightOutlined />}
        aria-label="Banner tiếp theo"
        onClick={() => carouselRef.current?.next()}
      />

      <div className="home-slider-dots" aria-label="Chọn banner">
        {banners.map((banner, index) => (
          <button
            key={banner.alt}
            className={index === activeSlide ? "is-active" : ""}
            type="button"
            aria-label={`Hiển thị banner ${index + 1}`}
            aria-current={index === activeSlide ? "true" : undefined}
            onClick={() => carouselRef.current?.goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
