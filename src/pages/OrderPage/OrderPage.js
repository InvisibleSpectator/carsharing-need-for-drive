import React, { Component } from "react";

import { Header } from "../../core/Header";
import { BurgerMenu } from "../../core/BurgerMenu";
import { Location } from "../../components/Location";
import { Model } from "../../components/Model";

import "./OrderPage.scss";
import { Extra } from "../../components/Extra";
import { Total } from "../../components/Total";
import { OrderDetails } from "../../components/OrderDetails";
import { getFromTableByIdClient, getLocal } from "../../utils";
import { Spinner } from "../../core/Spinner";

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
          data: { vehicleId: null, category: "" },
          onClick: () =>
            this.setState((state) => {
              return { page: state.page + 1 };
            }),
          render: (pageProps) => (
            <Model point={this.state.order.pointId} {...pageProps} />
          ),
        },
        {
          name: "Дополнительно",
          isDone: false,
          buttonText: "Итого",
          data: {
            dateFrom: 0,
            dateTo: 0,
            rateId: null,
            isBodyProtect: false,
            isNeedChildChair: false,
            price: 0,
          },
          onClick: () =>
            this.setState((state) => {
              return { page: state.page + 1 };
            }),
          render: (pageProps) => <Extra {...pageProps} />,
        },
        {
          name: "Итого",
          isDone: false,
          buttonText: "Заказать",
          data: {
            orderStatusId: { id: "5e26a191099b810b946c5d89", name: "new" },
            cityId: null,
            pointId: null,
            vehicleId: null,
            dateFrom: 0,
            dateTo: 0,
            rateId: null,
            isBodyProtect: false,
            isNeedChildChair: false,
            price: 0,
          },
          onClick: () => this.activePage.current.action(),
          render: (pageProps) => <Total {...pageProps} />,
        },
      ],
      page: 0,
    };
  }

  getData = async () => {
    console.log(this.props.match.params.id);
    if (this.props.match.params.id) {
      console.log("server");
      const order = await getLocal(`db/order/${this.props.match.params.id}`);
      const vehicle = { ...order.specificVehicleId.vehicle };
      order["vehicleId"] = vehicle;

      this.setState({
        order: (({
          id,
          orderStatus,
          cityId,
          pointId,
          vehicleId,
          dateFrom,
          dateTo,
          rateId,
          price,
          isBodyProtect,
          isNeedChildChair,
        }) => ({
          id,
          orderStatus,
          cityId,
          pointId,
          vehicleId,
          dateFrom,
          dateTo,
          rateId,
          price,
          isBodyProtect,
          isNeedChildChair,
        }))(order),
      });
    } else {
      console.log("empty");
      this.setState({ order: {} });
    }
  };

  componentDidMount = async () => {
    await this.getData();
  };

  componentDidUpdate = async (prevProps) => {
    console.log("🚀 prevProps.match.id", prevProps.match.params.id);
    console.log("🚀 this.props.match.id", this.props.match.params.id);
    if (this.props.match.params.id !== prevProps.match.params.id) {
      await this.getData();
    }
  };

  // #region CallbacksForTab
  onTabLoad = () => {
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
  };

  onTabChange = () => {
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
  };

  // #endregion CallbacksForTab

  conditionalRendering = () => {
    const init = {
      ...this.props,
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
      onLoad: this.onTabLoad,
      onChange: this.onTabChange,
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
            {this.props.match.params.id ? (
              <span className="OrderPage-Content-Tabs-Tab OrderPage-Content-Tabs-Tab_visited">{`Заказ номер ${this.props.match.params.id}`}</span>
            ) : (
              this.state.pages.map((e, i) => (
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
              ))
            )}
          </div>
        </div>
        {!this.props.match.params.id || this.state.order.id ? (
          <div className="OrderPage-Content-Order">
            <div className="OrderPage-ContentWrapper">
              <div className="OrderPage-Content-Order-Options">
                {this.props.match.params.id ? (
                  <Total
                    {...this.props}
                    ref={this.activePage}
                    data={this.state.order}
                    onChange={this.getData}
                  />
                ) : !this.state.order.id ? (
                  this.conditionalRendering()
                ) : (
                  ""
                )}
              </div>

              <OrderDetails
                order={this.state.order}
                onClick={
                  this.props.match.params.id &&
                  this.state.order.orderStatus === "NEW"
                    ? (e) => {
                        e.currentTarget.classList.toggle("Button_loading");
                        this.activePage.current.editOrder();
                      }
                    : this.state.pages[this.state.page].onClick
                }
                buttonClass={
                  this.props.match.params.id
                    ? this.state.order.orderStatus === "NEW"
                      ? "Button_decline"
                      : "Button_hidden"
                    : !this.state.pages[this.state.page].isDone
                    ? "Button_disabled"
                    : ""
                }
                buttonText={
                  this.props.match.params.id &&
                  this.state.order.orderStatus === "NEW"
                    ? "Отменить"
                    : this.state.pages[this.state.page].buttonText
                }
              />
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default OrderPage;
