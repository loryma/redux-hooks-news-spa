import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ children, authorized, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        authorized ? children : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
}

const mapStateToProps = state => ({ authorized: !!state.auth.userId });

export default connect(mapStateToProps)(PrivateRoute);
