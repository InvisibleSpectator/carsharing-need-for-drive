import React, { Component } from "react";

import { Header } from "../../core/Header";
import { BurgerMenu } from "../../core/BurgerMenu";
import { Location } from "../../components/Location";
import { Model } from "../../components/Model";
import "../../components/Total/Total.scss";
import "./OrderPage.scss";
import { Extra } from "../../components/Extra";
import { Total } from "../../components/Total";
import { OrderDetails } from "../../components/OrderDetails";
import {
  getFromTableByIdClient,
  getLocal,
  postToLocal,
  getLocalRawResponse,
  formatDate,
} from "../../utils";
import { Spinner } from "../../core/Spinner";
import "../../adminPageComponents/AdminLogin/AdminLogin.scss";
import { AdminInput } from "../../adminPageComponents/AdminInput";
import { Button } from "../../core/Button";
class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.activePage = React.createRef();
    this.inputId = React.createRef();

    this.state = {
      order_id: 0,
      transport: {},
      price: 0,
      dateFrom: 0,
      dateTo: 0,
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

  setSecondOrderId = () => {
    this.setState({ ...this.state, order_id: 1 });
  };

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
    const isAuth = sessionStorage.getItem("isAuth");
    if (isAuth.length === 5) {
      this.props.history.push("");
    } else {
      await this.getData();
    }
  };

  componentDidUpdate = async (prevProps) => {
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

  chePoId = async () => {
    try {
      const id = this.inputId.current.getValue();
      console.log("id", id);
      // getLocalRawResponse
      const resp = await getLocal(`db/specificVehicle/${id}`);
      console.log("db/specificVehicle get resp", resp);
      if (
        resp.vehicleState === "FREE" ||
        resp.vehicleState === "FREE_NOT_AT_POINT"
      ) {
        this.setState({
          ...this.state,
          order_id: 1,
          transport: resp,
          dateFrom: Date.now(),
        });
      } else {
        alert("Занято");
      }
    } catch (e) {
      alert("Не найдено");
    }
  };

  sendDDD = async () => {
    const json = {};
    json.specificVehicleId = this.state.transport.id;
    json.dateTo = this.state.dateTo;
    json.dateFrom = this.state.dateFrom;
    const resp = await postToLocal("db/order/newForVehicle", json);
    console.log(resp.id);
    this.props.history.push(`order/${resp.id}`);
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

  onDateToChange = (e) => {
    const date = new Date(e.target.value);
    this.setState(
      {
        ...this.state,
        dateTo: date.getTime() || 0,
      },
      this.setPrice
    );
  };
  setPrice = () => {
    let newPrice;
    // eslint-disable-next-line default-case

    newPrice = Math.ceil((this.state.dateTo - this.state.dateFrom) / 60000) * 7;

    newPrice += this.state.transport.vehicle.price;

    newPrice = Math.max(0, newPrice) || 0;
    this.setState({ ...this.state, price: newPrice });
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
            <span className="OrderPage-Content-Tabs-Tab OrderPage-Content-Tabs-Tab_visited">
              Заказ по id
            </span>
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
                ) : this.state.order_id === 0 ? (
                  <div className="OrderPageID">
                    <AdminInput
                      trim
                      text="Id транспорта"
                      type="text"
                      className="LoginForm-AdminInput"
                      onChange={() => {}}
                      validationExp={""}
                      ref={this.inputId}
                      validationError="Введите id транспорта"
                    />
                    <Button
                      className="Button_default"
                      onClick={this.chePoId}
                      text="Заказать"
                    ></Button>
                  </div>
                ) : (
                  <div className="iuy">
                    <div className="iuy-r">
                      <div className="iuy-r-text">
                        <h2>{this.state.transport.vehicle.name}</h2>
                        <span>
                          <span className="">C</span>{" "}
                          <input
                            type="datetime-local"
                            disabled
                            readOnly
                            className="Total-Text-Value"
                            defaultValue={formatDate(
                              new Date(this.state.dateFrom)
                            )}
                          />
                        </span>
                        <div className="iuy-d">
                          <span>По</span>
                          <input
                            className="Extra-TimeRange-Input"
                            type="datetime-local"
                            disabled={!this.state.dateFrom}
                            min={formatDate(new Date(this.state.dateFrom))}
                            value={
                              this.state.dateFrom >= this.state.dateTo
                                ? ""
                                : formatDate(new Date(this.state.dateTo))
                            }
                            onChange={this.onDateToChange}
                          />
                        </div>
                        <div className="iuy-p">{`Цена: ${this.state.price} ₽`}</div>
                      </div>
                      <div className="Total-Image">
                        <img
                          src={`${this.state.transport.vehicle.thumbnail.path}`}
                          alt="car"
                        />
                      </div>
                    </div>

                    <Button
                      className={
                        this.state.price <= 0
                          ? "Button_disabled"
                          : "Button_default"
                      }
                      onClick={this.sendDDD}
                      text="Подтвердить заказ"
                    ></Button>
                  </div>
                )}
              </div>
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
