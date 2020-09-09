import React, { useCallback } from "react";

import "./CarCard.scss";

import placeholder from "../../assets/icons/no_image.png";
import { AdminInput } from "../AdminInput";
import { AdminButton } from "../AdminButton";
import RadiobuttonGroup from "../../core/RadiobuttonGroup/RadiobuttonGroup";

const ColorSample = ({ color, removeColor }) => {
  const clickHandler = useCallback(() => removeColor(color), [
    color,
    removeColor,
  ]);
  return (
    <div className="ColorSample">
      <span className="ColorSample-Text">{color}</span>
      <div onClick={clickHandler} className="ColorSample-Delete" />
    </div>
  );
};

class CarCard extends React.Component {
  constructor(props) {
    super(props);
    this.colorInput = React.createRef();
    this.state = { colors: new Set() };
  }

  addColor = () => {
    const testValue = this.colorInput.current.getValue().trim();
    if (testValue)
      this.setState(
        (state) => ({ colors: state.colors.add(testValue) }),
        this.colorInput.current.setValue("")
      );
    else this.colorInput.current.setValue(testValue);
  };

  removeColor = (color) => {
    this.setState((state) => {
      const tmpColors = state.colors;
      tmpColors.delete(color);
      return { colors: tmpColors };
    });
  };

  render = () => {
    return (
      <div className="CarCard">
        <h2 className="AdminPage-Title">Карточка автомобиля</h2>
        <div className="CarCard-Settings">
          <div className="AdminStyledBlock CarCard-Settings-Card">
            <div className="CarCard-Settings-ImageBlock AdminStyledBlock-Content">
              <img
                className="CarCard-Settings-ImageBlock-Image"
                alt="car"
                src={placeholder}
              />
              <span className="CarCard-Settings-ImageBlock-Name">
                Hyndai, i30 N
              </span>
              <label className="CarCard-Settings-File">
                <input className="CarCard-Settings-File-Hidden" type="file" />
                <span className="CarCard-Settings-File-Custom">
                  <span />
                  <span className="CarCard-Settings-File-Custom-Button">
                    Обзор
                  </span>
                </span>
              </label>
            </div>
            <div className="AdminStyledBlock-Content CarCard-Settings-Progress">
              <div className="CarCard-Settings-Progress-Title">
                <span>Заполненно</span> <span>%</span>
              </div>
              <span className="CarCard-Settings-Progress-ProgressBar">
                <span
                  className="CarCard-Settings-Progress-ProgressBar-Value"
                  style={{ width: `${(this.state.colors.size > 0) * 20}%` }}
                />
              </span>
            </div>
            <div className="AdminStyledBlock-Content">
              <label className="CarCard-Settings-Description">
                <span className="CarCard-Settings-Description-Title">
                  Описание
                </span>
                <textarea className="CarCard-Settings-Description-TextArea" />
              </label>
            </div>
          </div>
          <div className="AdminStyledBlock CarCard-Settings-Details">
            <div>
              <h3 className="AdminStyledBlock-Content CarCard-Settings-Details-Title">
                Настройки автомобиля
              </h3>
              <div className="AdminStyledBlock-Content CarCard-Settings-Details-Fields">
                <AdminInput text="Модель автомобиля" type="text" />
                <AdminInput text="Топливо" type="range" />
                <div className="CarCard-Settings-Details-Fields-Prices">
                  <AdminInput text="Минимальная цена" type="number" />
                  <AdminInput text="Максимальная цена" type="number" />
                </div>
                <AdminInput text="Номер" type="text" />
                <div className="CarCard-Settings-Details-Fields-Colors">
                  <div className="CarCard-Settings-Details-Fields-Colors-Controls">
                    <AdminInput
                      text="Доступные цвета"
                      className="CarCard-Settings-Details-Fields-Colors-Controls-Input"
                      type="text"
                      ref={this.colorInput}
                    />
                    <button
                      type="button"
                      onClick={this.addColor}
                      className="CarCard-Settings-Details-Fields-Colors-Controls-Button"
                    />
                  </div>
                  <div className="CarCard-Settings-Details-Fields-Colors-Samples">
                    {Array.from(this.state.colors).map((e, i) => (
                      <ColorSample
                        key={i}
                        color={e}
                        removeColor={this.removeColor}
                      />
                    ))}
                  </div>
                </div>
                <div className="CarCard-Settings-Details-Fields-PriceRange">
                  <span className="CarCard-Settings-Details-Fields-PriceRange-Title">
                    Ценовая категория
                  </span>
                  <div className="CarCard-Settings-Details-Fields-PriceRange-Radiobuttns">
                    <RadiobuttonGroup
                      name="priceRange"
                      data={[
                        { value: "Эконом", text: "Эконом" },
                        { value: "Премиум", text: "Премиум" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" AdminStyledBlock-Content CarCard-Buttons">
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

export default CarCard;
