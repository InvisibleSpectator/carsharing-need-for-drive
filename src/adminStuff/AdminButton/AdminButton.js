import React from "react";

import "./AdminButton.scss";

const AdminButton = ({ text, className, onClick = () => {} }) => {
  return (
    <button
      className={`AdminButton ${className}`}
      onClick={onClick}
      type="submit"
    >
      {text}
    </button>
  );
};

export default AdminButton;
