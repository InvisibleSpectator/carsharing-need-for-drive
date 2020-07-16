import React from "react";
import './Header.scss'
const Header = () => {
  return (
    <header className="Header">
      <h1 className="Header-Head">Need for drive</h1>
      <div className="Header-Location">
        <img src={require("../../../assets/marker.svg")} />
        <span>Ульяновск</span>
      </div>
    </header>
  );
};

export default Header
