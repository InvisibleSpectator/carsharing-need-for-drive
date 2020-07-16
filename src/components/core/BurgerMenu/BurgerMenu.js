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

  render = () => {
    return (
      <aside className="BurgerMenu" ref={this.BurgerMenu}>
        <label
          className="BurgerMenu-ToggleButton"
          onClick={this.toggleBurger}
        />

        <div className="BurgerMenu-Contaner">
          <div className="BurgerMenu-Draver">
            <ul className="BurgerMenu-Content">
              <li>
                <Link text="ПАРКОВКА" className="Link_bg_black_white" />
              </li>
              <li>
                <Link text="СТРАХОВКА" className="Link_bg_black_white" />
              </li>
              <li>
                <Link text="БЕНЗИН" className="Link_bg_black_white" />
              </li>
              <li>
                <Link text="ОБСЛУЖИВАНИЕ" className="Link_bg_black_white" />
              </li>
            </ul>
            <div className="BurgerMenu-SN">
              <a
                href="https://telegram.org/"
                className="BurgerMenu-SN_telegram"
              ></a>
              <a
                href="https://ru-ru.facebook.com/"
                className="BurgerMenu-SN_facebook"
              ></a>
              <a
                href="https://www.instagram.com/?hl=ru"
                className="BurgerMenu-SN_instagram"
              ></a>
            </div>
          </div>
          <div className="BurgerMenu-Background" onClick={this.toggleBurger} />
        </div>
        <button className="BurgerMenu-LangButton">
          <span>ENG</span>
        </button>
      </aside>
    );
  };
}

export default BurgerMenu;
