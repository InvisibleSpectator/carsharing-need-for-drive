import React, { Component } from "react";

import "./AdminButton.scss"

const AdminButton = ({ text, className }) => {
  return (
    <button className={`AdminButton ${className}`} type="submit">
      {text}
    </button>
  );
};

export default AdminButton;
