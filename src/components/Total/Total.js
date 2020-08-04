import React, { Component } from "react";
import "./Total.scss";
import { Button } from "../../core/Button";
import { formatDate, postToTableClient } from "../../utils";

class Total extends Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.state = { isDone: true, data: this.props.data || {} };
    props.onChange();
  }

  getData = () => null;

  isDone = () => this.state.isDone;

  action = () => {
    this.modal.current.classList.toggle("Total-Modal_disabled");
  };

  render = () => {
    return (
      <div className="Total">
        <div className="Total-Text">
          <h2>{this.state.data.carId.name}</h2>
          {this.state.data.carId.number ? (
            <span className="Total-Text-Number">
              {this.state.data.carId.number}
            </span>
          ) : (
            ""
          )}
          {this.state.data.carId.tank ? (
            <span>
              <span className="Total-Text-Title">Топливо</span>{" "}
              <span className="Total-Text-Value">
                {this.state.data.carId.tank}%
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
              defaultValue={formatDate(new Date(this.state.data.dateFrom))}
            />
          </span>
        </div>
        <div className="Total-Image">
          <img
            src={`http://api-factory.simbirsoft1.com/${this.state.data.carId.thumbnail.path}`}
            alt="car"
          />
        </div>
        <div className="Total-Modal Total-Modal_disabled" ref={this.modal}>
          <div className="Total-Modal-Grid">
            <span className="Total-Modal-Text">Подтвердить заказ</span>
            <Button
              text="Подтвердить"
              className="Button_max Total-Modal-Accept"
              onClick={() =>
                postToTableClient("order", {
                  ...this.state.data,
                  orderStatusId: this.state.data.orderStatusId.id,
                  cityId: this.state.data.cityId.id,
                  pointId: this.state.data.pointId.id,
                  carId: this.state.data.carId.id,
                  rateId: this.state.data.rateId.id,
                })
              }
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

export default Total;
