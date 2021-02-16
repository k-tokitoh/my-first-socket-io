import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "../pages";
import Rooms from "../pages/rooms";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/rooms">
          <Rooms />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
