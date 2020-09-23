import React from "react";
import "./AdminFooter.scss";
import { Link } from "react-router-dom";

const AdminFooter = () => {
  return (
    <footer className="AdminFooter">
      <span className="AdminFooter-Links">
        <Link to="/" className="AdminLink">Главная страница</Link>
      </span>
      <span className="AdminFooter-Copyright">Copyright © 2020 Simbirsoft</span>
    </footer>
  );
};

export default AdminFooter;
