/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import "./BurgerMenu.scss";
import { Link } from "../Link";
import { getLocalRawResponse } from "../../utils";
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
            {sessionStorage.getItem("isAuth") &&
            sessionStorage.getItem("isAuth").length === 4 ? (
              <>
                <li key={1}>
                  <Link
                    text={"ЗАБРОНИРОВАТЬ"}
                    className="Link_bg_black_white"
                    href={"/order"}
                  />
                </li>
                <li key={2}>
                  <Link
                    text={"ЗАБРОНИРОВАТЬ ПО ID"}
                    className="Link_bg_black_white"
                    href="/order_id"
                  />
                </li>

                <li key={3}>
                  <Link
                    text={"МОИ ЗАКАЗЫ"}
                    className="Link_bg_black_white"
                    href="/my_orders"
                  />
                </li>
                <li
                  key={4}
                  onClick={async () => {
                    sessionStorage.setItem("isAuth", false);
                    console.log("sss");
                    const resp = await getLocalRawResponse("logout");
                    console.log("logout", resp);
                  }}
                >
                  <Link
                    text={"ВЫЙТИ"}
                    className="Link_bg_black_white"
                    href="/"
                  />
                </li>
              </>
            ) : (
              <li key={0}>
                <Link
                  text={"ВОЙДИ, ЧТОБЫ УВИДЕТЬ ВСЕ ВОЗМОЖНОСТИ"}
                  className="Link_bg_black_white"
                  href={""}
                />
              </li>
            )}
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
