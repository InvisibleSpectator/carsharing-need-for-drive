import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <button className={`Button ${props.className}`}>
      <span className={props.className.includes("Button_loading") ? "Button-Text Button-Text_loading" : "Button-Text"}>{props.text}</span>
      <div className={props.className.includes("Button_loading") ? "Button-Spinner" : "Button-Spinner_disabled"}></div>
    </button>
  );
};

Button.defaultProps = { className: "Button_default",text:'' };

export default Button;
