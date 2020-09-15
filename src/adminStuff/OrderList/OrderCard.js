import React from "react";

import { Checkbox } from "../../core/Checkbox";

const OrderCard = () => {
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
          src="http://api-factory.simbirsoft1.com/files/5f21d9059d3a610b850fcd56_5ecaa87d099b810b946ca32e_32a0ec8797f5ee5b08c70fdabb7b06bd.png"
        />
        <div className="OrderCard-TextInfo">
          <p>
            <span className="OrderCard-TextInfo-Text OrderCard-TextInfo-Text_placable">
              ELANTRA
            </span>{" "}
            в{" "}
            <span className="OrderCard-TextInfo-Text OrderCard-TextInfo-Text_placable">
              Ульяновск, нариманова 12
            </span>
          </p>
          <p>
            <span>{formatter.format(new Date())}</span> —{" "}
            <span>{formatter.format(new Date())}</span>
          </p>
          <p>
            <span>Цвет: </span>
            <span className="OrderCard-TextInfo-Text OrderCard-TextInfo-Text_placable">
              Голубой
            </span>
          </p>
        </div>
        <div className="OrderCard-Checks">
          <Checkbox readonly text="Полный бак" />
          <Checkbox readonly text="Детское кресло" />
          <Checkbox readonly checked={true} text="Правый руль" />
        </div>
        <p className="OrderCard-Price">4 300 ₽</p>
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
