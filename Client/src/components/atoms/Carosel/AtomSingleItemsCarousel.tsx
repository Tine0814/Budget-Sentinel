import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  children: React.ReactNode; // Accepts any children passed to the component
}

const AtomSingleItemsCarousel: React.FC<CarouselProps> = ({ children }) => {
  const settings = {
    dots: true, // Display dots for navigation
    infinite: true, // Infinite loop scrolling
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable auto-scrolling
    autoplaySpeed: 3000, // Time between auto-scrolling (ms)
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <Slider {...settings}>
        {React.Children.map(children, (child, index) => (
          <div key={index} style={{ width: "100%" }}>
            {child}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AtomSingleItemsCarousel;
