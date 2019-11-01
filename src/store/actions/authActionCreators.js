import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => ({ type: actionTypes.AUTHORIZATION_START });

export const authSuccess = userId => ({
  type: actionTypes.AUTHORIZATION_SUCCESS,
  userId
});
export const authFail = error => ({
  type: actionTypes.AUTHORIZATION_FAIL,
  error
});

export const authorize = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("https://mysterious-reef-29460.herokuapp.com/api/v1/validate", {
        email,
        password
      })
      .then(res => {
        if (res.data.status === "ok") {
          dispatch(authSuccess(res.data.data.id));
        } else if (res.data.status === "err") {
          dispatch(authFail(res.data));
        }
      })
      .catch(error => dispatch(authFail(error)));
  };
};
