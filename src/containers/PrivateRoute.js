import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as actions from "../store/actions";
import { connect } from "react-redux";

function PrivateRoute({ children, authorized, tryAutoSignup, ...rest }) {
  return <Route {...rest} render={() => (authorized ? children : <Redirect to={{ pathname: "/login" }} />)} />;
}

const mapStateToProps = state => ({ authorized: !!state.auth.userId });
const mapDispatchToProps = dispatch => ({ tryAutoSignup: () => dispatch(actions.authCheckState()) });

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
