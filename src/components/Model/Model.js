import React, { Component, useCallback } from "react";
import "./Model.scss";
import { RadiobuttonGroup } from "../../core/RadiobuttonGroup";
import { getAllFromTableClient, getLocal } from "../../utils";
import { Spinner } from "../../core/Spinner";

const CarCard = ({ car, onClick, className }) => {
  const onClickHandler = useCallback(() => {
    onClick(car);
  }, [car, onClick]);
  return (
    <div
      className={`Model-CarCard ${className || ""}`}
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
    >
      <h3>{car.name}</h3>
      <span>
        <span>{car.priceMax}</span> ₽
      </span>
      <img
        crossOrigin="anonymous"
        referrerPolicy="origin"
        alt="car"
        src={`${car.thumbnail.path}`}
      />
    </div>
  );
};

class Model extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      loaded: false,
      cars: [],
      categories: [{ text: "Все модели", value: "" }],
    };
  }

  componentDidMount = async () => {
    const cars = await getLocal(`db/vehicle/atPoint/${this.props.point.id}`);
    const categories = await getLocal("db/category");
    this.setState((state) => {
      return {
        loaded: true,
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

  onPriceRangeChange = (value) =>
    this.setState(
      (state) => ({
        ...state,
        data: { ...state.data, category: value },
      }),
      this.props.onLoad
    );

  render = () =>
    this.state.loaded ? (
      <div className="Model">
        <div className="Model-Prices">
          <RadiobuttonGroup
            name="priceRange"
            data={this.state.categories}
            defaultValue={this.state.data.category}
            onChange={this.onPriceRangeChange}
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
                  .filter((e) => e.categoryId.id == this.state.data.category)
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
    ) : (
      <Spinner />
    );
}

export default Model;
