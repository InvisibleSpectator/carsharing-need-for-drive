import React from "react";
import { Button } from "../../core/Button";
import { Detail } from "../Detail";
import "./OrderDetails.scss";

const dateDifference = (start, end) => {
  const diffMs = end - start;
  const diffDays = Math.floor(diffMs / 86400000);
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

  const str = `${diffDays ? `${diffDays} д` : ""} ${
    diffHrs ? `${diffHrs} ч` : ""
  } ${diffMins ? `${diffMins} м` : ""}`;
  return str;
};

const OrderDetails = (props) => {
  return (
    <aside className="OrderDetails">
      <span className="OrderDetails-Title">Ваш заказ:</span>
      <div className="OrderDetails-Grid">
        {props.order.pointId ? (
          <Detail
            name="Пункт выдачи"
            value={{
              city: props.order.cityId.name,
              address: props.order.pointId.address,
            }}
          />
        ) : (
          ""
        )}
        {props.order.carId ? (
          <Detail name="Модель" value={props.order.carId.name} />
        ) : (
          ""
        )}
        {props.order.color ? (
          <Detail name="Цвет" value={props.order.color} />
        ) : (
          ""
        )}
        {props.order.dateTo - props.order.dateFrom > 0 ? (
          <Detail
            name="Длительность аренды"
            value={dateDifference(props.order.dateFrom, props.order.dateTo)}
          />
        ) : (
          ""
        )}
        {props.order.rateId ? (
          <Detail name="Тариф" value={props.order.rateId.rateTypeId.name} />
        ) : (
          ""
        )}
        {props.order.isFullTank ? <Detail name="Полный бак" value="Да" /> : ""}
        {props.order.isNeedChildChair ? (
          <Detail name="Детское кресло" value="Да" />
        ) : (
          ""
        )}
        {props.order.isRightWheel ? (
          <Detail name="Правый руль" value="Да" />
        ) : (
          ""
        )}
      </div>
      <span className="OrderDetails-Price">
        <span className="OrderDetails-Title">Цена:</span>
        {props.order.price || 0} ₽
      </span>
      <Button
        className={`Button_max ${props.buttonClass}`}
        onClick={props.onClick}
        text={props.buttonText}
      />
    </aside>
  );
};

export default OrderDetails;
