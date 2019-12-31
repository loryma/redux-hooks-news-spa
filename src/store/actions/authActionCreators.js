import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => ({ type: actionTypes.AUTHORIZATION_START });

export const authSuccess = ({ idToken, localId }) => ({
  type: actionTypes.AUTHORIZATION_SUCCESS,
  idToken,
  localId
});
export const authFail = error => ({
  type: actionTypes.AUTHORIZATION_FAIL,
  error
});

export const logout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("localId");
  return { type: actionTypes.LOGOUT };
};

export const checkAuthTimout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const serializeState = ({ idToken, expiresIn, localId }) => {
  const expirationdDate = Date.now() + expiresIn * 1000;
  localStorage.setItem("idToken", idToken);
  localStorage.setItem("expirationDate", +expirationdDate);
  localStorage.setItem("localId", localId);
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
        serializeState(res.data);
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
        serializeState(res.data);
        dispatch(authSuccess(res.data));

        dispatch(checkAuthTimout(res.data.expiresIn * 1000));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    try {
      const idToken = localStorage.getItem("idToken");
      if (idToken) {
        const expirationDate = +localStorage.getItem("expirationDate");
        const localId = localStorage.getItem("localId");

        if (expirationDate > Date.now()) {
          dispatch(authSuccess({ idToken, localId }));

          const expiresIn = expirationDate - Date.now();

          dispatch(checkAuthTimout(expiresIn));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
