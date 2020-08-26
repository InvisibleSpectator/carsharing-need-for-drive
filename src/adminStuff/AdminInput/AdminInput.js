import React, { Component } from "react";

import "./AdminInput.scss"

class AdminInput extends Component {
  constructor(props) {
    super(props);
  }
  render = () => (
    <label className={`AdminInput ${this.props.className}`}>
      <span>{this.props.text}</span>
      <input type={this.props.type} />
    </label>
  );
}

export default AdminInput
