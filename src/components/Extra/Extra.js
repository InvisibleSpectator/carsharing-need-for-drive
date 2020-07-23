import React, { Component } from "react";
import { RadiobuttonGroup } from "../../core/RadiobuttonGroup";

import "./Extra.scss";
import { Checkboxes } from "../../core/Checboxes";

class Extra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false,
      data: {
        rate: {},
        dateFrom: 0,
        dateTo: 0,
        color: "",
        isFullTank: false,
        isRightWheel: false,
        isNeedChildChair: false,
      },
    };
  }

  render = () => {
    return (
      <div className="Extra">
        <div className="Extra-Color">
          <p className="Extra-Title">Цвет</p>
          <div className="Extra-Colors">
            <RadiobuttonGroup
              name="colors"
              defaultValue={this.state.data.color}
              data={[
                { value: "Любой", text: "Любой" },
                { value: "Красный", text: "Красный" },
                { value: "Синий", text: "Синий" },
              ]}
            />
          </div>
        </div>
        <div className="Extra-Time">
          <p className="Extra-Title">Дата аренды</p>
          <div className="Extra-TimeRange">
            <span>С</span>
            <input className="Extra-TimeRange-Input" type="datetime-local" />
            <span>По</span>
            <input className="Extra-TimeRange-Input" type="datetime-local" />
          </div>
        </div>
        <div className="Extra-Rate">
          <p className="Extra-Title">Тариф</p>
          <div>
            <RadiobuttonGroup
              name="rate"
              data={[
                { value: "Поминутно", text: "Поминутно" },
                { value: "Посуточно", text: "Посуточно" },
              ]}
            />
          </div>
        </div>
        <div className="Extra-Extra">
          <p className="Extra-Title">Доп опции</p>
          <div>
            <Checkboxes
              values={[
                { checked: false, text: "Поминутно" },
                { checked: true, text: "Посуточно" },
              ]}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default Extra;
