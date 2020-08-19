import React from "react";
import "./AdminLogin.scss";
import Logo from "../../assets/icons/Logo.svg";

const AdminLogin = () => (
  <div className="LoginBackground">
    <div className="LoginContaner">
      <div className="Logo">
        <img src={Logo} alt="Logo" />

        <span>Need for car</span>
      </div>
      <div className="LoginForm">
        <span className="LoginForm-Title">Вход</span>
        <label className="AdminInput">
          <span>Логин</span>
          <input type="text" />
        </label>
        <label className="AdminInput">
          <span>Пароль</span>
          <input type="password" />
        </label>
        <a className="AdminLink" href="#">
          Запросить доступ
        </a>
        <button className="AdminButton" type="submit">
          Войти
        </button>
      </div>
    </div>
  </div>
);

export default AdminLogin;
