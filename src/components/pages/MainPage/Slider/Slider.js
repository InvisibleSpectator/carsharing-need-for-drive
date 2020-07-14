import React from "react";
import "./Slider.scss";
import { Slide } from "./-Slide";
import content from "../../../../content/content.json";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      data: content,
    };
  }

  arrowLeftAction = () => {
    let tmp = this.state.current;
    tmp--;
    if (tmp < 0) {
      tmp = this.state.data.length - 1;
    }
    this.setActive(tmp);
  };

  arrowRightAction = () => {
    let tmp = this.state.current;
    tmp++;
    if (tmp > this.state.data.length - 1) {
      tmp = 0;
    }
    this.setActive(tmp);
  };

  setActive(index) {
    this.setState((state) => {
      return { ...this.state, current: index };
    });
  }

  render = () => {
    return (
      <div className="Slider">
        <div
          className="Slider-Arrow Slider-Arrow_left"
          onClick={this.arrowLeftAction}
        ></div>
        <div
          className="Slider-Arrow Slider-Arrow_right"
          onClick={this.arrowRightAction}
        ></div>
        {this.state.data.map((e, i) => {
          return (
            <Slide head={e.name} text={e.text} img={e.img} key={i} className={i===this.state.current?"Slider-Slide_active":""}></Slide>
          );
        })}

        <div className="Slider-Dots">
          {this.state.data.map((e, i) => {
            return (
              <div
                className={`${
                  i === this.state.current ? "Slider-Dot_active " : ""
                }Slider-Dot`}
                key={i}
                onClick={() => {
                  this.setActive(i);
                }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  };
}

export default Slider;
