import React, { Component, useCallback, Fragment } from "react";

import "./AutocompletableInput.scss";

const Variant = ({ text, setInputValue }) => {
  const clickHandler = useCallback(() => {
    setInputValue(text[0]);
  }, [text, setInputValue]);

  const keyDownHandler = useCallback(() => {
    setInputValue(text[0]);
  }, [text, setInputValue]);

  return (
    <p
      className="AutocompletableInput-Variants-Variant"
      onClick={clickHandler}
      onKeyDown={keyDownHandler}
    >
      {text.map((e, i) => (
        <Fragment key={i}>
          <span>{e}</span>
          <br />
        </Fragment>
      ))}
    </p>
  );
};

class AutocompletableInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || "",
    };
    this.state.filtered = props.variants.filter((variant) =>
      variant.some((e) =>
        e.toLowerCase().startsWith(this.state.value.toLowerCase())
      )
    );
  }

  isDone = () =>
    this.props.variants.some((e) =>
      e.some((e2) => e2.toLowerCase() === this.state.value.toLowerCase())
    );

  getValue = () => this.state.value;

  setInputValue = (value) => {
    this.setState(
      {
        value: this.props.variants.find((e) =>
          e.some((e2) => e2.toLowerCase() === value.toLowerCase(value))
        )
          ? this.props.variants.find((e) =>
              e.some((e2) => e2.toLowerCase() === value.toLowerCase(value))
            )[0]
          : value,
      },
      () => this.props.onChange(this.state.value)
    );
  };

  getInputValue = (e) => {
    this.setInputValue(e.target.value.trim());
  };

  clearInput = () => this.setInputValue("");

  render = () => (
    <div className={`${this.props.className || ""} AutocompletableInput`}>
      <input
        value={this.state.value}
        disabled={this.props.disabled}
        className="AutocompletableInput-Input"
        placeholder={this.props.placeholder || ""}
        onChange={this.getInputValue}
      />
      <button
        type="button"
        className="AutocompletableInput-Clear"
        onClick={this.clearInput}
      />
      <div className="AutocompletableInput-Variants">
        {this.state.value.length >= 2
          ? this.props.variants
              .filter((variant) =>
                variant.some((e) =>
                  e.toLowerCase().startsWith(this.state.value.toLowerCase())
                )
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
