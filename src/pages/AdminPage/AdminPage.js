import React from "react";

import "./AdminPage.scss";

import { Redirect, NavLink, Switch, Route } from "react-router-dom";
import { AdminHeader } from "../../adminPageComponents/AdminHeader";
import { AdminNav } from "../../adminPageComponents/AdminNav";
import { AdminFooter } from "../../adminPageComponents/AdminFooter";
import { CarCard } from "../../adminPageComponents/CarCard";
import { ClaimPoint } from "../../adminPageComponents/ClaimPoint";
import { AdminError } from "../../adminPageComponents/AdminError";
import OrderList from "../../adminPageComponents/OrderList/OrderList";
import { AdminTable } from "../../adminPageComponents/AdminTable";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bearer: localStorage.getItem("bearer") };
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
    return this.state.bearer ? (
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
              link: "/admin/pointlist",
              text: "Точки выдачи",
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
              <p>{e.text}</p>
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
              <Route
                path="/admin/orderlist"
                render={(routeProps) => (
                  <OrderList {...routeProps} bearer={this.state.bearer} />
                )}
              ></Route>
              <Route
                path="/admin/carlist"
                render={(routeProps) => (
                  <AdminTable
                    key={1}
                    {...routeProps}
                    bearer={this.state.bearer}
                    title="Автомобили"
                    table="car"
                    filters={[]}
                    filterTemplate={[
                      {
                        table: "category",
                        keyField: "categoryId",
                        sign: "=",
                        name: "Категория",
                      },
                    ]}
                    dataTemplate={
                      new Map([
                        ["name", "Модель"],
                        ["categoryId.name", "Категория"],
                        ["description", "Описание"],
                      ])
                    }
                  />
                )}
              />
              <Route
                path="/admin/pointlist"
                render={(routeProps) => (
                  <AdminTable
                    key={2}
                    {...routeProps}
                    bearer={this.state.bearer}
                    title="Точки выдачи"
                    table="point"
                    filters={[]}
                    filterTemplate={[
                      {
                        table: "city",
                        keyField: "cityId",
                        sign: "=",
                        name: "Город",
                      },
                    ]}
                    dataTemplate={
                      new Map([
                        ["name", "Имя"],
                        ["cityId.name", "Город"],
                        ["address", "Адрес"],
                      ])
                    }
                  />
                )}
              />

              <Route
                path="/admin/car/:id?"
                render={(routeProps) => (
                  <CarCard {...routeProps} bearer={this.state.bearer} />
                )}
              />
              <Route
                path="/admin/point/:id?"
                render={(routeProps) => (
                  <ClaimPoint {...routeProps} bearer={this.state.bearer} />
                )}
              />
              <Route path="/admin/*">
                <AdminError />
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
