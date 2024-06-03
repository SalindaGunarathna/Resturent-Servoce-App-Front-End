import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import "../../styles/hero-slider.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 4000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container>
          <div className="slider__content d-flex justify-content-center align-items-center text-center">
            <div>
              <h1 className="text-highlight mb-3">Discover Culinary Delights</h1>
              <h4 className="text-highlight mb-4">Join us for an unforgettable dining experience</h4>
            </div>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container>
          <div className="slider__content d-flex justify-content-center align-items-center text-center">
            <div>
              <h1 className="text-highlight mb-3">Savor the Flavors</h1>
              <h4 className="text-highlight mb-4">Indulge in our exquisite menu</h4>
            </div>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container>
          <div className="slider__content d-flex justify-content-center align-items-center text-center">
            <div>
              <h1 className="text-highlight mb-3">A Feast for Your Senses</h1>
              <h4 className="text-highlight mb-4">Experience the ambiance</h4>
            </div>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-04 mt0">
        <Container>
          <div className="slider__content d-flex justify-content-center align-items-center text-center">
            <div>
              <h1 className="text-highlight mb-3">Delicious Moments</h1>
              <h4 className="text-highlight mb-4">Create memories with every bite</h4>
            </div>
          </div>
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;
