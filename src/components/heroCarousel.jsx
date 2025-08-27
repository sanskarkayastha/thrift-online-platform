import React, { useState, useEffect } from "react";
import "../Css/HeroCarousel.css";
import clothing from "../Assets/clothing.avif";
import cars from "../Assets/cars.avif";
import laptop from "../Assets/laptop.avif";
import { NavLink } from "react-router";


const HeroCarousel = () => {
  const images = [clothing,cars,laptop];
  const [currentIndex, setCurrentIndex] = useState(0);

 
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero-carousel">
      <div
        className="hero-slide"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Discover Unique Finds</h1>
            <p>
              Explore a curated collection of pre-loved fashion and vintage
              treasures.
            </p>
            <NavLink to="/products" className="btn-primary">
              Shop Now
            </NavLink>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
