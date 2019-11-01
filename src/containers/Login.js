import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../store/actions";

import { classes } from "./Login.module.css";
const Login = props => {
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

  const onSubmit = e => {
    e.preventDefault();
    props.authorize(email, password);
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
        <button type="submit" disabled={props.loading}>
          Login
        </button>
      </form>
      {props.loggedIn && <Redirect to="/profile" />}
      {props.error && props.error.errorMessage && (
        <div className={classes.Error}>{props.error.errorMessage}</div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loggedIn: state.auth.userId,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  authorize: (email, password) => dispatch(actions.authorize(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
