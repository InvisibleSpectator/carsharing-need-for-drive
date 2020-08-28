import React, { Component } from "react";

import "./AdminInput.scss";

class AdminInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  updateValue = (e) => {
    this.setState({ value: e.target.value.trim() });
  };

  getValue = () => this.state.value;

  render = () => (
    <label className={`AdminInput ${this.props.className}`}>
      <span>{this.props.text}</span>
      <input
        value={this.state.value}
        type={this.props.type}
        onChange={this.updateValue}
      />
    </label>
  );
}

export default AdminInput;
