import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { OrderPage } from "./pages/OrderPage";
import { OrderIDPage } from "./pages/OrderIDPage";
import { OrderIDPage as MyOrders } from "./pages/MyOrders";
import { AdminLogin } from "./adminPageComponents/AdminLogin";
import { AdminPage } from "./pages/AdminPage";

function App() {
  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");
    if (isAuth) {
    } else {
      console.log("сброс сесион стораге");
      sessionStorage.setItem("isAuth", false);
    }
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/lk/login" component={AdminLogin} />
        <Route path="/admin" component={AdminPage} />
        <Route exact path="/" component={MainPage} />
        <Route path="/order/:id?" component={OrderPage} />
        <Route path="/order_id" component={OrderIDPage} />
        <Route path="/my_orders" component={MyOrders} />
      </Switch>
    </div>
  );
}

export default App;
