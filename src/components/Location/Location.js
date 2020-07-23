import React, { Component } from "react";
import { AutocompletableInput } from "../../core/AutocompletableInput";

import "./Location.scss";

class Location extends Component {
  constructor(props) {
    super(props);
    this.cityInput = React.createRef();
    this.addressInput = React.createRef();
    this.state = { isDone: false, data: { city: "", address: "" } };
  }

  getData = () => this.state.data;

  isDone = () => this.state.isDone;

  updateData = () => {
    this.setState(
      () => ({
        data:
          (this.cityInput.current.getValue() &&
            this.cityInput.current.isDone()) ||
          (this.addressInput.current.getValue() &&
            this.addressInput.current.isDone())
            ? {
                city: this.cityInput.current.isDone()
                  ? this.cityInput.current.getValue()
                  : "",
                address: this.addressInput.current.isDone()
                  ? this.addressInput.current.getValue()
                  : "",
              }
            : null,
        isDone:
          this.cityInput.current.isDone() && this.addressInput.current.isDone(),
      }),
      this.props.onChange
    );
  };

  render = () => (
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
          <img src={require("../../assets/Rectangle.png")} alt="map" />
        </div>
      </div>
    </div>
  );
}

export default Location;
