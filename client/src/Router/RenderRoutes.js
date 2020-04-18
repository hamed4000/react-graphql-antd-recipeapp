import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RouteWithSubRoute from './RouteWithSubRoute';
import NotFound from "../Components/NotFound";

const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map(route => {
        return <RouteWithSubRoute key={route.key} {...route} />;
      })}
      <Route component={() => <NotFound code={404} title={`Oops!`} content={`The Page can't be found`}/>} />
    </Switch>
  );
};

export default RenderRoutes;
