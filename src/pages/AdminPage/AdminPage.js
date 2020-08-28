import React from "react";

import "./AdminPage.scss";
import { Redirect } from "react-router-dom";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.bearer = localStorage.getItem("bearer");
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.handleWindowBeforeUnload);
  }

  componentWillUnmount = () => {
    localStorage.removeItem("bearer");
  };

  handleWindowBeforeUnload = () => {
    localStorage.removeItem("bearer");
  };

  render = () => { 
    return this.bearer ? <div>Залогинено</div> : <Redirect to="/admin/login" />;
  };
}

export default AdminPage;
