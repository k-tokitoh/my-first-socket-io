import React, { FC } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Room from "./[id]";

const Index: FC = () => {
  const { url } = useRouteMatch();

  return (
    <>
      there are rooms.
      <Switch>
        <Route exact path={`${url}/:id`}>
          <Room />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Index;
