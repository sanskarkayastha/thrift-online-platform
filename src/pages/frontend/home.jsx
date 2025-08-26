import React from "react";
import HeroCarousel from "../../components/heroCarousel";
import VerifiedProductRow from "../../components/VerifiedProductRow";
import AllListingRow from "../../components/AllListingRow";

const HomePage = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <HeroCarousel />
      </section>

      {/* Verified Products */}
      <section>
        <VerifiedProductRow />
      </section>

      {/* All Products */}
      <section>
        <AllListingRow />
      </section>
    </div>
  );
};

export default HomePage;
