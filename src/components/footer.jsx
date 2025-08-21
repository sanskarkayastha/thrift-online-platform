import React from "react";
import "../Css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Thriftify. All rights reserved.</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
