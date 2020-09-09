import React from "react";
import { useHistory } from "react-router-dom";
import { AdminButton } from "../AdminButton";

import "./AdminError.scss";

const AdminError = () => {
  const history = useHistory();
  return (
    <div className="AdminError">
      <p className="AdminError-Code">500</p>
      <p className="AdminError-Text">Что-то пошло не так</p>
      <p className="AdminError-Solution">Попробуйте перезагрузить страницу</p>
      <AdminButton text="Назад" onClick={() => history.goBack()} />
    </div>
  );
};

export default AdminError;
