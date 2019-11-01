import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../store/actions";

import classes from "./Login.module.css";
const Login = ({ authorize, loggedIn, loading, error, clearPassword }) => {
  // let [fields, setFields] = useState({
  //   email: {
  //     value: "",
  //     shouldValidate: true,
  //     touched: false,
  //     config: {
  //       placeholder: "Your email",
  //       type: "email"
  //     }
  //   },
  //   password: {
  //     value: "",
  //     shouldValidate: true,
  //     touched: false,
  //     config: {
  //       type: "password"
  //     }
  //   }
  // });

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [isValid, setIsValid] = useState(false);

  // const inputChange = (e, inputName) => {
  //   let value = e.target.value;
  // };

  useEffect(() => {
    if (clearPassword) {
      setPassword("");
    }
  }, [clearPassword]);

  const onSubmit = e => {
    e.preventDefault();
    authorize(email, password);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      {loggedIn && <Redirect to="/profile" />}
      {error && error.message && (
        <div className={classes.Error}>{error.message}</div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loggedIn: state.auth.userId,
  error: state.auth.error,
  clearPassword:
    state.auth.error && state.auth.error.message === "wrong_email_or_password"
});

const mapDispatchToProps = dispatch => ({
  authorize: (email, password) => dispatch(actions.authorize(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
