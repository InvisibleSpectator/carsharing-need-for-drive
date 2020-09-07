import React from "react";

import "./AdminPage.scss";
import { Redirect, NavLink, Switch, Route } from "react-router-dom";
import { AdminHeader } from "../../adminStuff/AdminHeader";
import { AdminNav } from "../../adminStuff/AdminNav";
import { AdminFooter } from "../../adminStuff/AdminFooter";
import { CarCard } from "../../adminStuff/CarCard";
import { ClaimPoint } from "../../adminStuff/ClaimPoint";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    // this.bearer = localStorage.getItem("bearer");
    this.bearer = true;
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.handleWindowBeforeUnload);
  }

  componentWillUnmount = () => {
    localStorage.removeItem("bearer");
  };

  handleWindowBeforeUnload = () => {
    localStorage.removeItem("bearer");
  };

  render = () => {
    return this.bearer ? (
      <div className="AdminPage">
        <AdminNav>
          {[
            {
              link: "/admin/orderlist",
              text: "Список заказов",
              icon_type: "list",
            },
            {
              link: "/admin/carlist",
              text: "Список авто",
              icon_type: "list",
            },
            {
              link: "/admin/car",
              text: "Карточка автомобиля",
              icon_type: "edit",
            },
            {
              link: "/admin/point",
              text: "Точка выдачи",
              icon_type: "edit",
            },
          ].map((e, i) => (
            <NavLink
              to={e.link}
              className="AdminPage-NavLink"
              activeClassName="AdminPage-NavLink_active"
              key={i}
            >
              <div
                className={`AdminPage-NavLink-Icon AdminPage-NavLink-Icon_${e.icon_type}`}
              />
              {e.text}
            </NavLink>
          ))}
        </AdminNav>
        <div className="AdminPage-Content">
          <AdminHeader />
          <main>
            <Switch>
              <Route exact path="/admin/">
                <Redirect to="/admin/orderlist" />
              </Route>
              <Route path="/admin/carlist"></Route>
              <Route path="/admin/car">
                <CarCard />
              </Route>
              <Route path="/admin/point">
                <ClaimPoint />
              </Route>
            </Switch>
          </main>
          <AdminFooter />
        </div>
      </div>
    ) : (
      <Redirect to="/admin/login" />
    );
  };
}

export default AdminPage;
