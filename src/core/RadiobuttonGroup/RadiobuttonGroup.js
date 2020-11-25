import React, { Component } from "react";

import "./RadiobuttonGroup.scss";

class RadiobuttonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue || props.data[0].value };
  }

  getValue = () => this.state.value;

  onChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({ value: e.target.value }, () =>
      this.props.onChange(this.state.value)
    );
  };

  render = () => (
    <>
      {this.props.data.map((element, i) => (
        <div className="Radiobutton" key={i}>
          <label className="Radiobutton-Label">
            <input
              checked={
                element.value == this.props.defaultValue ||
                element.value == this.state.value
              }
              type="radio"
              className="Radiobutton-Input"
              name={this.props.name}
              value={element.value}
              onChange={this.onChangeHandler}
            />
            <span className="Radiobutton-FakePoint">{element.text}</span>
          </label>
        </div>
      ))}
    </>
  );
}

export default RadiobuttonGroup;
