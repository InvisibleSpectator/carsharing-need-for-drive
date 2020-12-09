import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { BurgerMenu } from "../../core/BurgerMenu";
import "./MainPage.scss";
import { Slider } from "../../components/Slider";
import { Button } from "../../core/Button";
import { Link } from "../../core/Link";
import { Header } from "../../core/Header";
import { postToLocal2 as postToLocal } from "../../utils";

import "../../adminPageComponents/AdminLogin/AdminLogin.scss";
import Logo from "../../assets/icons/Logo.svg";
import { AdminButton } from "../../adminPageComponents/AdminButton";
import { AdminInput } from "../../adminPageComponents/AdminInput";

const MainPage = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isValid, setValid] = useState(false);
  const [isValidRegistration, setValidRegistration] = useState(false);
  const [isAuthPage, setAuthPage] = useState(true);
  const refLogin = useRef();
  const refPassword = useRef();

  const refRLogin = useRef();
  const refRPassword = useRef();
  const refREmail = useRef();

  const isAuth = sessionStorage.getItem("isAuth");

  const validate1 = useCallback(() => {
    setValid(refLogin.current.validate() && refPassword.current.validate());
  }, [refLogin, refPassword, setValid]);

  const validateReg = useCallback(() => {
    setValidRegistration(
      refRLogin.current.validate() &&
        refRPassword.current.validate() &&
        refREmail.current.validate()
    );
  }, [refRLogin, refRPassword, refREmail, setValidRegistration]);

  const sendAuth = useCallback(async () => {
    // САША ТУТ
    const json = {};
    json.login = refLogin.current.getValue();
    json.password = refPassword.current.getValue();
    console.log(json);

    if (json.login.length > 0 && json.password.length > 0) {
      const res = await postToLocal("auth", json);
      console.log("auth", res);
      if (res.ok) {
        sessionStorage.setItem('isAuth',true);
        props.history.push("/order");
      } else alert("Авторизоваться не удалось");
    } else alert("Заполните все поля");
  }, [refLogin, refPassword]);

  const sendRegistration = useCallback(async () => {
    const json = {};
    json.email = refREmail.current.getValue();
    json.login = refRLogin.current.getValue();
    json.password = refRPassword.current.getValue();
    console.log(json);

    if (
      json.email.length > 0 &&
      json.login.length > 0 &&
      json.password.length > 0
    ) {
      const res = await postToLocal("signup", json);
      console.log("signup", res);
      if (res.ok) {
        setAuthPage(true);
      } else alert("Зарегистрироваться не удалось");
    } else alert("Заполните все поля");
  }, [refRLogin, refRPassword, refREmail]);

  return (
    <div className="MainPage">
      <BurgerMenu />
      <div className="MainPage-MainContent">
        <Header />
        <main className="MainPage-MainContent-Main">
          <p>Велошеринг</p>
          <p>Pedali V Dali</p>
          <p>Возьми в прокат, и крути верти</p>
          {isAuth === "true" && (
            <RouterLink to="/order">
              <Button text="Забронировать" className="Button_main" />
            </RouterLink>
          )}
          {isAuth === "false" && (
            <Button
              text="Войти"
              className="Button_main"
              onClick={() => {
                setModalOpen(true);
              }}
            />
          )}
        </main>
        <footer className="MainPage-MainContent-Footer">
          <span className="MainPage-MainContent-Footer-Copyright">
            © 2020 «Pedali V Dali»
          </span>
          <Link
            className="MainPage-MainContent-Footer-Tel Link_footer"
            href="tel:81234567890"
            text="8 (123) 456-78-90"
          />
        </footer>
      </div>
      <div className="MainPage-SliderContaner">
        <Slider />
      </div>
      {modalOpen && (
        <div className="MainPage-Modal">
          <div
            className="MainPage-Modal-close"
            onClick={() => {
              setModalOpen(false);
            }}
          />

          <div className="LoginContaner">
            <div className="Logo">
              <img src={Logo} alt="Logo" />
              <h1>Pedali v Dali</h1>
            </div>
            <div className="LoginForm">
              <span className="LoginForm-Title">
                {isAuthPage ? "Вход" : "Регистрация"}
              </span>
              {isAuthPage ? (
                <>
                  <AdminInput
                    ref={refLogin}
                    key="authlogin"
                    trim
                    text="Логин"
                    type="text"
                    className="LoginForm-AdminInput"
                    onChange={validate1}
                    validationExp={""}
                    validationError="Введите логин"
                  />
                  <AdminInput
                    ref={refPassword}
                    key="authpass"
                    trim
                    text="Пароль"
                    type="password"
                    className="LoginForm-AdminInput"
                    onChange={validate1}
                    validationExp={""}
                    validationError="Введите пароль"
                  />
                </>
              ) : (
                <>
                  <AdminInput
                    ref={refREmail}
                    key="regemial"
                    trim
                    text="E-mail"
                    type="text"
                    className="LoginForm-AdminInput"
                    onChange={validateReg}
                    validationExp={""}
                    validationError="Введите e-mail"
                  />
                  <AdminInput
                    ref={refRLogin}
                    key="reglogin"
                    trim
                    text="Логин"
                    type="text"
                    className="LoginForm-AdminInput"
                    onChange={validateReg}
                    validationExp={""}
                    validationError="Введите логин"
                  />
                  <AdminInput
                    ref={refRPassword}
                    key="regpass"
                    trim
                    text="Пароль"
                    type="password"
                    className="LoginForm-AdminInput"
                    onChange={validateReg}
                    validationExp={""}
                    validationError="Введите пароль"
                  />
                </>
              )}

              <button
                onClick={() => setAuthPage(!isAuthPage)}
                className="AdminLink"
              >
                {isAuthPage ? "Зарегистрироваться" : "Авторизоваться"}
              </button>
              {isAuthPage ? (
                <AdminButton
                  key="authbtn"
                  text="Войти"
                  className={`LoginForm-AdminButton ${
                    isValid ? "" : "AdminButton_disabled"
                  }`}
                  onClick={sendAuth}
                />
              ) : (
                <AdminButton
                  key="regbtn"
                  text="Зарегистрироваться"
                  className={`LoginForm-AdminButton ${
                    isValidRegistration ? "" : "AdminButton_disabled"
                  }`}
                  onClick={sendRegistration}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
