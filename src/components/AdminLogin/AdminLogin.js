import React from "react";
import "./AdminLogin.scss";
import Logo from "../../assets/icons/Logo.svg";
import { AdminButton } from "../../adminStuff/AdminButton";
import { AdminInput } from "../../adminStuff/AdminInput";
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
          <span>Need for car</span>
        </div>
        <div className="LoginForm">
          <span className="LoginForm-Title">Вход</span>
          <AdminInput
            ref={this.login}
            text="Логин"
            type="text"
            className="LoginForm-AdminInput"
          />
          <AdminInput
            ref={this.password}
            text="Пароль"
            type="password"
            className="LoginForm-AdminInput"
          />
          <button onClick={this.register} type="submit" className="AdminLink">Запросить доступ</button>
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
