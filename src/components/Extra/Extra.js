import React, { Component } from "react";
import { RadiobuttonGroup } from "../../core/RadiobuttonGroup";

import "./Extra.scss";
import { Checkbox } from "../../core/Checkbox";

class Extra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false,
      data: {
        rate: {},
        dateFrom: this.props.dateFrom
          ? this.formatDate(new Date(this.props.dateFrom))
          : 0,
        dateTo: this.props.dateTo
          ? this.formatDate(new Date(this.props.To))
          : 0,
        color: "Любой",
        isFullTank: false,
        isRightWheel: false,
        isNeedChildChair: false,
      },
    };
    this.props.onChange();
  }

  getData = () => this.state.data;

  isDone = () => this.state.isDone;

  formatDate = (normalDate) => {
    const formatter = new Intl.NumberFormat("ru", { minimumIntegerDigits: 2 });

    return normalDate
      ? `${normalDate.getFullYear()}-${formatter.format(
          normalDate.getMonth() + 1
        )}-${formatter.format(normalDate.getDate())}T${formatter.format(
          normalDate.getHours()
        )}:${formatter.format(normalDate.getMinutes())}`
      : "";
  };

  setDone = () => {
    this.setState((state) => {
      return {
        isDone: state.data.dateFrom < state.data.dateTo,
      };
    }, this.props.onChange);
  };

  render = () => {
    return (
      <div className="Extra">
        <div className="Extra-Color">
          <p className="Extra-Title">Цвет</p>
          <div className="Extra-Colors">
            <RadiobuttonGroup
              name="colors"
              defaultValue={this.state.data.color}
              onChange={(value) => {
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      color: value,
                    },
                  };
                }, this.props.onChange);
              }}
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
            <input
              className="Extra-TimeRange-Input"
              min={this.formatDate(new Date())}
              value={
                this.state.data.dateFrom === 0
                  ? ""
                  : this.formatDate(new Date(this.state.data.dateFrom))
              }
              type="datetime-local"
              onChange={(e) => {
                const date = e.target.value;
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      dateFrom: new Date(date),
                    },
                  };
                }, this.setDone);
              }}
            />
            <span>По</span>
            <input
              className="Extra-TimeRange-Input"
              type="datetime-local"
              disabled={!this.state.data.dateFrom}
              min={this.formatDate(new Date(this.state.data.dateFrom))}
              value={
                this.state.data.dateFrom >= this.state.data.dateTo
                  ? ""
                  : this.formatDate(new Date(this.state.data.dateTo))
              }
              onChange={(e) => {
                const date = e.target.value;
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      dateTo: new Date(date),
                    },
                  };
                }, this.setDone);
              }}
            />
          </div>
        </div>
        <div className="Extra-Rate">
          <p className="Extra-Title">Тариф</p>
          <div>
            <RadiobuttonGroup
              name="rate"
              data={[
                { value: "Поминутно", text: "Поминутно, 7₽/мин" },
                { value: "Посуточно", text: "На сутки, 1999 ₽/сутки" },
              ]}
            />
          </div>
        </div>
        <div className="Extra-Extra">
          <p className="Extra-Title">Доп опции</p>
          <div>
            <Checkbox
              text="Полный бак, 500р"
              checked={this.state.isFullTank}
              onChange={(newValue) => {
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      isFullTank: newValue,
                    },
                  };
                }, this.props.onChange);
              }}
            />
            <Checkbox
              text="Детское кресло, 200р"
              checked={this.state.isNeedChildChair}
              onChange={(newValue) => {
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      isNeedChildChair: newValue,
                    },
                  };
                }, this.props.onChange);
              }}
            />
            <Checkbox
              text="Правый руль, 1600р"
              checked={this.state.isRightWheel}
              onChange={(newValue) => {
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      isRightWheel: newValue,
                    },
                  };
                }, this.props.onChange);
              }}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default Extra;
