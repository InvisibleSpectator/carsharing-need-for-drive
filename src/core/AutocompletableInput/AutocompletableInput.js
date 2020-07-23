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
    this.input = React.createRef();
    this.variants = React.createRef();
    this.state = {
      value: "",
      variants: props.variants || [],
      isDone: false,
    };
    this.state.filtered = props.variants.filter((variant) =>
      variant.toLowerCase().startsWith(this.state.value.toLowerCase())
    );
  }

  isDone = () => this.state.isDone;

  getValue = () => this.state.value;

  setInputValue = (value) => {
    this.setState(
      (state) => ({
        value: state.variants.includes(value)
          ? value
          : state.variants.find(
              (e) => e.toLowerCase() === value.toLowerCase(value)
            ) || value,
        filtered: state.variants.filter((variant) =>
          variant.toLowerCase().startsWith(value.toLowerCase())
        ),
        isDone: state.variants.some(
          (e) => e.toLowerCase() === value.toLowerCase(value)
        ),
      }),
      this.props.onChange
    );
  };

  render = () => (
    <div className={`${this.props.className || ""} AutocompletableInput`}>
      <input
        value={this.state.value}
        className="AutocompletableInput-Input"
        ref={this.input}
        placeholder={this.props.placeholder || ""}
        onChange={() => {
          this.setInputValue(this.input.current.value.trim());
        }}
      />
      <button
        type="button"
        className="AutocompletableInput-Clear"
        onClick={() => this.setInputValue("")}
      />
      <div className="AutocompletableInput-Variants" ref={this.variants}>
        {this.state.value.length >= 2
          ? this.state.filtered.map((e, i) => (
              <Variant text={e} key={i} setInputValue={this.setInputValue} />
            ))
          : this.state.variants.map((e, i) => (
              <Variant text={e} key={i} setInputValue={this.setInputValue} />
            ))}
      </div>
    </div>
  );
}

export default AutocompletableInput;
