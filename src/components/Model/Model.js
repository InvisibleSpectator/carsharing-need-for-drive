import React, { Component } from "react";
import "./Model.scss";
import { RadiobuttonGroup } from "../../core/RadiobuttonGroup";

const CarCard = (props) => {
  return (
    <div
      className={`Model-CarCard ${props.className || ""}`}
      onClick={() => {
        props.onClick(props.car);
      }}
    >
      <h3>{props.car.model}</h3>
      <span>
        <span>{props.car.priceLow}</span> - <span>{props.car.priceHigh}</span> ₽
      </span>
      <img alt="car" src={props.car.image} />
    </div>
  );
};

class Model extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false,
      data: null,
      cars: [
        {
          model: "elantra",
          priceHigh: "32000",
          priceLow: "12000",
          image:
            "http://api-factory.simbirsoft1.com/files/5ea9bc01099b810b946c71de_825e7de08c4523e9a81ebe8d0ad04616.png",
        },
      ],
    };
  }

  getData = () => {
    return this.state.data;
  };

  isDone = () => {
    return this.state.isDone;
  };

  setData = (car) => {
    this.setState({ data: car });
  };

  render = () => {
    return (
      <div className="Model">
        <div className="Model-Prices">
          <RadiobuttonGroup
            name="priceRange"
            data={[
              { value: "any", text: "Все модели" },
              { value: "cheap", text: "Эконом" },
              { value: "expensive", text: "Премиум" },
            ]}
          />
        </div>
        <div className="Model-ModelList">
          <div className="Model-ModelList-Belt">
            {this.state.cars.map((e, i) => {
              return (
                <CarCard
                  key={i}
                  onClick={this.setData}
                  className={
                    this.state.data === e ? "Model-CarCard_selected" : ""
                  }
                  car={e}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };
}

export default Model;
