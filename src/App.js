import React from "react";
import { MainPage } from "./components/pages/MainPage";
import { OrderPage } from "./components/pages/OrderPage";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/carsharing-need-for-drive" component={MainPage} />
        <Route path="/order" component={OrderPage}/>
      </Switch>
    </div>
  );
}

export default App;
