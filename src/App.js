import React from "react";
import { Switch, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { OrderPage } from "./pages/OrderPage";
import { OrderIDPage } from "./pages/OrderIDPage";
import { AdminLogin } from "./adminPageComponents/AdminLogin";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/lk/login" component={AdminLogin} />
        <Route path="/admin" component={AdminPage} />
        <Route exact path="/" component={MainPage} />
        <Route path="/order/:id?" component={OrderPage} />
        <Route path="/order_id" component={OrderIDPage} />
      </Switch>
    </div>
  );
}

export default App;
