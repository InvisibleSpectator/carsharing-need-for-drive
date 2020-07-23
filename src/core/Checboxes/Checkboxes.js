import React, { Component } from "react";

import "./Checkboxes.scss";

class Checkboxes extends Component {
  constructor(props) {
    super(props);
    this.state = { values: props.values || [] };
  }

  getValue = () => this.state.value;

  render = () => (
    <>
      {this.state.values.map((element, i) => (
        <div className="Checkbox" key={i}>
          <label className="Checkbox-Label">
            <input
              checked={element.checked}
              type="checkbox"
              className="Checkbox-Input"
              onChange={(e) => {
                const value = e.target.checked;
                this.setState((state) => {
                  const tmp = state.values;
                  tmp[i].checked = value;
                  return { values: tmp };
                });
              }}
            />
            <span className="Checkbox-FakePoint">{element.text}</span>
          </label>
        </div>
      ))}
    </>
  );
}

export default Checkboxes;
