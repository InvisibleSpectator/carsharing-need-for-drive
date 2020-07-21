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
    this.isReadyToSlide = false;
    let tmp = this.state.current;
    tmp--;
    if (tmp < 0) {
      tmp = this.state.data.length - 1;
    }
    this.setActive(tmp);
  };

  arrowRightAction = () => {
    this.isReadyToSlide = false;
    let tmp = this.state.current;
    tmp++;
    if (tmp > this.state.data.length - 1) {
      tmp = 0;
    }
    this.setActive(tmp);
  };

  setActive(index) {
    this.setState({ current: index });
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
        <div
          className="Slider-Belt"
          style={{ transform: `translateX(-${100 * this.state.current}%)` }}
        >
          {this.state.data.map((e, i) => {
            return (
              <Slide
                head={e.name}
                text={e.text}
                img={e.img}
                key={i}
                buttonIndex={i % 4}
                className={
                  i === this.state.current ? "Slider-Slide_active" : ""
                }
              ></Slide>
            );
          })}
        </div>
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
