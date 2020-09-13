import React from "react";
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
        </div>
      </div>
    );
  };
}

export default OrderList;
