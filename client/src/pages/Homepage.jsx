import React from "react";
import Hero from "../components/Hero";
import AutumnSection from "../components/AutumnSection";
import BannerSection from "../components/BannerSection";
import RecommendedSection from "../components/RecommendedSection";

const Homepage = () => {
  return (
    <div className="homepage">
      <Hero />
      <RecommendedSection />
      <AutumnSection />
      <BannerSection />
    </div>
  );
};

export default Homepage;
