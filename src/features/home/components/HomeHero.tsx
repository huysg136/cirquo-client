import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Carousel, Image } from "antd";
import type { CarouselRef } from "antd";
import { useRef, useState } from "react";

import cirquoLogo from "../../../images/cirquo-logo.png";
import iphone17Banner from "../assets/iphone-17-banner.png";
import iphone17ProBanner from "../assets/iphone-17-pro-banner.png";

interface Banner {
  image: string;
  alt: string;
}

const banners: Banner[] = [
  { image: iphone17ProBanner, alt: "Ưu đãi iPhone 17 Pro Max" },
  { image: iphone17Banner, alt: "Ưu đãi iPhone 17" },
];

export function HomeHero() {
  const carouselRef = useRef<CarouselRef | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

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
            <Image preview={false} src={banner.image} alt={banner.alt} />
            <span className="home-banner-brand" aria-label="Cirquo">
              <Image preview={false} src={cirquoLogo} alt="Cirquo" />
            </span>
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
