import React from "react";
import HeroCarousel from "../../components/heroCarousel";
import CardListing from "../../components/CardListing";

const HomePage = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <HeroCarousel/>
      </section>

      {/* Featured Items section */}
      <section>
        <CardListing/>
      </section>

    </div>
  );
};

export default HomePage;
