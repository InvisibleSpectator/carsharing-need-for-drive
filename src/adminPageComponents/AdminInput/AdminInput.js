import React, { Component } from "react";

import "./AdminInput.scss";

class AdminInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value || "", isValid: true };
  }

  updateValue = (e) => {
    this.setState(
      {
        value: this.props.trim ? e.target.value.trim() : e.target.value,
      },
      () => this.props.onChange(this.state.value)
    );
  };

  validate = () => {
    const isValid = this.props.validationExp.test(this.state.value);
    this.setState({ isValid });
    return isValid;
  };

  getValue = () => this.state.value;

  setValue = (value) => {
    this.setState({ value });
  };

  render = () => (
    <label
      className={`AdminInput ${this.props.className} ${
        !this.state.isValid ? "AdminInput_isError" : ""
      }`}
    >
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
      <div className="AdminInput-Error">{this.props.validationError}</div>
    </label>
  );
}

AdminInput.defaultProps = {
  onChange: () => {},
  className: "",
};

export default AdminInput;
