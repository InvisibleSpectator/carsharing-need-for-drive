/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import "./BurgerMenu.scss";
import { Link } from "../Link";

class BurgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.BurgerMenu = React.createRef();
  }

  toggleBurger = () => {
    this.BurgerMenu.current.classList.toggle("BurgerMenu_isOpened");
  };

  render = () => (
    <aside className="BurgerMenu" ref={this.BurgerMenu}>
      <div
        className="BurgerMenu-ToggleButton"
        onClick={this.toggleBurger}
        role="button"
        onKeyDown={this.toggleBurger}
      />

      <div className="BurgerMenu-Contaner">
        <div className="BurgerMenu-Draver">
          <ul className="BurgerMenu-Content">
            {["ЗАБРОНИРОВАТЬ", "ЗАБРОНИРОВАТЬ ПО ID", "ВЫЙТИ"].map((e, i) => (
              <li key={i}>
                <Link text={e} className="Link_bg_black_white" />
              </li>
            ))}
          </ul>
          <div className="BurgerMenu-SN">
            <a
              href="https://telegram.org/"
              className="BurgerMenu-SN_telegram"
            />
            <a
              href="https://www.instagram.com/?hl=ru"
              className="BurgerMenu-SN_instagram"
            />
          </div>
        </div>
        <div className="BurgerMenu-Background" onClick={this.toggleBurger} />
      </div>
    </aside>
  );
}

export default BurgerMenu;
