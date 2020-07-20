import React, { Component } from "react";

import "./AutocompletableInput.scss";

const Variant = (props) => {
  return (
    <p
      className="AutocompletableInput-Variants-Variant"
      onClick={(event) => {
        props.setInputValue(props.text);
      }}
    >
      {props.text}
    </p>
  );
};

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

  isDone = () => {
    return this.state.isDone;
  };

  getValue = () => {
    return this.state.value;
  };

  setInputValue = (value) => {
    this.setState((state) => {
      return {
        value: value,
        filtered: state.variants.filter((variant) =>
          variant.toLowerCase().startsWith(value.toLowerCase())
        ),
        isDone: state.variants.includes(value),
      };
    },this.props.onChange);
  };

  render = () => {
    return (
      <div className={`${this.props.className || ""} AutocompletableInput`}>
        <input
          value={this.state.value}
          className="AutocompletableInput-Input"
          ref={this.input}
          placeholder={this.props.placeholder || ""}
          onChange={() => {
            this.setInputValue(this.input.current.value.trim());
          }}
        ></input>
        <button
          className={`AutocompletableInput-Clear`}
          onClick={() => this.setInputValue("")}
        ></button>
        <div className="AutocompletableInput-Variants" ref={this.variants}>
          {this.state.filtered.map((e, i) => {
            return (
              <Variant text={e} key={i} setInputValue={this.setInputValue} />
            );
          })}
        </div>
      </div>
    );
  };
}

export default AutocompletableInput;
