import React, { Component } from "react";
import { AutocompletableInput } from "../../core/AutocompletableInput";

import "./Location.scss";

class Location extends Component {
  constructor(props) {
    super(props);
    this.cityInput = React.createRef();
    this.addressInput = React.createRef();
    this.state = {
      cities: [],
      points: [],
      city: props.city ? props.city.name : "",
      isCityDone: false,
      isDone: false,
      data: { cityId: props.city || {}, pointId: props.point || {} },
    };
  }

  getData = () => this.state.data;

  isDone = () => this.state.isDone;

  updateData = (point) => {
    this.setState(
      (state) => ({
        data: {
          cityId: state.cities.find((e) => e.name === state.city),
          pointId: state.points.find(
            (e) => e.cityId.name === state.city && e.name === point
          ),
        },
        isDone:
          this.cityInput.current.isDone() && this.addressInput.current.isDone(),
      }),
      this.props.onChange
    );
  };

  componentDidMount = async () => {
    const citiesResponse = await fetch(
      "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/city",
      {
        method: "GET",
        headers: { "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b" },
      }
    );
    const cities = await citiesResponse.json();
    const pointsResponse = await fetch(
      "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/point",
      {
        method: "GET",
        headers: { "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b" },
      }
    );
    const points = await pointsResponse.json();
    this.setState(
      {
        cities: cities.data,
        points: points.data,
      },
      () => {
        this.addressInput.current.setInputValue(
          this.props.point ? this.props.point.name : ""
        );
        this.cityInput.current.setInputValue(
          this.props.city ? this.props.city.name : ""
        );
      }
    );
  };

  render = () => (
    <div className="Location">
      <div className="Location-EditableFields">
        <span>Город</span>
        <AutocompletableInput
          ref={this.cityInput}
          onChange={(value) =>
            this.setState((state) => {
              if (state.city !== value)
                this.addressInput.current.setInputValue("");
              return {
                city: value,
                isCityDone: this.cityInput.current.isDone(),
              };
            })
          }
          placeholder="Начните вводить город выдачи"
          variants={this.state.cities.map((e) => e.name)}
        />
        <span>Пункт выдачи</span>
        <AutocompletableInput
          ref={this.addressInput}
          disabled={!this.state.isCityDone}
          onChange={(point) => this.updateData(point)}
          placeholder="Начните вводить пункт выдачи"
          variants={this.state.points
            .filter((e) => e.cityId.name === this.state.city)
            .map((e) => e.name)}
        />
      </div>
      <div className="Location-Map">
        <span>Выбрать на карте:</span>
        <div className="Location-Map-MapBox">
          <img src={require("../../assets/Rectangle.png")} alt="map" />
        </div>
      </div>
    </div>
  );
}

export default Location;
