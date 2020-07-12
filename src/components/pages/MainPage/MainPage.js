import React from "react";
import { BurgerMenu } from "./BurgerMenu";
import './MainPage.scss'

const MainPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <BurgerMenu></BurgerMenu>
      <div
        style={{ flexBasis: "550px", backgroundColor: "red", flexGrow: 2 ,height: "200vh"}}
      > sadfsdfasdfs</div>
      <div className="MainPage-SliderContaner"
        style={{
          flexGrow: 4,
          width: "auto",
          flexBasis: "410px",
          backgroundColor: "yellow",
          height: "100vh",

        }}
      ></div>
    </div>
  );
};

export default MainPage;
