import React from "react";

import { Checkbox } from "../../core/Checkbox";
import { getLocal } from "../../utils";

const OrderCard = ({ order, history, updateParen }) => {
  const formatter = new Intl.DateTimeFormat("ru", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="OrderCard">
      <div className="AdminStyledBlock-Content">
        <img
          alt="car"
          className="OrderCard-Image"
          crossOrigin="anonymous"
          referrerPolicy="origin"
          src={order.specificVehicleId.vehicle.thumbnail.path}
        />
        <div className="OrderCard-TextInfo">
          <p>
            <span className="OrderCard-TextInfo-Text OrderCard-TextInfo-Text_placable">
              {order.specificVehicleId
                ? order.specificVehicleId.vehicle.name
                : "нет данных"}
            </span>{" "}
            в{" "}
            <span className="OrderCard-TextInfo-Text OrderCard-TextInfo-Text_placable">
              {`${order.cityId ? order.cityId.name : "нет данных"}, ${
                order.pointId ? order.pointId.address : "нет данных"
              }`}
            </span>
          </p>
          <p>
            <span>{formatter.format(new Date(order.dateFrom))}</span> —{" "}
            <span>{formatter.format(new Date(order.dateTo))}</span>
          </p>
        </div>
        <div className="OrderCard-Checks">
          <Checkbox readonly checked={order.isBodyProtect} text="Защита тела" />
          <Checkbox
            readonly
            checked={order.isNeedChildChair}
            text="Детское кресло"
          />
        </div>
        <p className="OrderCard-Price">{order.price} ₽</p>
        <div className="OrderCard-Buttons">
          {(() => {
            switch (order.orderStatus) {
              case "NEW":
                return (
                  <button
                    className="OrderCard-Buttons-Button OrderCard-Buttons-Button_cancel"
                    onClick={async () => {
                      await getLocal(`db/order/cancel/${order.id}`);
                      // history.push("/my_orders");
                      updateParen();
                    }}
                  >
                    Отменить
                  </button>
                );
              case "CANCELED":
                return <span style={{lineHeight:'24px', fontSize:'11px', padding:'0px 12px' }}  >Заказ отменен</span>;
              case "FINISHED":
                return <span style={{lineHeight:'24px', fontSize:'11px', padding:'0px 12px' }}>Заказ завершен</span>;
              case "STARTED":
                return (
                  <button
                    className="OrderCard-Buttons-Button OrderCard-Buttons-Button_ok"
                    onClick={async () => {
                      await getLocal(`db/order/finish/${order.id}`);
                      // history.push("/my_orders");
                      updateParen();
                    }}
                  >
                    Завершить заказ
                  </button>
                );
              case "ERROR":
                return <span style={{lineHeight:'24px', fontSize:'11px', padding:'0px 12px' }}>Ошибка</span>;
              default:
                return "";
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
