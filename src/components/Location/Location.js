import React, { Component } from "react";
import {
  YMaps,
  Map,
  Placemark,
  Clusterer,
  ZoomControl,
} from "react-yandex-maps";
import { AutocompletableInput } from "../../core/AutocompletableInput";
import { getAllFromTableClient, getGeoData, YANDEX_API_KEY } from "../../utils";

import "./Location.scss";
import { Spinner } from "../../core/Spinner";

class Location extends Component {
  constructor(props) {
    super(props);
    this.cityInput = React.createRef();
    this.addressInput = React.createRef();
    this.map = React.createRef();
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
    this.setState((state) => {
      const marker = state.points.find(
        (e) => e.cityId.name === state.city && e.name === point
      );
      if (marker) {
        this.map.setCenter(
          marker.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .reverse(),
          17,
          { duration: 1000, timingFunction: "ease-in-out" }
        );
      }
      return {
        isCityDone: this.cityInput.current.isDone(),
        data: {
          cityId: state.cities.find((e) => e.name === state.city),
          pointId: marker,
        },
      };
    }, this.props.onChange);
  };

  componentDidMount = async () => {
    const cities = await getAllFromTableClient("city");
    const points = await getAllFromTableClient("point");
    const geomarkers = [];
    const tpmCities = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const city of cities.data) {
      tpmCities.push({
        // eslint-disable-next-line no-await-in-loop
        ...(await getGeoData(YANDEX_API_KEY, `${city.name}`)),
        ...city,
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const address of points.data) {
      geomarkers.push({
        // eslint-disable-next-line no-await-in-loop
        ...(await getGeoData(
          YANDEX_API_KEY,
          `${address.cityId.name},${address.address}`
        )),
        ...address,
      });
    }
    this.setState({
      cities: tpmCities,
      points: geomarkers,
      loaded: true,
    });
  };

  onCityChange = (value) =>
    this.setState((state) => {
      if (state.city !== value) this.addressInput.current.setInputValue("");
      const marker = state.cities.find((e) => e.name === value);
      if (marker) {
        this.map.setCenter(
          marker.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .reverse(),
          10,
          { duration: 1000, timingFunction: "ease-in-out" }
        );
      }
      return {
        city: value,
        isCityDone: this.cityInput.current.isDone(),
      };
    });

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
            onChange={this.onCityChange}
            placeholder="Начните вводить город выдачи"
            variants={this.state.cities.map((e) => [e.name])}
          />
          <span>Пункт выдачи</span>
          <AutocompletableInput
            ref={this.addressInput}
            defaultValue={
              this.state.data.pointId ? this.state.data.pointId.name : ""
            }
            disabled={!(this.state.isCityDone || this.state.data.pointId)}
            onChange={this.updateData}
            placeholder={
              this.state.points.filter((e) => e.cityId.name === this.state.city)
                .length > 0 || !this.state.isCityDone
                ? "Начните вводить пункт выдачи"
                : "Пунктов выдачи нет"
            }
            variants={this.state.points
              .filter((e) => e.cityId.name === this.state.city)
              .map((e) => [e.name, e.address])}
          />
        </div>
        <div className="Location-Map">
          <span>Выбрать на карте:</span>
          <YMaps>
            <Map
              className="Location-Map-MapBox"
              options={{ autoFitToViewport: "always" }}
              defaultState={{
                center: this.state.data.pointId
                  ? this.state.data.pointId.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                      .split(" ")
                      .reverse()
                  : [60.4, 93.98],
                zoom: 3,
              }}
              instanceRef={(ref) => {
                this.map = ref;
              }}
            >
              {this.state.cities.map((city) => {
                return (
                  <Clusterer
                    key={city.id}
                    options={{
                      preset: "islands#invertedGreenClusterIcons",
                      groupByCoordinates: false,
                    }}
                  >
                    {this.state.points
                      .filter((point) => point.cityId.id === city.id)
                      .map((point) => (
                        <Placemark
                          key={point.id}
                          properties={{ iconCaption: point.name }}
                          options={{
                            preset: "islands#greenCircleIcon",
                          }}
                          onClick={() => {
                            this.cityInput.current.setInputValue(city.name);
                            this.addressInput.current.setInputValue(point.name);
                          }}
                          geometry={point.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                            .split(" ")
                            .reverse()}
                        />
                      ))}
                  </Clusterer>
                );
              })}
              <ZoomControl />
            </Map>
          </YMaps>
        </div>
      </div>
    ) : (
      <Spinner />
    );
}

export default Location;
