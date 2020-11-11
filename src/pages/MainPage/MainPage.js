import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
        <p>Велошеринг</p>
        <p>Pedali V Dali</p>
        <p>Возьми в прокат, и крути верти</p>
        <RouterLink to="/order">
          <Button text="Забронировать" className="Button_main" />
        </RouterLink>
      </main>
      <footer className="MainPage-MainContent-Footer">
        <span className="MainPage-MainContent-Footer-Copyright">
          © 2020 «Pedali V Dali»
        </span>
        <Link
          className="MainPage-MainContent-Footer-Tel Link_footer"
          href="tel:81234567890"
          text="8 (123) 456-78-90"
        />
      </footer>
    </div>
    <div className="MainPage-SliderContaner">
      <Slider />
    </div>
  </div>
);

export default MainPage;
