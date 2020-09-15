import React from "react";
import { Paginator } from "../Paginator";
import OrderCard from "./OrderCard";

import "./OrderList.scss";

class OrderList extends React.Component {
  render = () => {
    return (
      <div className="OrderList">
        <h2 className="AdminPage-Title">Список заказов</h2>
        <div className="AdminStyledBlock">
          <div>
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </div>
          <Paginator last={8} />
        </div>
      </div>
    );
  };
}

export default OrderList;
