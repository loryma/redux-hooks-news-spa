import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/authReducer";
import profileReducer from "./store/reducers/profileReducer";
import newsReducer from "./store/reducers/newsReducer";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import PrivateRoute from "./containers/PrivateRoute";
import Header from "./components/Header/Header";
import Spinner from "./components/Spinner/Spinner";
import "./App.css";

const LazyNews = lazy(() => import("./containers/News"));
const LazyProfile = lazy(() => import("./containers/Profile"));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  news: newsReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
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
              <PrivateRoute path="/profile">
                <LazyProfile />
              </PrivateRoute>
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
    </Provider>
  );
}

export default App;
