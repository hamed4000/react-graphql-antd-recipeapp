import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoute = routes => {
  return (
    <Route
      path={routes.path}
      exact={routes.exact}
      render={props => <routes.component routes={routes.routes} {...props} />}
    />
  );
};

export default RouteWithSubRoute;
