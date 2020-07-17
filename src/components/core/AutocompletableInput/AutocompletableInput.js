import React, { Component } from "react";

import "./AutocompletableInput.scss";

const Variant = (props) => {
  return (
    <option
      className="AutocompletableInput-Variants-Variant"
      onClick={(event) => {
        props.setInputValue(props.text);
      }}
    >
      {props.text}
    </option>
  );
};

class AutocompletableInput extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.variants = React.createRef();
    this.state = { value: "", variants: props.variants || [] };
  }

  toggleVariants = () => {
    setTimeout(() => {
      this.variants.current.classList.toggle(
        "AutocompletableInput-Variants_isOpen"
      );
    }, 38);
  };

  setInputValue = (value) => {
    this.input.current.focus();
    this.setState((state) => {
      return { ...state, value: value };
    });
  };

  render = () => {
    return (
      <div className="AutocompletableInput">
        <input
          value={this.state.value}
          className="AutocompletableInput-Input"
          ref={this.input}
          onFocus={this.toggleVariants}
          onBlur={() => {
            this.setState((state) => {
              return { ...state, value: this.input.current.value.trim() };
            });
            this.toggleVariants();
          }}
          placeholder={this.props.placeholder || ""}
          onChange={() => {
            this.setState((state) => {
              return { ...state, value: this.input.current.value.trim() };
            });
          }}
        >
        </input>
        {/* <button
          className={`AutocompletableInput-Clear ${this.input.current.focus}`}
          onClick={() => this.setInputValue("")}
        ></button> */}
        <datalist
          className="AutocompletableInput-Variants"
          ref={this.variants}
          onClick={(event) => {
            console.log(event.target);
          }}
        >
          {this.state.variants
            .filter((variant) =>
              variant.toLowerCase().startsWith(this.state.value.toLowerCase())
            )
            .map((e, i) => {
              return (
                <Variant text={e} key={i} setInputValue={this.setInputValue} />
              );
            })}
        </datalist>
      </div>
    );
  };
}

export default AutocompletableInput;
