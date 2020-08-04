import React, { Component } from "react";

import { Header } from "../../core/Header";
import { BurgerMenu } from "../../core/BurgerMenu";
import { Location } from "../../components/Location";
import { Model } from "../../components/Model";

import "./OrderPage.scss";
import { Extra } from "../../components/Extra";
import { Total } from "../../components/Total";
import { OrderDetails } from "../../components/OrderDetails";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.activePage = React.createRef();

    this.state = {
      order: {},
      pages: [
        {
          name: "Местоположение",
          isDone: false,
          buttonText: "Выбрать модель",
          data: { cityId: null, pointId: null },
          onClick: () =>
            this.setState((state) => {
              return { page: state.page + 1 };
            }),
          render: (pageProps) => <Location {...pageProps} />,
        },
        {
          name: "Модель",
          isDone: false,
          buttonText: "Дополнительно",
          data: { carId: null, category: "" },
          onClick: () =>
            this.setState((state) => {
              return { page: state.page + 1 };
            }),
          render: (pageProps) => <Model {...pageProps} />,
        },
        {
          name: "Дополнительно",
          isDone: false,
          buttonText: "Итого",
          data: {
            color: "Любой",
            dateFrom: 0,
            dateTo: 0,
            rateId: null,
            isFullTank: false,
            isNeedChildChair: false,
            isRightWheel: false,
            price: 0,
          },
          onClick: () =>
            this.setState((state) => {
              return { page: state.page + 1 };
            }),
          render: (pageProps) => (
            <Extra colors={this.state.order.carId.colors} {...pageProps} />
          ),
        },
        {
          name: "Итого",
          isDone: false,
          buttonText: "Заказать",
          data: {
            orderStatusId: "5e26a191099b810b946c5d89",
            cityId: null,
            pointId: null,
            carId: null,
            color: "Любой",
            dateFrom: 0,
            dateTo: 0,
            rateId: null,
            isFullTank: false,
            isNeedChildChair: false,
            isRightWheel: false,
            price: 0,
          },
          onClick: () => () => this.activePage.current.action(),
          render: (pageProps) => <Total {...pageProps} />,
        },
      ],
      page: 0,
    };
  }

  conditionalRendering = () => {
    const init = {
      ref: this.activePage,
      data: (() => {
        const tmp = {};
        Object.keys(this.state.pages[this.state.page].data).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(this.state.order, key))
            tmp[key] = this.state.order[key];
          else tmp[key] = this.state.pages[this.state.page].data[key];
        });
        return tmp;
      })(),
      onLoad: () => {
        this.setState((state) => {
          const tmp = {
            ...state,
            order: {
              ...state.order,
              ...this.activePage.current.getData(),
            },
            pages: state.pages,
          };
          tmp.pages[state.page].isDone = this.activePage.current.isDone();
          return tmp;
        });
      },
      onChange: () => {
        this.setState((state) => {
          const tmp = {
            ...state,
            order: {
              ...state.order,
              ...this.activePage.current.getData(),
            },
            pages: state.pages.map((e, i) => ({
              ...e,
              isDone: i <= state.page,
            })),
          };
          const filledFields = Array.from(
            new Set(
              state.pages
                .slice(0, state.page + 1)
                .map((e) => Object.keys(e.data))
                .flat()
            )
          );
          Object.keys(tmp.order).forEach((e) => {
            if (!filledFields.includes(e)) delete tmp.order[e];
          });
          tmp.pages[state.page].isDone = this.activePage.current.isDone();
          return tmp;
        });
      },
    };
    return this.state.pages[this.state.page].render(init);
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
            <OrderDetails
              order={this.state.order}
              onClick={this.state.pages[this.state.page].onClick}
              buttonClass={
                !this.state.pages[this.state.page].isDone
                  ? "Button_disabled"
                  : ""
              }
              buttonText={this.state.pages[this.state.page].buttonText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
