import React, { Component } from "react";

import "./Checkbox.scss";

class Checkbox extends Component {
  getValue = () => this.state.value;

  render = () => (
    <div className="Checkbox">
      <label className="Checkbox-Label">
        <input
          checked={this.props.checked}
          type="checkbox"
          className="Checkbox-Input"
          onChange={(e) => {
            this.props.onChange(e.target.checked);
          }}
        />
        <span className="Checkbox-FakePoint">{this.props.text}</span>
      </label>
    </div>
  );
}

export default Checkbox;
