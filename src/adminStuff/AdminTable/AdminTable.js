import React from "react";
import { Filters } from "../Filters";
import { Paginator } from "../Paginator";
import { Spinner } from "../../core/Spinner";
import { SEARCH_LIMIT } from "../../utils";
import { getAllFromTableAdmin, getAllFromTableClient } from "../../utils";

import "./AdminTable.scss";

class AdminTable extends React.Component {
  constructor(props) {
    super(props);
    this.paginator = React.createRef();
    this.state = {
      response: [],
      filters: "",
      filtersTemplate: props.filters,
      isDataLoaded: false,
    };
  }

  componentDidMount = async () => {
    await this.initTable();
    let tmpFilters = this.state.filtersTemplate;
    for (const filter of this.props.filterTemplate) {
      const rawFilter = await getAllFromTableClient(filter.table);
      let filterData = rawFilter.data.map((e) => ({
        value: `${filter.sign}${e.id}`,
        text: e.name,
      }));

      filterData.unshift({ value: "", text: filter.name });
      tmpFilters.push({ name: filter.keyField, options: filterData });
    }
    this.setState({
      filtersTemplate: tmpFilters,
    });
  };

  initTable = async () => {
    const response = await getAllFromTableAdmin(
      this.props.table,
      0,
      this.state.filters,
      this.props.bearer
    );
    this.setState({
      response: response.data,
      isDataLoaded: true,
      lastPage: Math.max(1, Math.ceil(response.count / SEARCH_LIMIT)),
    });
  };

  getFromPage = (page) => {
    this.setState({ isDataLoaded: false }, async () => {
      const response = await getAllFromTableAdmin(
        this.props.table,
        page,
        this.state.filters,
        this.props.bearer
      );
      this.setState({ response: response.data, isDataLoaded: true });
    });
  };

  changePage = (newPage) => {
    this.getFromPage(newPage - 1);
  };

  updateFilters = (filters) => {
    this.setState({ filters }, async () => {
      await this.initTable();
      this.paginator.current.restorePage();
    });
  };

  fillTableHeader = () => {
    const head = [];
    this.props.dataTemplate.forEach((e, i) => head.push(<th key={i}>{e}</th>));
    return head;
  };

  editRow = (id) => {
    this.props.history.push(`/admin/${this.props.table}/${id}`);
  };

  fillTableBody = (rowData) => {
    const row = [];
    console.log(rowData);
    this.props.dataTemplate.forEach((e, i) => {
      const keyChain = i.split(".");
      let tmpRowData = rowData;
      keyChain.forEach((key) => (tmpRowData = tmpRowData[key]));
      row.push(
        <td title={e} key={i}>
          {tmpRowData}
        </td>
      );
    });
    row.push(
      <td key={rowData}>
        <button
          onClick={() => this.editRow(rowData.id)}
          className="AdminTable-EditButton"
        />
      </td>
    );
    return row;
  };

  render = () => {
    return (
      <div className="AdminTable" key={this.props.title}>
        <h2 className="AdminPage-Title">{this.props.title}</h2>
        <div className="AdminStyledBlock">
          <Filters
            updateFilters={this.updateFilters}
            filters={this.state.filtersTemplate}
          />
          {this.state.isDataLoaded ? (
            <div className="AdminStyledBlock-Content">
              <table className="AdminTable-Table ">
                <thead>
                  <tr>{this.fillTableHeader()}</tr>
                </thead>
                <tbody>
                  {this.state.response.map((rowData, i) => (
                    <tr key={i}>{this.fillTableBody(rowData)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Spinner />
          )}
          <Paginator
            ref={this.paginator}
            last={this.state.lastPage}
            onChangePage={this.changePage}
          />
        </div>
      </div>
    );
  };
}

export default AdminTable;
