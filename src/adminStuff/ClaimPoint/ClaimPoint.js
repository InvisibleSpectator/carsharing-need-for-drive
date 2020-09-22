import React from "react";
import {
  YMaps,
  Map,
  ZoomControl,
  SearchControl,
  Placemark,
} from "react-yandex-maps";

import "./ClaimPoint.scss";
import {
  YANDEX_API_KEY,
  getGeoData,
  getFromTableByIdClient,
  getAllFromTableClient,
  postToTableAdmin,
  putToTableAdmin,
  deleteFromTableAdmin,
} from "../../utils";
import { AdminInput } from "../AdminInput";
import { AdminButton } from "../AdminButton";
import { Spinner } from "../../core/Spinner";

class ClaimPoint extends React.Component {
  constructor(props) {
    super(props);
    this.searchControl = React.createRef();
    this.map = React.createRef();
    this.nameInput = React.createRef();
    this.cityInput = React.createRef();
    this.addressInput = React.createRef();
    this.state = {
      name: "",
      address: "",
      city: "",
      coords: null,
      id: null,
      isDataLoaded: false,
      isDataFormed: Boolean(this.props.match.params.id),
    };
  }

  componentDidMount = async () => {
    if (this.props.match.params.id) {
      let point = await getFromTableByIdClient(
        "point",
        this.props.match.params.id
      );
      point = point.data;
      const coords = await getGeoData(
        YANDEX_API_KEY,
        point.cityId.name + "," + point.address
      );

      this.setState({
        city: point.cityId.name,
        name: point.name,
        address: point.address,
        coords: coords.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .reverse(),
        id: point.id,
        isDataLoaded: true,
      });
    } else this.setState({ isDataLoaded: true });
  };

  parseAddress = (prefix) => {
    const tmpAddress =
      prefix.metaDataProperty.GeocoderMetaData.Address.Components;
    if (tmpAddress.some((e) => e.kind === "house")) {
      const retValue = {
        city: tmpAddress.find((e) => e.kind === "locality").name,
        address: `${tmpAddress.find((e) => e.kind === "street").name} ${
          tmpAddress.find((e) => e.kind === "house").name
        }`,
      };
      this.cityInput.current.setValue(retValue.city);
      this.addressInput.current.setValue(retValue.address);
      return retValue;
    }
    return false;
  };

  updateName = (name) => {
    this.setState((state) => ({
      name,
      isDataFormed: this.nameInput.current.validate() && Boolean(state.address),
    }));
  };

  getCoordsFromSearch = (e) => {
    const index = e.get("index");
    const tempPoint = this.searchControl.getResultsArray()[index];
    const parsedAddress = this.parseAddress(tempPoint.properties._data);
    if (parsedAddress)
      this.setState({
        ...parsedAddress,
        isDataFormed: this.nameInput.current.validate(),
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
        isDataFormed: this.nameInput.current.validate(),
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

  acceptButtonHandler = async () => {
    let cities = (await getAllFromTableClient("city")).data;
    let city =
      cities.find((e) => e.name === this.state.city) ||
      (
        await postToTableAdmin(
          "city",
          { name: this.state.city },
          this.props.bearer
        )
      ).data;
    if (this.props.match.params.id) {
      await putToTableAdmin(
        "point",
        this.state.id,
        { cityId: city.id, name: this.state.name, address: this.state.address },
        this.props.bearer
      );
    } else {
      await postToTableAdmin(
        "point",
        { cityId: city.id, name: this.state.name, address: this.state.address },
        this.props.bearer
      );
      setTimeout(() => {
        this.props.history.push("/admin/pointlist");
      }, 2000);
    }
  };

  abortButtonHandler = () => {
    this.props.history.push("/admin/pointlist");
  };

  deleteButtonHandler = async () => {
    await deleteFromTableAdmin(
      "point",
      this.props.match.params.id,
      this.props.bearer
    );
    setTimeout(() => {
      this.props.history.push("/admin/pointlist");
    }, 2000);
  };

  render = () => {
    return (
      <div className="ClaimPoint">
        <h2 className="AdminPage-Title">Пункт выдачи</h2>
        <div className="ClaimPoint-Grid">
          {this.state.isDataLoaded ? (
            <>
              <div className="AdminStyledBlock">
                <YMaps query={{ apikey: YANDEX_API_KEY }}>
                  <Map
                    onClick={this.getCoordsFromClick}
                    instanceRef={(ref) => {
                      this.map = ref;
                    }}
                    className="AdminStyledBlock-Content ClaimPoint-Map"
                    defaultState={{
                      center: this.state.coords || [60.4, 93.98],
                      zoom: this.state.coords ? 17 : 3,
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
                      instanceRef={(ref) => {
                        this.searchControl = ref;
                      }}
                      onResultShow={this.getCoordsFromSearch}
                    />
                    <ZoomControl />
                  </Map>
                </YMaps>
              </div>
              <div className="AdminStyledBlock ClaimPoint-Controls">
                <div className="AdminStyledBlock-Content">
                  <AdminInput
                    text="Название точки"
                    validationExp={/^(([А-Яа-я]*|\w*\s)([А-Яа-я]|\w))+$/g}
                    validationError="Строка пустая"
                    value={this.state.name}
                    onChange={this.updateName}
                    ref={this.nameInput}
                  />
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
                  <AdminButton
                    className={
                      this.state.isDataFormed ? "" : "AdminButton_disabled"
                    }
                    text="Сохранить"
                    onClick={this.acceptButtonHandler}
                  />
                  <AdminButton
                    text="Отменить"
                    className="AdminButton_gray"
                    onClick={this.abortButtonHandler}
                  />
                  {this.props.match.params.id ? (
                    <AdminButton
                      text="Удалить"
                      className="AdminButton_decline"
                      onClick={this.deleteButtonHandler}
                    />
                  ) : (
                    ""
                  )}{" "}
                </div>
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  };
}

export default ClaimPoint;
