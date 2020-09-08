import React from "react";
import {
  YMaps,
  Map,
  ZoomControl,
  SearchControl,
  Placemark,
} from "react-yandex-maps";

import "./ClaimPoint.scss";
import { YANDEX_API_KEY, getGeoData } from "../../utils";
import { AdminInput } from "../AdminInput";
import { AdminButton } from "../AdminButton";

class ClaimPoint extends React.Component {
  constructor(props) {
    super(props);
    this.searchControl = React.createRef();
    this.map = React.createRef();

    this.cityInput = React.createRef();
    this.addressInput = React.createRef();
    this.state = { name: "", address: "", city: "", coords: null };
  }

  parseAddress = (prefix) => {
    const tmpAddress =
      prefix.metaDataProperty.GeocoderMetaData.Address.Components;
    if (tmpAddress.some((e) => e.kind === "house")) {
      const retValue = {
        city: tmpAddress.find((e) => e.kind === "locality").name,
        address:
          tmpAddress.find((e) => e.kind === "street").name +
          " " +
          tmpAddress.find((e) => e.kind === "house").name,
      };
      this.cityInput.current.setValue(retValue.city);
      this.addressInput.current.setValue(retValue.address);
      return retValue;
    } else return false;
  };

  updateName = (name) => {
    this.setState({ name });
  };

  getCoordsFromSearch = (e) => {
    const index = e.get("index");
    const tempPoint = this.searchControl.getResultsArray()[index];
    const parsedAddress = this.parseAddress(tempPoint.properties._data);
    if (parsedAddress)
      this.setState({
        ...parsedAddress,
        coords: tempPoint.geometry._coordinates,
      });
    this.map.setCenter(
      tempPoint.geometry._coordinates,
      parsedAddress ? 17 : 12,
      {
        duration: 1000,
        timingFunction: "ease-in-out",
      }
    );
  };

  getCoordsFromClick = async (e) => {
    const coords = e.get("coords");
    const tempPoint = await getGeoData(
      YANDEX_API_KEY,
      coords.reverse().join("+")
    );
    const parsedAddress = this.parseAddress(
      tempPoint.GeoObjectCollection.featureMember[0].GeoObject
    );
    if (parsedAddress)
      this.setState({
        ...parsedAddress,
        coords: tempPoint.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .reverse(),
      });
    this.map.setCenter(
      parsedAddress
        ? tempPoint.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .reverse()
        : coords.reverse(),
      17,
      {
        duration: 1000,
        timingFunction: "ease-in-out",
      }
    );
  };

  render = () => {
    return (
      <div className="ClaimPoint">
        <h2 className="AdminPage-Title">Пункт выдачи</h2>
        <div className="ClaimPoint-Grid">
          <div className="AdminStyledBlock">
            <YMaps query={{ apikey: YANDEX_API_KEY }}>
              <Map
                onClick={this.getCoordsFromClick}
                instanceRef={(ref) => (this.map = ref)}
                className="AdminStyledBlock-Content ClaimPoint-Map"
                defaultState={{
                  center: [60.4, 93.98],
                  zoom: 3,
                }}
              >
                {this.state.coords ? (
                  <Placemark
                    properties={{ iconCaption: this.state.name }}
                    options={{
                      preset: "islands#greenCircleIcon",
                    }}
                    geometry={this.state.coords}
                  />
                ) : (
                  ""
                )}
                <SearchControl
                  options={{ noPlacemark: true, noCentering: true }}
                  instanceRef={(ref) => (this.searchControl = ref)}
                  onResultShow={this.getCoordsFromSearch}
                />
                <ZoomControl />
              </Map>
            </YMaps>
          </div>
          <div className="AdminStyledBlock ClaimPoint-Controls">
            <div className="AdminStyledBlock-Content">
              <AdminInput text="Название точки" onChange={this.updateName} />
              <AdminInput
                readOnly
                text="Город"
                value={this.state.city}
                ref={this.cityInput}
              />
              <AdminInput
                readOnly
                text="Адрес"
                value={this.state.address}
                ref={this.addressInput}
              />
            </div>
            <div className=" AdminStyledBlock-Content ClaimPoint-Buttons">
              <AdminButton text="Сохранить" />
              <AdminButton text="Отменить" className="AdminButton_gray" />
              <AdminButton text="Удалить" className="AdminButton_decline" />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default ClaimPoint;
