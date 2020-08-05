import React, { Component } from "react";
import "./Total.scss";
import { Button } from "../../core/Button";
import { formatDate, postToTableClient, putToTableClient } from "../../utils";

class Total extends Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.state = { isDone: true };
    props.onLoad();
  }

  getData = () => null;

  isDone = () => this.state.isDone;

  action = () => {
    this.modal.current.classList.toggle("Total-Modal_disabled");
  };

  editOrder = async () => {
    await putToTableClient("order", this.props.data.id, {
      ...this.props.data,
      orderStatusId: "5e26a1f5099b810b946c5d8c",
      cityId: this.props.data.cityId.id,
      pointId: this.props.data.pointId.id,
      carId: this.props.data.carId.id,
      rateId: this.props.data.rateId.id,
    });
    this.props.onChange();
  };

  getStatus = () => {
    switch (this.props.data.orderStatusId.name) {
      case "new":
        return "сформирован";
      case "cancelled":
        return "отменён";
      case "confirmed":
        return "подтвёрждён";
      case "issued":
        return "с проблемами";
      default:
        return "что-то странное";
    }
  };

  render = () => {
    return (
      <div className="Total">
        <div className="Total-Text">
          {this.props.data.id ? (
            <span className="Total-Text-Status">{`Ваш заказ ${this.getStatus()}`}</span>
          ) : (
            ""
          )}
          <h2>{this.props.data.carId.name}</h2>
          {this.props.data.carId.number ? (
            <span className="Total-Text-Number">
              {this.props.data.carId.number}
            </span>
          ) : (
            ""
          )}
          {this.props.data.carId.tank ? (
            <span>
              <span className="Total-Text-Title">Топливо</span>{" "}
              <span className="Total-Text-Value">
                {this.props.data.carId.tank}%
              </span>
            </span>
          ) : (
            ""
          )}

          <span>
            <span className="Total-Text-Title">Доступна с </span>{" "}
            <input
              type="datetime-local"
              disabled
              readOnly
              className="Total-Text-Value"
              defaultValue={formatDate(new Date(this.props.data.dateFrom))}
            />
          </span>
        </div>
        <div className="Total-Image">
          <img
            src={`http://api-factory.simbirsoft1.com/${this.props.data.carId.thumbnail.path}`}
            alt="car"
          />
        </div>
        <div className="Total-Modal Total-Modal_disabled" ref={this.modal}>
          <div className="Total-Modal-Grid">
            <span className="Total-Modal-Text">Подтвердить заказ</span>
            <Button
              text="Подтвердить"
              className="Button_max Total-Modal-Accept"
              onClick={async (e) => {
                e.currentTarget.classList.toggle("Button_loading");
                const postedOrder = await postToTableClient("order", {
                  ...this.props.data,
                  orderStatusId: this.props.data.orderStatusId.id,
                  cityId: this.props.data.cityId.id,
                  pointId: this.props.data.pointId.id,
                  carId: this.props.data.carId.id,
                  rateId: this.props.data.rateId.id,
                });
                this.props.history.replace(`/order/${postedOrder.data.id}`);
              }}
            />
            <Button
              text="Вернуться"
              className="Button_decline Button_max Total-Modal-Decline"
              onClick={() => this.action()}
            />
          </div>
        </div>
      </div>
    );
  };
}

Total.defaultProps = {
  onChange: () => {},
  onLoad: () => {},
};

export default Total;
