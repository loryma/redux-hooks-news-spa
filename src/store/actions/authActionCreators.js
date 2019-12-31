import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => ({ type: actionTypes.AUTHORIZATION_START });

export const authSuccess = ({ idToken, localId, email, expiresIn }) => ({
  type: actionTypes.AUTHORIZATION_SUCCESS,
  idToken,
  email,
  localId
});
export const authFail = error => ({
  type: actionTypes.AUTHORIZATION_FAIL,
  error
});

export const logout = () => ({ type: actionTypes.LOGOUT });

export const checkAuthTimout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authorize = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const formData = { email, password, returnSecureToken: true };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCN9xjxG_Rqwwg9nN97i38XSW9CAImL-tg",
        formData
      )
      .then(res => {
        dispatch(authSuccess(res.data));

        dispatch(checkAuthTimout(res.data.expiresIn));
      })
      .catch(error => dispatch(authFail(error)));
  };
};

export const signup = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const formData = { email, password, returnSecureToken: true };
    return axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCN9xjxG_Rqwwg9nN97i38XSW9CAImL-tg",
        formData
      )
      .then(res => {
        dispatch(authSuccess(res.data));

        dispatch(checkAuthTimout(res.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
