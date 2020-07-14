import React from "react";
import { Button } from "../../../../core/Button";

const Slide = (props) => {
  return (
    <section
      className={`${props.className} Slider-Slide`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${require(`../../../../../content/pictures/${props.img}`)}`,
      }}
    >
      <div className="Slider-Slide-Content">
        <h2 className="Slider-Slide-Name">{props.head}</h2>
        <p className="Slider-Slide-Text">{props.text}</p>
        <Button text="Подробнее"></Button>
      </div>
    </section>
  );
};

export default Slide;
