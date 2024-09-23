import React from 'react';
import '../styles/BannerSection.css';
import bannerVideo from '../../public/assets/banner.mp4';

const BannerSection = () => {
  return (
    <section className="banner-section">
      <div className="banner-container">
        <video className="banner-video" autoPlay loop muted playsInline>
          <source src={bannerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="banner-overlay">
          <h2 className="banner-text">Sneaker Sale</h2>
          <p className="banner-subtext">Up to 35% Off</p>
          <button className="banner-cta">Shop Now</button>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
