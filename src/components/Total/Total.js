import React, { Component } from "react";
import "./Total.scss";
import { Button } from "../../core/Button";
import {
  formatDate,
  postToTableClient,
  postToLocal,
  putToTableClient,
  getLocal,
} from "../../utils";

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
    // await putToTableClient("order", this.props.data.id, {
    //   ...this.props.data,
    //   orderStatusId: "5e26a1f5099b810b946c5d8c",
    //   cityId: this.props.data.cityId.id,
    //   pointId: this.props.data.pointId.id,
    //   vehicleId: this.props.data.vehicleId.id,
    //   rateId: this.props.data.rateId.id,
    // });
    await getLocal(`db/order/cancel/${this.props.data.id}`);
    this.props.onChange();
  };

  getStatus = () => {
    console.log(this.props.data.orderStatus);
    switch (this.props.data.orderStatus) {
      case "NEW":
        return "сформирован";
      case "CANCELED":
        return "отменён";
      case "FINISHED":
        return "подтвёрждён";
      case "ERROR":
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
          <h2>{this.props.data.vehicleId.name}</h2>
          {this.props.data.vehicleId.number ? (
            <span className="Total-Text-Number">
              {this.props.data.vehicleId.number}
            </span>
          ) : (
            ""
          )}
          {this.props.data.vehicleId.tank ? (
            <span>
              <span className="Total-Text-Title">Топливо</span>{" "}
              <span className="Total-Text-Value">
                {this.props.data.vehicleId.tank}%
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
          <img src={`${this.props.data.vehicleId.thumbnail.path}`} alt="car" />
        </div>
        <div className="Total-Modal Total-Modal_disabled" ref={this.modal}>
          <div className="Total-Modal-Grid">
            <span className="Total-Modal-Text">Подтвердить заказ</span>
            <Button
              text="Подтвердить"
              className="Button_max Total-Modal-Accept"
              onClick={async (e) => {
                e.currentTarget.classList.toggle("Button_loading");
                const postedOrder = await postToLocal("db/order/new", {
                  ...this.props.data,
                  orderStatusId: this.props.data.orderStatusId.id,
                  cityId: this.props.data.cityId.id,
                  pointId: this.props.data.pointId.id,
                  vehicleId: this.props.data.vehicleId.id,
                  rateId: this.props.data.rateId.id,
                });
                this.props.history.replace(`/order/${postedOrder.id}`);
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
