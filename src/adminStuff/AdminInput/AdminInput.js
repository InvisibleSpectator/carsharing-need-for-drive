import React, { Component } from "react";

import "./AdminInput.scss";

class AdminInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value || "" };
  }

  updateValue = (e) => {
    this.setState({
      value: this.props.trim ? e.target.value.trim() : e.target.value,
    });
  };

  getValue = () => this.state.value;

  setValue = (value) => {
    this.setState({ value });
  };

  render = () => (
    <label className={`AdminInput ${this.props.className}`}>
      <div className="AdminInput-Titles">
        <span className="AdminInput-Titles-Title">{this.props.text}</span>
        {this.props.type === "range" ? (
          <span className="AdminInput-Titles-Value">{+this.state.value} %</span>
        ) : (
          ""
        )}
      </div>
      <input
        readOnly={this.props.readOnly}
        value={
          this.props.type === "range" ? +this.state.value : this.state.value
        }
        type={this.props.type}
        onChange={this.updateValue}
      />
    </label>
  );
}

export default AdminInput;
