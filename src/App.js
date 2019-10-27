import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import News from "./containers/News";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import PrivateRoute from "./containers/PrivateRoute";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
