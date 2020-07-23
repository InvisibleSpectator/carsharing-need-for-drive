import React from "react";
import "./Link.scss";

const Link = (props) => (
  <a className={`Link ${props.className}`} href={props.href}>
    {props.text}
  </a>
);

Link.defaultProps = { className: "", href: "#", text: "" };
export default Link;
