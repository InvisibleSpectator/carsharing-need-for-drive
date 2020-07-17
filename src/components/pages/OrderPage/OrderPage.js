import React, { Component, Fragment } from "react";
import { Header } from "../../core/Header";
import { BurgerMenu } from "../../core/BurgerMenu";
import { Button } from "../../core/Button";
import { Detail } from "./-Detail";
import "./OrderPage.scss";
import { AutocompletableInput } from "../../core/AutocompletableInput";

class OrderPage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className="OrderPage">
        <BurgerMenu />
        <div className="OrderPage-Content">
          <div className="OrderPage-HeaderContaner">
            <div className="OrderPage-ContentWrapper">
              <Header />
            </div>
          </div>
          <div className="OrderPage-Content-Tabs">
            <div className="OrderPage-ContentWrapper">
              <span className="OrderPage-Content-Tabs-Tab">Местоположение</span>
              <span className="OrderPage-Content-Tabs-Tab">Модель</span>
              <span className="OrderPage-Content-Tabs-Tab">Дополнительно</span>
              <span className="OrderPage-Content-Tabs-Tab">Итого</span>
            </div>
          </div>
          <div className="OrderPage-Content-Order">
            <div className="OrderPage-ContentWrapper">
              <div className="OrderPage-Content-Order-Options">
                <AutocompletableInput placeholder="Выберете город..." variants={["Самара", "Москва", "Ульяновск", "Нижний", "Омск"]}/>
              </div>
              <aside className="OrderPage-Content-Order-Details">
                <span className="OrderPage-Content-Order-Details-Title">
                  Ваш заказ:
                </span>
                <div className="OrderPage-Content-Order-Details-Grid">
                  <Detail
                    name="Пункт выдачи"
                    value="Ульяновск, Нариманова 42"
                  />
                  <Detail name="Модель" value="Hyndai, i30 N" />
                  <Detail name="Цвет" value="Голубой" />
                </div>
                <span className="OrderPage-Content-Order-Details-Price">
                  <span className="OrderPage-Content-Order-Details-Title">
                    Цена:
                  </span>{" "}
                  от ,,, до ,,, ₽
                </span>
                <Button text="Выбрать модель" />
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default OrderPage;
