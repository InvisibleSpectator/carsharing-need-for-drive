import React from "react";
import "./Button.scss";

const Button = (props) => (
  <button
    type="button"
    disabled={props.className.includes("Button_disabled")}
    className={`Button ${props.className}`}
    onClick={props.onClick}
  >
    <span
      className={
        props.className.includes("Button_loading")
          ? "Button-Text Button-Text_loading"
          : "Button-Text"
      }
    >
      {props.text}
    </span>
    <span className="Button-Spinner" />
  </button>
);

Button.defaultProps = {
  className: "Button_default",
  text: "",
  onClick: () => {},
};

export default Button;
