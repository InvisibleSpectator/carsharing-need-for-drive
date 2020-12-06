import React, { Component } from "react";
import { RadiobuttonGroup } from "../../core/RadiobuttonGroup";

import "./Extra.scss";
import { Checkbox } from "../../core/Checkbox";
import { Spinner } from "../../core/Spinner";

import { formatDate, getAllFromTableClient } from "../../utils";

class Extra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      // colors: [{ value: "Любой", text: "Любой" }].concat(
      //   props.colors.map((e) => {
      //     return { value: e, text: e };
      //   })
      // ),
      rates: [],
      data: props.data,
    };
  }

  componentDidMount = async () => {
    // const rates = await getAllFromTableClient("rate");
    const rates = {data:[
      {
        createdAt: 1579589842853,
id: "5e26a0d2099b810b946c5d85",
price: 7,
rateTypeId: {unit: "мин", name: "Поминутно", id: "5e26a07f099b810b946c5d82"},
id: "5e26a07f099b810b946c5d82",
name: "Поминутно",
unit: "мин",
updatedAt: 1579589842853,
      },
    ]};
    this.setState((state) => {
      return {
        loaded: true,
        rates: rates.data,
        data: {
          ...state.data,
          rateId: state.data.rateId ? state.data.rateId : rates.data[0],
        },
      };
    }, this.props.onLoad);
  };

  getData = () => this.state.data;

  isDone = () => this.state.data.dateFrom < this.state.data.dateTo;

  setPrice = () => {
    let newPrice;
    // eslint-disable-next-line default-case
    switch (this.state.data.rateId.rateTypeId.unit) {
      case "мин":
        newPrice =
          Math.ceil(
            (this.state.data.dateTo - this.state.data.dateFrom) / 60000
          ) * this.state.data.rateId.price;
        break;
      case "сутки":
        newPrice =
          Math.ceil(
            (this.state.data.dateTo - this.state.data.dateFrom) / 86400000
          ) * this.state.data.rateId.price;
        break;
    }
    newPrice = Math.max(0, newPrice) || 0;
    newPrice += this.state.data.isBodyProtect * 500;
    newPrice += this.state.data.isNeedChildChair * 200;
    this.setState((state) => {
      return {
        data: {
          ...state.data,
          price: newPrice,
        },
      };
    }, this.props.onChange);
  };

  onDateFromChange = (e) => {
    const date = new Date(e.target.value);
    this.setState((state) => {
      return {
        data: {
          ...state.data,
          dateFrom: date.getTime() || 0,
          dateTo: date.getTime() ? state.data.dateTo : 0,
        },
      };
    }, this.setPrice);
  };

  onDateToChange = (e) => {
    const date = new Date(e.target.value);
    this.setState((state) => {
      return {
        data: {
          ...state.data,
          dateTo: date.getTime() || 0,
        },
      };
    }, this.setPrice);
  };

  onColorChange = (value) => {
    this.setState((state) => {
      return {
        data: {
          ...state.data,
          color: value,
        },
      };
    }, this.props.onChange);
  };

  onFullTankChange = (newValue) => {
    this.setState((state) => {
      return {
        data: {
          ...state.data,
          isBodyProtect: newValue,
        },
      };
    }, this.setPrice);
  };

  onChildChairChange = (newValue) => {
    this.setState((state) => {
      return {
        data: {
          ...state.data,
          isNeedChildChair: newValue,
        },
      };
    }, this.setPrice);
  };

  

  render = () => {
    return this.state.loaded ? (
      <div className="Extra">
        {/* <div className="Extra-Color">
          <p className="Extra-Title">Цвет</p>
          <div className="Extra-Colors">
            <RadiobuttonGroup
              name="colors"
              defaultValue={this.state.data.color}
              onChange={this.onColorChange}
              data={this.state.colors}
            />
          </div>
        </div> */}
        <div className="Extra-Time">
          <p className="Extra-Title">Дата аренды</p>
          <div className="Extra-TimeRange">
            <span>С</span>
            <input
              className="Extra-TimeRange-Input"
              min={formatDate(new Date())}
              value={
                this.state.data.dateFrom === 0
                  ? ""
                  : formatDate(new Date(this.state.data.dateFrom))
              }
              type="datetime-local"
              onChange={this.onDateFromChange}
            />
            <span>По</span>
            <input
              className="Extra-TimeRange-Input"
              type="datetime-local"
              disabled={!this.state.data.dateFrom}
              min={formatDate(new Date(this.state.data.dateFrom))}
              value={
                this.state.data.dateFrom >= this.state.data.dateTo
                  ? ""
                  : formatDate(new Date(this.state.data.dateTo))
              }
              onChange={this.onDateToChange}
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
              text="Защита тела, 500 ₽"
              checked={this.state.data.isBodyProtect}
              onChange={this.onFullTankChange}
            />
            <Checkbox
              text="Детское кресло, 200 ₽"
              checked={this.state.data.isNeedChildChair}
              onChange={this.onChildChairChange}
            />           
          </div>
        </div>
      </div>
    ) : (
      <Spinner />
    );
  };
}

export default Extra;
