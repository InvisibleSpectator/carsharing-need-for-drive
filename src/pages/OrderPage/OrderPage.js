import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Header } from "../../core/Header";
import { BurgerMenu } from "../../core/BurgerMenu";
import { Detail } from "../../components/Detail";
import { Location } from "../../components/Location";
import { Model } from "../../components/Model";

import "./OrderPage.scss";
import Extra from "../../components/Extra/Extra";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.activePage = React.createRef();

    this.state = {
      pages: [
        {
          name: "Местоположение",
          linkNext: "/model",
          link: "/location",
          isDone: false,
          buttonText: "Выбрать модель",
        },
        {
          name: "Модель",
          linkNext: "/extra",
          link: "/model",
          isDone: true,
          buttonText: "Дополнительно",
        },
        {
          name: "Дополнительно",
          linkNext: "/total",
          link: "/extra",
          isDone: false,
          buttonText: "Итого",
        },
        {
          name: "Итого",
          linkNext: "/",
          link: "/total",
          isDone: true,
          buttonText: "Заказать",
        },
      ],
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
              {this.state.pages.map((e, i) => {
                return (
                  <span
                    className={`OrderPage-Content-Tabs-Tab ${
                      i < this.state.page
                        ? "OrderPage-Content-Tabs-Tab_visited"
                        : i === this.state.page
                        ? "OrderPage-Content-Tabs-Tab_active"
                        : ""
                    }`}
                    key={i}
                  >
                    <Link
                      to={`/order${e.link}`}
                      onClick={() => {
                        this.setState({ page: i });
                      }}
                    >
                      {e.name}
                    </Link>
                  </span>
                );
              })}
            </div>
          </div>
          <div className="OrderPage-Content-Order">
            <div className="OrderPage-ContentWrapper">
              <div className="OrderPage-Content-Order-Options">
                <Route
                  exact
                  path="/order/location"
                  render={(props) => (
                    <Location
                      ref={this.activePage}
                      {...props}
                      onChange={() => {
                        this.setState((state) => {
                          const tmp = {
                            ...state,
                            location: this.activePage.current.getData(),
                          };
                          tmp.pages[
                            state.page
                          ].isDone = this.activePage.current.isDone();
                          return tmp;
                        });
                      }}
                    />
                  )}
                />
                <Route
                  exact
                  path="/order/model"
                  render={(props) => (
                    <Model
                      ref={this.activePage}
                      {...props}
                      onChange={() => {
                        this.setState((state) => {
                          const tmp = {
                            ...state,
                            model: this.activePage.current.getData(),
                          };
                          tmp.pages[
                            state.page
                          ].isDone = this.activePage.current.isDone();
                          return tmp;
                        });
                      }}
                    />
                  )}
                />
                <Route
                  exact
                  path="/order/extra"
                  render={(props) => (
                    <Extra
                      ref={this.activePage}
                      {...props}
                      onChange={() => {
                        this.setState((state) => {
                          const tmp = {
                            ...state,
                            ...this.activePage.current.getData(),
                          };
                          tmp.pages[
                            state.page
                          ].isDone = this.activePage.current.isDone();
                          return tmp;
                        });
                      }}
                    />
                  )}
                />
                <Route
                  exact
                  path="/order/total"
                  render={(props) => (
                    <Location
                      ref={this.activePage}
                      {...props}
                      onChange={() => {
                        this.setState((state) => {
                          const tmp = {
                            ...state,
                            location: this.activePage.current.getData(),
                          };
                          tmp.pages[
                            state.page
                          ].isDone = this.activePage.current.isDone();
                          return tmp;
                        });
                      }}
                    />
                  )}
                />
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
                  {this.state.model ? (
                    <Detail name="Модель" value={this.state.model} />
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
                <Link
                  to={`/order${this.state.pages[this.state.page].linkNext}`}
                  className={`Button Button_max ${
                    !this.state.pages[this.state.page].isDone
                      ? "Button_disabled"
                      : ""
                  }`}
                  onClick={() => {
                    this.setState((state) => {
                      return {
                        ...state,
                        page: state.page + 1,
                      };
                    });
                  }}
                >
                  <div className="Button-Text">
                    {this.state.pages[this.state.page].buttonText}
                  </div>
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default OrderPage;
