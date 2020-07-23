import React from "react";
import { BurgerMenu } from "../../core/BurgerMenu";
import "./MainPage.scss";
import { Slider } from "../../components/Slider";
import { Button } from "../../core/Button";
import { Link } from "../../core/Link";
import { Header } from "../../core/Header";

const MainPage = () => (
  <div className="MainPage">
    <BurgerMenu />
    <div className="MainPage-MainContent">
      <Header />
      <main className="MainPage-MainContent-Main">
        <p>Каршеринг</p>
        <p>Need for drive</p>
        <p>Поминутная аренда авто твоего города</p>
        <Button
          text="Забронировать"
          className="Button_main"
          onClick={() => {
            window.location.href = "/order/location";
          }}
        />
      </main>
      <footer className="MainPage-MainContent-Footer">
        <span className="MainPage-MainContent-Footer-Copyright">
          © 2016-2019 «Need for drive»
        </span>
        <Link
          className="MainPage-MainContent-Footer-Tel Link_footer"
          href="tel:84952342244"
          text="8 (495) 234-22-44"
        />
      </footer>
    </div>
    <div className="MainPage-SliderContaner">
      <Slider />
    </div>
  </div>
);

export default MainPage;
