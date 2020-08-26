import React, { Component } from "react";

import "./AdminPage.scss";
import { Redirect } from "react-router-dom";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return <Redirect to="/admin/login"/>;
  };
}

export default AdminPage;
