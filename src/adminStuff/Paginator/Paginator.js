import React, { useCallback } from "react";

import "./Paginator.scss";

const PageButton = ({ newPage, clickHandler, page }) => {
  const setPage = useCallback(() => {
    clickHandler(newPage);
  }, [newPage, clickHandler]);

  return (
    <div
      onClick={setPage}
      className={`Paginator-Pages-Page ${
        page === newPage ? "Paginator-Pages-Page_active" : ""
      }`}
    >
      {newPage}
    </div>
  );
};

class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, last: props.last || 1 };
  }

  moveLeft = () => {
    this.setPage(this.state.page - 1);
  };

  moveRight = () => {
    this.setPage(this.state.page + 1);
  };

  setPage = (page) => {
    this.setState({ page });
  };

  render = () => {
    return (
      <div className="AdminStyledBlock-Content Paginator">
        <div className="Paginator-Pages">
          {this.state.page > 1 ? (
            <div className="Paginator-Pages-Page" onClick={this.moveLeft}>
              &laquo;
            </div>
          ) : (
            ""
          )}
          {this.state.page !== 1 ? (
            <PageButton
              newPage={1}
              page={this.state.page}
              clickHandler={this.setPage}
            />
          ) : (
            ""
          )}
          {this.state.last > 3 && this.state.page > 3 ? "..." : ""}

          {this.state.page - 1 > 1 ? (
            <PageButton
              newPage={this.state.page - 1}
              page={this.state.page}
              clickHandler={this.setPage}
            />
          ) : (
            ""
          )}
          {this.state.last > 1 ? (
            <PageButton
              newPage={this.state.page}
              page={this.state.page}
              clickHandler={this.setPage}
            />
          ) : (
            ""
          )}
          {this.state.page + 1 < this.state.last ? (
            <PageButton
              newPage={this.state.page + 1}
              page={this.state.page}
              clickHandler={this.setPage}
            />
          ) : (
            ""
          )}

          {this.state.last - this.state.page > 2 ? "..." : ""}
          {this.state.page !== this.state.last ? (
            <PageButton
              newPage={this.state.last}
              page={this.state.page}
              clickHandler={this.setPage}
            />
          ) : (
            ""
          )}
          {this.state.page < this.state.last ? (
            <div className="Paginator-Pages-Page" onClick={this.moveRight}>
              &raquo;
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };
}

export default Paginator;
