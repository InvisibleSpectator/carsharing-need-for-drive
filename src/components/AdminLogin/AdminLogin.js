import React from "react";
import "./AdminLogin.scss";
import Logo from "../../assets/icons/Logo.svg";
import { AdminButton } from "../../adminStuff/AdminButton";
import { AdminInput } from "../../adminStuff/AdminInput";

const AdminLogin = () => (
  <div className="LoginBackground">
    <div className="LoginContaner">
      <div className="Logo">
        <img src={Logo} alt="Logo" />

        <span>Need for car</span>
      </div>
      <div className="LoginForm">
        <span className="LoginForm-Title">Вход</span>
        <AdminInput text="Логин" type="text" className="LoginForm-AdminInput" />
        <AdminInput
          text="Пароль"
          type="password"
          className="LoginForm-AdminInput"
        />
        <a className="AdminLink" href="#">
          Запросить доступ
        </a>
        <AdminButton text="Войти" className="LoginForm-AdminButton" />
      </div>
    </div>
  </div>
);

export default AdminLogin;
