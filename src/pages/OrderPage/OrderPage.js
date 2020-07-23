import React, { Component } from "react";
import { Button } from "../../core/Button";
import { Header } from "../../core/Header";
import { BurgerMenu } from "../../core/BurgerMenu";
import { Detail } from "../../components/Detail";
import { Location } from "../../components/Location";
import { Model } from "../../components/Model";

import "./OrderPage.scss";
import { Extra } from "../../components/Extra";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.activePage = React.createRef();

    this.state = {
      pages: [
        {
          name: "Местоположение",
          isDone: false,
          buttonText: "Выбрать модель",
        },
        {
          name: "Модель",
          isDone: false,
          buttonText: "Дополнительно",
        },
        {
          name: "Дополнительно",
          isDone: false,
          buttonText: "Итого",
        },
        {
          name: "Итого",
          isDone: false,
          buttonText: "Заказать",
        },
      ],
      car: null,
      page: 0,
      rate: {},
      dateFrom: 0,
      dateTo: 0,
      color: null,
      isFullTank: false,
      isRightWheel: false,
      isNeedChildChair: false,
      priceLow: 0,
      priceHigh: 0,
    };
  }

  conditionalRendering = () => {
    switch (this.state.page) {
      case 0:
        return (
          <Location
            ref={this.activePage}
            onChange={() => {
              this.setState((state) => {
                const tmp = {
                  ...state,
                  location: this.activePage.current.getData(),
                };
                tmp.pages[state.page].isDone = this.activePage.current.isDone();
                return tmp;
              });
            }}
          />
        );
      case 1:
        return (
          <Model
            ref={this.activePage}
            data={this.state.car}
            onChange={() => {
              this.setState((state) => {
                const tmp = {
                  ...state,
                  ...this.activePage.current.getData(),
                };
                tmp.pages[state.page].isDone = this.activePage.current.isDone();
                return tmp;
              });
            }}
          />
        );
      case 2:
        return (
          <Extra
            ref={this.activePage}
            onChange={() => {
              this.setState((state) => {
                const tmp = {
                  ...state,
                  ...this.activePage.current.getData(),
                };
                tmp.pages[state.page].isDone = this.activePage.current.isDone();
                return tmp;
              });
            }}
          />
        );
    }
  };

  render = () => (
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
            {this.state.pages.map((e, i) => (
              <span
                className={`OrderPage-Content-Tabs-Tab ${
                  e.isDone || (i > 0 && this.state.pages[i - 1].isDone)
                    ? "OrderPage-Content-Tabs-Tab_visited"
                    : " "
                }
                   ${
                     i === this.state.page
                       ? "OrderPage-Content-Tabs-Tab_active"
                       : " "
                   }
                `}
                key={i}
                onClick={() => {
                  this.setState({ page: i });
                }}
              >
                {e.name}
              </span>
            ))}
          </div>
        </div>
        <div className="OrderPage-Content-Order">
          <div className="OrderPage-ContentWrapper">
            <div className="OrderPage-Content-Order-Options">
              {this.conditionalRendering()}
            </div>
            <aside className="OrderPage-Content-Order-Details">
              <span className="OrderPage-Content-Order-Details-Title">
                Ваш заказ:
              </span>
              <div className="OrderPage-Content-Order-Details-Grid">
                {this.state.location ? (
                  <Detail name="Пункт выдачи" value={this.state.location} />
                ) : (
                  ""
                )}
                {this.state.car ? (
                  <Detail name="Модель" value={this.state.car.name} />
                ) : (
                  ""
                )}
                {this.state.color ? (
                  <Detail name="Цвет" value={this.state.color} />
                ) : (
                  ""
                )}
                {this.state.duration ? (
                  <Detail
                    name="Длительность аренды"
                    value={this.state.duration}
                  />
                ) : (
                  ""
                )}
                {this.state.rate ? (
                  <Detail name="Тариф" value={this.state.rate} />
                ) : (
                  ""
                )}
                {this.state.isFullTank ? (
                  <Detail name="Полный бак" value="Да" />
                ) : (
                  ""
                )}
                {this.state.isNeedChildChair ? (
                  <Detail name="Детское кресло" value="Да" />
                ) : (
                  ""
                )}
                {this.state.isRightWheel ? (
                  <Detail name="Правый руль" value="Да" />
                ) : (
                  ""
                )}
              </div>
              <span className="OrderPage-Content-Order-Details-Price">
                <span className="OrderPage-Content-Order-Details-Title">
                  Цена:
                </span>
                {this.state.priceLow === this.state.priceHigh
                  ? ` ${this.state.priceHigh}`
                  : `от ${this.state.priceLow} до ${this.state.priceHigh}`}{" "}
                ₽
              </span>
              <Button
                className={`Button_max ${
                  !this.state.pages[this.state.page].isDone
                    ? "Button_disabled"
                    : ""
                }`}
                onClick={() =>
                  this.setState((state) => {
                    return { page: state.page + 1 };
                  })
                }
                text={this.state.pages[this.state.page].buttonText}
              />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
