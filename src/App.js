import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import PrivateRoute from "./containers/PrivateRoute";
import Header from "./components/Header/Header";
import Spinner from "./components/Spinner/Spinner";
import "./App.css";

const LazyNews = lazy(() => import("./containers/News"));
const LazyProfile = lazy(() => import("./containers/Profile"));

function App({ tryAutoSignup, userId }) {
  useEffect(() => {
    if (!userId) {
      tryAutoSignup();
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Suspense fallback={""}>
          <Switch>
            <Route path="/news">
              <LazyNews />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/profile">
              <LazyProfile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => ({ userId: state.auth.userId });

const mapDispatchToProps = dispatch => ({ tryAutoSignup: () => dispatch(actions.authCheckState()) });

export default connect(mapStateToProps, mapDispatchToProps)(App);
