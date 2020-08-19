import React from "react";
import { Switch, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { OrderPage } from "./pages/OrderPage";
import {AdminLogin} from "./components/AdminLogin"

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={AdminLogin} />
        {/* <Route exact path="/" component={MainPage} /> */}
        <Route path="/order/:id?" component={OrderPage} />
      </Switch>
    </div>
  );
}

export default App;
