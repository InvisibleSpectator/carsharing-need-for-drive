import React from "react";
import { MainPage } from "./pages/MainPage";
import { OrderPage } from "./pages/OrderPage";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/carsharing-need-for-drive" component={MainPage} />
        <Route path="/order" component={OrderPage} />
      </Switch>
    </div>
  );
}

export default App;
