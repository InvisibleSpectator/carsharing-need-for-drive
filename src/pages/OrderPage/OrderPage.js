import React, { Component } from "react";
import { Button } from "../../core/Button";
import { Header } from "../../core/Header";
import { BurgerMenu } from "../../core/BurgerMenu";
import { Detail } from "../../components/Detail";
import { Location } from "../../components/Location";
import { Model } from "../../components/Model";

import "./OrderPage.scss";
import { Extra } from "../../components/Extra";
import { Total } from "../../components/Total";

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
      carId: null,
      price: 0,
      page: 0,
      rateId: null,
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
    // eslint-disable-next-line default-case
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
            data={this.state.carId}
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
            colors={this.state.carId.colors}
            color={this.state.color}
            dateFrom={this.state.dateFrom}
            dateTo={this.state.dateTo}
            rateId={this.state.rateId}
            price={this.state.price}
            isFullTank={this.state.isFullTank}
            isNeedChildChair={this.state.isFullTank}
            isRightWheel={this.state.isRightWheel}
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
      case 3:
        return (
          <Total
            ref={this.activePage}
            data={{
              orderStatusId: {},
              cityId: {},
              pointId: {},
              carId: this.state.carId,
              color: this.state.color,
              dateFrom: this.state.dateFrom,
              dateTo: this.state.dateTo,
              rateId: this.state.rateId,
              price: this.state.price,
              isFullTank: this.state.isFullTank,
              isNeedChildChair: this.state.isFullTank,
              isRightWheel: this.state.isRightWheel,
            }}
            onChange={() => {
              this.setState((state) => {
                const tmp = {
                  ...state,
                };
                tmp.pages[state.page].isDone = this.activePage.current.isDone();
                return tmp;
              });
            }}
          />
        );
    }
  };

  dateDifference = (start, end) => {
    const diffMs = end - start;
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

    const str = `${diffDays ? `${diffDays} д` : ""} ${
      diffHrs ? `${diffHrs} ч` : ""
    } ${diffMins ? `${diffMins} м` : ""}`;
    return str;
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
                {this.state.carId ? (
                  <Detail name="Модель" value={this.state.carId.name} />
                ) : (
                  ""
                )}
                {this.state.color ? (
                  <Detail name="Цвет" value={this.state.color} />
                ) : (
                  ""
                )}
                {this.state.dateTo - this.state.dateFrom > 0 ? (
                  <Detail
                    name="Длительность аренды"
                    value={this.dateDifference(
                      this.state.dateFrom,
                      this.state.dateTo
                    )}
                  />
                ) : (
                  ""
                )}
                {this.state.rateId ? (
                  <Detail
                    name="Тариф"
                    value={this.state.rateId.rateTypeId.name}
                  />
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
                  ? ` ${this.state.price}`
                  : `от ${this.state.priceLow} до ${this.state.priceHigh}`}{" "}
                ₽
              </span>
              <Button
                className={`Button_max ${
                  !this.state.pages[this.state.page].isDone
                    ? "Button_disabled"
                    : ""
                }`}
                onClick={
                  this.state.page < 3
                    ? () =>
                        this.setState((state) => {
                          return { page: state.page + 1 };
                        })
                    : () => this.activePage.current.action()
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
