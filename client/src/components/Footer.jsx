import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="sneakerhub-footer">
      <div className="sneakerhub-footer__curve"></div>
      <div className="sneakerhub-footer__slant"></div>
      <div className="sneakerhub-footer__content">
        <div className="sneakerhub-footer__logo">
          <div className="sneakerhub-footer__shoe-container">
            <img
              src="/public/assets/footerImage.png"
              alt="Sneaker Cutout"
              className="sneakerhub-footer__shoe-cutout"
            />
          </div>
          <h3 className="sneakerhub-footer__title">Vaulted Kicks</h3>
        </div>
        <div className="sneakerhub-footer__links">
          <a href="/about" className="sneakerhub-footer__link">
            About Us
          </a>
          <a href="/contact" className="sneakerhub-footer__link">
            Contact
          </a>
          <a href="/terms" className="sneakerhub-footer__link">
            Terms of Service
          </a>
          <a href="/privacy" className="sneakerhub-footer__link">
            Privacy Policy
          </a>
        </div>
        <div className="sneakerhub-footer__social">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="sneakerhub-footer__social-link"
            style={{ textDecoration: "none" }}
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="sneakerhub-footer__social-link"
            style={{ textDecoration: "none" }}
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="sneakerhub-footer__social-link"
            style={{ textDecoration: "none" }}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
      <div className="sneakerhub-footer__bottom">
        <p className="sneakerhub-footer__copyright">
          &copy; 2024 Vaulted Kicks. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
