import React, { Component, Fragment } from "react";

import "./RadiobuttonGroup.scss";

class RadiobuttonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.data[0].value };
  }

  render = () => {
    return (
      <Fragment>
        {this.props.data.map((e, i) => {
          return (
            <div className="Radiobutton" key={i}>
              <label className="Radiobutton-Label">
                <input
                  checked={e.value === this.state.value}
                  type="radio"
                  className="Radiobutton-Input"
                  name={this.props.name}
                  value={e.value}
                  onChange={(e) => {
                    this.setState({ value: e.target.value });
                  }}
                />
                <span className="Radiobutton-FakePoint">{e.text}</span>
              </label>
            </div>
          );
        })}
      </Fragment>
    );
  };
}

export default RadiobuttonGroup;
