import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container">
      <hr />
      <p>Copyright © {new Date().getFullYear()} Aris</p>
    </div>
  );
};

export default Footer;
