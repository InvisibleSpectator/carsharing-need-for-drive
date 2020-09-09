import React from "react";
import "./AdminLogin.scss";
import Logo from "../../assets/icons/Logo.svg";
import { AdminButton } from "../AdminButton";
import { AdminInput } from "../AdminInput";
import { logIn, register } from "../../utils";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.login = React.createRef();
    this.password = React.createRef();
  }

  getBearerKey = async () => {
    try {
      const data = await logIn(
        this.login.current.getValue(),
        this.password.current.getValue()
      );
      localStorage.setItem("bearer", data.access_token);
      this.props.history.push("/admin");
    } catch {
      alert("Неверные данные");
    }
  };

  register = async () => {
    try {
      await register(
        this.login.current.getValue(),
        this.password.current.getValue()
      );
      alert("Регистрация успешно зевершена");
    } catch {
      alert("Неверные данные");
    }
  };

  render = () => (
    <div className="LoginBackground">
      <div className="LoginContaner">
        <div className="Logo">
          <img src={Logo} alt="Logo" />
          <h1>Need for car</h1>
        </div>
        <div className="LoginForm">
          <span className="LoginForm-Title">Вход</span>
          <AdminInput
            ref={this.login}
            trim
            text="Логин"
            type="text"
            className="LoginForm-AdminInput"
          />
          <AdminInput
            ref={this.password}
            trim
            text="Пароль"
            type="password"
            className="LoginForm-AdminInput"
          />
          <button onClick={this.register} type="submit" className="AdminLink">
            Запросить доступ
          </button>
          <AdminButton
            text="Войти"
            className="LoginForm-AdminButton"
            onClick={this.getBearerKey}
          />
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;
