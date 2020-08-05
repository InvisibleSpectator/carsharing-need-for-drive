import React, { Component } from "react";
import { AutocompletableInput } from "../../core/AutocompletableInput";
import { getAllFromTableClient } from "../../utils";

import "./Location.scss";
import { Spinner } from "../../core/Spinner";

class Location extends Component {
  constructor(props) {
    super(props);
    this.cityInput = React.createRef();
    this.addressInput = React.createRef();
    this.state = {
      loaded: false,
      cities: [],
      points: [],
      city: props.data.cityId ? props.data.cityId.name : "",
      isCityDone: false,
      data: props.data,
    };
  }

  getData = () => this.state.data;

  isDone = () =>
    this.cityInput.current.isDone() && this.addressInput.current.isDone();

  updateData = (point) => {
    this.setState(
      (state) => ({
        isCityDone: this.cityInput.current.isDone(),
        data: {
          cityId: state.cities.find((e) => e.name === state.city),
          pointId: state.points.find(
            (e) => e.cityId.name === state.city && e.name === point
          ),
        },
      }),
      this.props.onChange
    );
  };

  componentDidMount = async () => {
    const cities = await getAllFromTableClient("city");
    const points = await getAllFromTableClient("point");
    this.setState({
      cities: cities.data,
      points: points.data,
      loaded: true,
    });
  };

  render = () =>
    this.state.loaded ? (
      <div className="Location">
        <div className="Location-EditableFields">
          <span>Город</span>
          <AutocompletableInput
            ref={this.cityInput}
            defaultValue={
              this.state.data.cityId ? this.state.data.cityId.name : ""
            }
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
            defaultValue={
              this.state.data.pointId ? this.state.data.pointId.name : ""
            }
            disabled={!(this.state.isCityDone || this.state.data.pointId)}
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
    ) : (
      <Spinner />
    );
}

export default Location;
