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
import OrderCard from "../../adminPageComponents/OrderList/OrderCard";

class OrderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };
  }

  componentDidMount = async () => {
    const isAuth = sessionStorage.getItem("isAuth");
    if (isAuth.length === 5) {
      this.props.history.push("");
    } else {
      const resp = await getLocal("db/orders");
      this.setState({ orders: resp.data });
    }
  };
  updateParen = async () => {
    const resp = await getLocal("db/orders");
    this.setState({ orders: resp.data });
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
              Ваши заказы
            </span>
          </div>
        </div>
        {this.state.orders.length > 0 ? (
          <div className="OrderPage-Content-Order">
            <div className="OrderPage-ContentWrapper io">
              {this.state.orders.map((e, i) => (
                <OrderCard key={i} order={e} history={this.props.history} updateParen={this.updateParen} />
              ))}
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
