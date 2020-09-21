import React, { useCallback } from "react";

import "./Filters.scss";

import { AdminButton } from "../AdminButton";

const Filter = ({ options = [], name = "", onChange, isDefault }) => {
  const onChangeHandler = useCallback(
    (e) => {
      onChange(name, e.target.value);
    },
    [name, onChange]
  );

  return (
    <select
      className="Filters-Filter"
      onChange={onChangeHandler}
      {...(isDefault ? { value: "" } : {})}
    >
      {options.map((e, i) => (
        <option key={i} value={e.value}>
          {e.text}
        </option>
      ))}
    </select>
  );
};

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filters: new Map() };
  }

  onChange = (key, value) => {
    this.setState((state) => ({ filters: state.filters.set(key, value) }));
  };

  getFilters = () => {
    const filtersArray = Array.from(this.state.filters);
    return filtersArray
      .filter((e) => e[1])
      .map((e) => e.join(""))
      .join("&");
  };

  sendFilters = () => {
    const filters = this.getFilters();
    this.props.updateFilters(filters ? "&" + filters : "");
  };

  dropFilters = () => {
    this.setState(
      {
        filters: new Map(),
      },
      this.sendFilters
    );
  };

  render = () => {
    return (
      <div className="AdminStyledBlock-Content Filters">
        <div className="Filters-Container">
          {this.props.filters.map((filter, i) => (
            <Filter
              isDefault={this.state.filters.size === 0}
              key={i}
              name={filter.name}
              options={filter.options}
              onChange={this.onChange}
            />
          ))}
        </div>
        <div className="Filters-Buttons">
          <AdminButton
            text="Сбросить"
            className="AdminButton_decline"
            onClick={this.dropFilters}
          />
          <AdminButton text="Применить" onClick={this.sendFilters} />
        </div>
      </div>
    );
  };
}

export default Filters;
