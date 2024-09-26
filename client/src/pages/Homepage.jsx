import React from "react";
import Hero from "../components/Hero";
import AutumnSection from "../components/AutumnSection";
import BannerSection from "../components/BannerSection";
import RecommendedSection from "../components/RecommendedSection";
import SneakerDrop from "../components/SneakerDrop";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div className="homepage">
      <Hero />
      <RecommendedSection />
      <AutumnSection />
      <BannerSection />
      <SneakerDrop />
      <Footer/>
    </div>
  );
};

export default Homepage;
