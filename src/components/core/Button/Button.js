import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <button
      disabled={props.className.includes("Button_disabled")}
      className={`Button ${props.className}`}
      onClick={props.onClick || function () {}}
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
      <span
        className={
          props.className.includes("Button_loading")
            ? "Button-Spinner"
            : "Button-Spinner_disabled"
        }
      ></span>
    </button>
  );
};

Button.defaultProps = { className: "Button_default", text: "" };

export default Button;
