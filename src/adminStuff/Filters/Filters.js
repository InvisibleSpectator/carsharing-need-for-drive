import React from "react";

import "./Filters.scss";

import { AdminButton } from "../AdminButton";

const Filter = ({ options = [{ value: "", text: "Срок" }] }) => {
  return (
    <select className="Filters-Filter">
      {options.map((e, i) => (
        <option value={e.value}>{e.text}</option>
      ))}
    </select>
  );
};

class Filters extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className="AdminStyledBlock-Content Filters">
        <div className="Filters-Container">
          <Filter />
        </div>
        <div className="Filters-Buttons">
          <AdminButton text="Сбросить" className="AdminButton_decline" />
          <AdminButton text="Применить" />
        </div>
      </div>
    );
  };
}

export default Filters;
