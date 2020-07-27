import React, { Component } from "react";
import "./Total.scss";
import { Button } from "../../core/Button";

class Total extends Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.state = { isDone: true, data: this.props.data || {} };
    props.onChange();
  }

  isDone = () => this.state.isDone;

  action = () => {
    this.modal.current.classList.toggle("Total-Modal_disabled");
  };

  render = () => {
    return (
      <div className="Total">
        <div className="Total-Text">
          <h2>{this.state.data.carId.name}</h2>
          <span className="Total-Text-Number">Н 404 НН 63</span>
          <span>
            <span className="Total-Text-Title">Топливо</span>{" "}
            <span className="Total-Text-Value">100%</span>
          </span>
          <span>
            <span className="Total-Text-Title">Доступна с </span>{" "}
            <span className="Total-Text-Value">12.06.2019 12:00</span>
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
              onClick={() => this.action()}
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
