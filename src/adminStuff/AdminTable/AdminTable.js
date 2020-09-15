import React from "react";
import { Filters } from "../Filters";
import { Paginator } from "../Paginator";

import "./AdminTable.scss";

class AdminTable extends React.Component {
  render = () => {
    return (
      <div className="AdminTable">
        <h2 className="AdminPage-Title">{this.props.title}</h2>
        <div className="AdminStyledBlock">
          <Filters />
          <table className="AdminTable-Table">
            <thead>
              <tr>
                {this.props.tableHead.map((e, i) => (
                  <th key={i}>{e}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
              ].map((e, i) => (
                <tr key={i}>
                  {e.map((e2, k) => (
                    <td key={+i + k}>{e2}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Paginator last={8} />
        </div>
      </div>
    );
  };
}

export default AdminTable;
