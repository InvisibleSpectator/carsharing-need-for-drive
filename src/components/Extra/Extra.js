import React, { Component } from "react";
import { RadiobuttonGroup } from "../../core/RadiobuttonGroup";

import "./Extra.scss";
import { Checkbox } from "../../core/Checkbox";

class Extra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: props.dateFrom < props.dateTo,
      colors: [{ value: "Любой", text: "Любой" }].concat(
        props.colors.map((e) => {
          return { value: e, text: e };
        })
      ),
      rates: [],
      data: {
        rateId: props.rateId || null,
        dateFrom: props.dateFrom ? props.dateFrom : 0,
        dateTo: props.dateTo ? props.dateTo : 0,
        color: props.color || "Любой",
        isFullTank: props.isFullTank,
        isRightWheel: props.isRightWheel,
        isNeedChildChair: props.isNeedChildChair,
      },
    };
    this.props.onChange();
  }

  componentDidMount = async () => {
    const rateResponse = await fetch(
      "http://api-factory.simbirsoft1.com/api/db/rate",
      {
        method: "GET",
        headers: { "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b" },
      }
    );
    const rates = await rateResponse.json();
    this.setState((state) => {
      return {
        rates: rates.data,
        data: {
          ...state.data,
          rateId: state.data.rateId ? state.data.rateId : rates.data[0],
        },
      };
    }, this.setPrice);
  };

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
    }, this.setPrice);
  };

  setPrice = () => {
    let newPrice;
    switch (this.state.data.rateId.rateTypeId.unit) {
      case "мин":
        newPrice =
          Math.floor(
            (this.state.data.dateTo - this.state.data.dateFrom) / 60000
          ) * this.state.data.rateId.price;
        break;
      case "сутки":
        newPrice =
          Math.floor(
            (this.state.data.dateTo - this.state.data.dateFrom) / 86400000
          ) * this.state.data.rateId.price;
        break;
    }
    this.setState((state) => {
      return {
        data: {
          ...state.data,
          price: Math.max(0, newPrice),
        },
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
              data={this.state.colors}
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
                const date = new Date(e.target.value);
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      dateFrom: date.getTime(),
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
                const date = new Date(e.target.value);
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      dateTo: date.getTime(),
                    },
                  };
                }, this.setDone);
              }}
            />
          </div>
        </div>
        {this.state.rates.length > 0 ? (
          <div className="Extra-Rate">
            <p className="Extra-Title">Тариф</p>
            <div>
              <RadiobuttonGroup
                name="rate"
                data={this.state.rates.map((e) => {
                  return {
                    value: e.id,
                    text: `${e.rateTypeId.name}, ${e.price}₽/${e.rateTypeId.unit}`,
                  };
                })}
                defaultValue={
                  this.state.data.rateId ? this.state.data.rateId.id : null
                }
                onChange={(value) => {
                  this.setState((state) => {
                    const newRate = state.rates.find((e) => e.id === value);
                    return {
                      data: {
                        ...state.data,
                        rateId: newRate,
                      },
                    };
                  }, this.setPrice);
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="Extra-Extra">
          <p className="Extra-Title">Доп опции</p>
          <div>
            <Checkbox
              text="Полный бак, 500р"
              checked={this.state.data.isFullTank}
              onChange={(newValue) => {
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      isFullTank: newValue,
                      price: newValue
                        ? state.data.price + 500
                        : state.data.price - 500,
                    },
                  };
                }, this.props.onChange);
              }}
            />
            <Checkbox
              text="Детское кресло, 200р"
              checked={this.state.data.isNeedChildChair}
              onChange={(newValue) => {
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      isNeedChildChair: newValue,
                      price: newValue
                        ? state.data.price + 200
                        : state.data.price - 200,
                    },
                  };
                }, this.props.onChange);
              }}
            />
            <Checkbox
              text="Правый руль, 1600р"
              checked={this.state.data.isRightWheel}
              onChange={(newValue) => {
                this.setState((state) => {
                  return {
                    data: {
                      ...state.data,
                      isRightWheel: newValue,
                      price: newValue
                        ? state.data.price + 1600
                        : state.data.price - 1600,
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
