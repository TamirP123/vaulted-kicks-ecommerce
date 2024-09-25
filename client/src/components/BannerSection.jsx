import React from 'react';
import '../styles/BannerSection.css';
import bannerVideo from '../../public/assets/banner.mp4';
import { Link } from 'react-router-dom';

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
          <Link to="/sneakers" style={{ textDecoration: 'none', color: 'black' }}>
          <button className="banner-cta">Shop Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
