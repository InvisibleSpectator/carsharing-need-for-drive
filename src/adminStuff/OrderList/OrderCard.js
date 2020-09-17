import React from "react";

import { Checkbox } from "../../core/Checkbox";

const OrderCard = ({ order }) => {
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
          src={`http://api-factory.simbirsoft1.com${order.carId.thumbnail.path}`}
        />
        <div className="OrderCard-TextInfo">
          <p>
            <span className="OrderCard-TextInfo-Text OrderCard-TextInfo-Text_placable">
              {order.carId.name}
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
          <p>
            <span>Цвет: </span>
            <span className="OrderCard-TextInfo-Text OrderCard-TextInfo-Text_placable">
              {order.color}
            </span>
          </p>
        </div>
        <div className="OrderCard-Checks">
          <Checkbox readonly checked={order.isFullTank} text="Полный бак" />
          <Checkbox
            readonly
            checked={order.isNeedChildChair}
            text="Детское кресло"
          />
          <Checkbox readonly checked={order.isRightWheel} text="Правый руль" />
        </div>
        <p className="OrderCard-Price">{order.price} ₽</p>
        <div className="OrderCard-Buttons">
          <button className="OrderCard-Buttons-Button OrderCard-Buttons-Button_ok">
            Готово
          </button>
          <button className="OrderCard-Buttons-Button OrderCard-Buttons-Button_cancel">
            Отмена
          </button>
          <button className="OrderCard-Buttons-Button OrderCard-Buttons-Button_modify">
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
