import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import withError from "../hoc/withError";
import * as actions from "../store/actions";

import classes from "./Login.module.css";
const Login = ({ authorize, loggedIn, loading, error, clearPassword }) => {
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let formFields = [];
  let form = null;

  let [fields, setFields] = useState({
    email: {
      value: "",
      config: {
        type: "email",
        placeholder: "your email"
      },
      shouldValidate: true,
      touched: false,
      validation: {
        requered: true,
        regex: re
      },
      error: false
    },
    password: {
      value: "",
      config: {
        type: "password"
      },
      shouldValidate: true,
      touched: false,
      validation: {
        requered: true,
        minWidth: 5
      },
      error: false
    }
  });

  let [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (clearPassword) {
      setFields({
        ...fields,
        password: { ...fields["password"], value: "" }
      });
    }
  }, [clearPassword]);

  useEffect(() => {
    checkFormValidity();
  }, [fields]);

  const onSubmit = e => {
    e.preventDefault();

    for (let key in fields) {
      inputChangeHandler(key, fields[key].value);
    }

    if (formValid) {
      let values = Object.values(fields).map(el => el.value);

      authorize(...values);
    }
  };

  const checkFormValidity = () => {
    let newFormValidValue = true;
    for (let key in fields) {
      console.log(fields[key].error);
      newFormValidValue = !fields[key].error && newFormValidValue;
    }
    console.log("checkVal", newFormValidValue);
    setFormValid(newFormValidValue);
  };

  const validate = (value, validationSchema) => {
    let errors = [];
    for (let key in validationSchema) {
      if (key === "requered" && !value.trim()) {
        errors.push("This field is requered");
      } else if (key === "regex" && !validationSchema[key].test(value)) {
        errors.push("Doesn't look like an email");
      } else if (key === "minWidth") {
        if (value.length < validationSchema[key]) {
          errors.push(
            `The value should be at least ${validationSchema[key]} characters long`
          );
        }
      }
    }

    if (errors.length > 0) {
      return errors;
    }
    return false;
  };

  const inputChangeHandler = (name, value) => {
    const error = fields[name].shouldValidate
      ? validate(value, fields[name].validation)
      : false;
    const newFields = {
      ...fields,
      [name]: { ...fields[name], value, error, touched: true }
    };
    setFields(newFields);
  };

  for (let key in fields) {
    formFields.push({
      key,
      value: fields[key].value,
      error: fields[key].error,
      ...fields[key].config
    });
  }

  form = formFields.map(({ key, error, ...rest }) => (
    <div className={classes.InputField}>
      <input
        className={classes.Input}
        key={key}
        {...rest}
        onChange={e => inputChangeHandler(key, e.target.value)}
      />
      {error ? <p className={classes.Error}>{error[0]}</p> : null}
    </div>
  ));

  return (
    <div>
      <form onSubmit={onSubmit}>
        {form}
        <button type="submit" disabled={loading || !formValid}>
          {loading ? "Fetching..." : "Login"}
        </button>
      </form>
      {loggedIn && <Redirect to="/profile" />}
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
)(withError(Login));
