import React, { Component } from "react";

import "./AutocompletableInput.scss";

const Variant = (props) => (
  <p
    className="AutocompletableInput-Variants-Variant"
    onClick={() => {
      props.setInputValue(props.text);
    }}
    onKeyDown={() => {
      props.setInputValue(props.text);
    }}
  >
    {props.text}
  </p>
);

class AutocompletableInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || "",
    };
    this.state.filtered = props.variants.filter((variant) =>
      variant.toLowerCase().startsWith(this.state.value.toLowerCase())
    );
  }

  isDone = () =>
    this.props.variants.some(
      (e) => e.toLowerCase() === this.state.value.toLowerCase()
    );

  getValue = () => this.state.value;

  setInputValue = (value) => {
    this.setState(
      {
        value: this.props.variants.includes(value)
          ? value
          : this.props.variants.find(
              (e) => e.toLowerCase() === value.toLowerCase(value)
            ) || value,
      },
      () => this.props.onChange(this.state.value)
    );
  };

  render = () => (
    <div className={`${this.props.className || ""} AutocompletableInput`}>
      <input
        value={this.state.value}
        disabled={this.props.disabled}
        className="AutocompletableInput-Input"
        placeholder={this.props.placeholder || ""}
        onChange={(e) => {
          this.setInputValue(e.target.value.trim());
        }}
      />
      <button
        type="button"
        className="AutocompletableInput-Clear"
        onClick={() => this.setInputValue("")}
      />
      <div className="AutocompletableInput-Variants">
        {this.state.value.length >= 2
          ? this.props.variants
              .filter((variant) =>
                variant.toLowerCase().startsWith(this.state.value.toLowerCase())
              )
              .map((e, i) => (
                <Variant text={e} key={i} setInputValue={this.setInputValue} />
              ))
          : this.props.variants.map((e, i) => (
              <Variant text={e} key={i} setInputValue={this.setInputValue} />
            ))}
      </div>
    </div>
  );
}

export default AutocompletableInput;
