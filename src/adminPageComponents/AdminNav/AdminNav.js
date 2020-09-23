import React from "react";
import "./AdminNav.scss";

import Logo from "../../assets/icons/Logo.svg";

const AdminNav = ({children}) => {
  return (
    <aside className="AdminNav">
      <div className="AdminNav-Logo">
        <img src={Logo} alt="Logo" />
        <h1>Need for car</h1>
      </div>
      <nav className="AdminNav-Nav">{children.map((e) => e)}</nav>
    </aside>
  );
};

export default AdminNav;
