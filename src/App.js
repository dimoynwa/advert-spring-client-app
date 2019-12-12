import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import PrivateRoute from './PrivateRoute';
import AuthState from './context/AuthState';
import ErrorBoundary from './ErrorBoundary';

export default () => (
    <ErrorBoundary>
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <AuthState>
      <div>
        {routes.map((route, index) => {
          if(route.private) {
            return (
              <PrivateRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          }
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        })}
      </div>
      </AuthState>
    </Router>
    </ErrorBoundary>
);
