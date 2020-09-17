import React from "react";
import { getAllFromTableAdmin } from "../../utils";
import { Filters } from "../Filters";
import { Paginator } from "../Paginator";
import { Spinner } from "../../core/Spinner";
import { SEARCH_LIMIT } from "../../utils";
import OrderCard from "./OrderCard";

import "./OrderList.scss";

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], isDataLoaded: false };
  }

  componentDidMount = async () => {
    const orders = await getAllFromTableAdmin(
      "order",
      0,
      "",
      this.props.bearer
    );
    this.setState({
      orders: orders.data,
      isDataLoaded: true,
      lastPage: Math.ceil(orders.count / SEARCH_LIMIT),
    });
  };

  changePage = (newPage) => {
    this.getOrdersFromPage(newPage - 1);
  };

  getOrdersFromPage = (page) => {
    this.setState({ isDataLoaded: false }, async () => {
      const orders = await getAllFromTableAdmin(
        "order",
        page,
        "",
        this.props.bearer
      );
      this.setState({ orders: orders.data, isDataLoaded: true });
    });
  };

  render = () => {
    return (
      <div className="OrderList">
        <h2 className="AdminPage-Title">Список заказов</h2>
        <div className="AdminStyledBlock">
          <Filters />
          {this.state.isDataLoaded ? (
            <div>
              {this.state.orders.map((e, i) => (
                <OrderCard key={i} order={e} />
              ))}
            </div>
          ) : (
            <Spinner />
          )}
          <Paginator
            last={this.state.lastPage}
            onChangePage={this.changePage}
          />
        </div>
      </div>
    );
  };
}

export default OrderList;
