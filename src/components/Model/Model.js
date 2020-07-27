import React, { Component } from "react";
import "./Model.scss";
import { RadiobuttonGroup } from "../../core/RadiobuttonGroup";

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
      alt="car"
      src={`http://api-factory.simbirsoft1.com/${props.car.thumbnail.path}`}
    />
  </div>
);

class Model extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false,
      data: this.props.data || null,
      cars: [],
      categories: [{ text: "Все модели", value: "" }],
      category: props.category || "",
    };
  }

  componentDidMount = async () => {
    const carsResponse = await fetch(
      "http://api-factory.simbirsoft1.com/api/db/car",
      {
        method: "GET",
        headers: { "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b" },
      }
    );
    const cars = await carsResponse.json();

    const categoryResponse = await fetch(
      "http://api-factory.simbirsoft1.com/api/db/category",
      {
        method: "GET",
        headers: { "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b" },
      }
    );
    const categories = await categoryResponse.json();
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

  getData = () => {
    return {
      carId: this.state.data,
      category: this.state.category,
    };
  };

  isDone = () => this.state.isDone;

  setData = (car) => {
    this.setState({ data: car, isDone: true }, this.props.onChange);
  };

  render = () => (
    <div className="Model">
      <div className="Model-Prices">
        <RadiobuttonGroup
          name="priceRange"
          data={this.state.categories}
          onChange={(value) =>
            this.setState({ category: value }, this.props.onChange)
          }
        />
      </div>
      <div className="Model-ModelList">
        <div className="Model-ModelList-Belt">
          {this.state.category === ""
            ? this.state.cars.map((e, i) => {
                return (
                  <CarCard
                    key={i}
                    onClick={this.setData}
                    className={
                      (this.state.data ? this.state.data.id : "") === e.id
                        ? "Model-CarCard_selected"
                        : ""
                    }
                    car={e}
                  />
                );
              })
            : this.state.cars
                .filter((e) => e.categoryId.id === this.state.category)
                .map((e, i) => (
                  <CarCard
                    key={i}
                    onClick={this.setData}
                    className={
                      (this.state.data ? this.state.data.id : "") === e.id
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
