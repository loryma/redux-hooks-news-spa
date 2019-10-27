import React from "react";
import { Route, Redirect } from "react-router-dom";
const authorized = true;

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        authorized ? children : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
}
