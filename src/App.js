import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/authReducer";
import News from "./containers/News";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import PrivateRoute from "./containers/PrivateRoute";
import Header from "./components/Header";
import "./App.css";

const store = createStore(authReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
