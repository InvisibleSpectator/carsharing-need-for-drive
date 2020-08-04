import React, { Component } from "react";
import "./Model.scss";
import { RadiobuttonGroup } from "../../core/RadiobuttonGroup";
import { getAllFromTableClient } from "../../utils";

const CarCard = (props) => (
  <div
    className={`Model-CarCard ${props.className || ""}`}
    onClick={() => {
      props.onClick(props.car);
    }}
    onKeyDown={() => {
      props.onClick(props.car);
    }}
  >
    <h3>{props.car.name.split(",")[1]}</h3>
    <span>
      <span>{props.car.priceMin}</span> - <span>{props.car.priceMax}</span> ₽
    </span>
    <img
      crossOrigin="anonymous"
      referrerPolicy="origin"
      alt="car"
      src={`http://api-factory.simbirsoft1.com${props.car.thumbnail.path}`}
    />
  </div>
);

class Model extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      cars: [],
      categories: [{ text: "Все модели", value: "" }],
    };
  }

  componentDidMount = async () => {
    const cars = await getAllFromTableClient("car");
    const categories = await getAllFromTableClient("category");
    this.setState((state) => {
      return {
        cars: cars.data,
        categories: state.categories.concat(
          categories.data.map((e) => {
            return { value: e.id, text: e.name };
          })
        ),
      };
    });
  };

  getData = () => this.state.data;

  isDone = () =>
    this.state.cars.some((e) =>
      this.state.data.carId ? e.id === this.state.data.carId.id : false
    );

  setData = (car) => {
    this.setState(
      (state) => ({
        ...state,
        data: { ...state.data, carId: car },
      }),
      this.props.onChange
    );
  };

  render = () => (
    <div className="Model">
      <div className="Model-Prices">
        <RadiobuttonGroup
          name="priceRange"
          data={this.state.categories}
          defaultValue={this.state.data.category}
          onChange={(value) =>
            this.setState(
              (state) => ({
                ...state,
                data: { ...state.data, category: value },
              }),
              this.props.onLoad
            )
          }
        />
      </div>
      <div className="Model-ModelList">
        <div className="Model-ModelList-Belt">
          {this.state.data.category === ""
            ? this.state.cars.map((e, i) => {
                return (
                  <CarCard
                    key={i}
                    onClick={this.setData}
                    className={
                      (this.state.data.carId
                        ? this.state.data.carId.id
                        : "") === e.id
                        ? "Model-CarCard_selected"
                        : ""
                    }
                    car={e}
                  />
                );
              })
            : this.state.cars
                .filter((e) => e.categoryId.id === this.state.data.category)
                .map((e, i) => (
                  <CarCard
                    key={i}
                    onClick={this.setData}
                    className={
                      (this.state.data.carId
                        ? this.state.data.carId.id
                        : "") === e.id
                        ? "Model-CarCard_selected"
                        : ""
                    }
                    car={e}
                  />
                ))}
        </div>
      </div>
    </div>
  );
}

export default Model;
