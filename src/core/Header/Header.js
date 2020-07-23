import React from "react";
import "./Header.scss";

const Header = () => (
  <header className="Header">
    <a href="/carsharing-need-for-drive">
      <h1 className="Header-Head">Need for drive</h1>
    </a>
    <div className="Header-Location">
      <img src={require("../../assets/icons/marker.svg")} alt="marker" />
      <span>Ульяновск</span>
    </div>
  </header>
);

export default Header;
