import React, { Component } from "react";
import { AutocompletableInput } from "../../../core/AutocompletableInput";

import "./Location.scss";

class Location extends Component {
  constructor(props) {
    super(props);
    this.cityInput = React.createRef();
    this.addressInput = React.createRef();
    this.state = { isDone: false, data: { city: "", address: "" } };
  }

  getData = () => {
    return this.state.data;
  };

  isDone = () => {
    return this.state.isDone;
  };

  updateData = () => {
    this.setState((state) => {
      return {
        data:
          this.cityInput.current.getValue() ||
          this.addressInput.current.getValue()
            ? {
                city: this.cityInput.current.getValue(),
                address: this.addressInput.current.getValue(),
              }
            : null,
        isDone:
          this.cityInput.current.isDone() && this.addressInput.current.isDone(),
      };
    }, this.props.onChange);
  };

  render = () => {
    return (
      <div className="Location">
        <div className="Location-EditableFields">
          <span>Город</span>
          <AutocompletableInput
            ref={this.cityInput}
            onChange={() => this.updateData()}
            placeholder="Начните вводить город выдачи"
            variants={[
              "Самара",
              "Москва",
              "Ульяновск",
              "Саратов",
              "Нижний",
              "Омск",
            ]}
          />
          <span>Пункт выдачи</span>
          <AutocompletableInput
            ref={this.addressInput}
            onChange={() => this.updateData()}
            placeholder="Начните вводить пункт выдачи"
            variants={["Выше", "Ниже", "Левее", "Правее", "Центр", "Омск"]}
          />
        </div>
        <div className="Location-Map">
          <span>Выбрать на карте:</span>
          <div className="Location-Map-MapBox">
            <img src={require("../../../../assets/Rectangle.png")} alt="map"></img>
          </div>
        </div>
      </div>
    );
  };
}

export default Location;
