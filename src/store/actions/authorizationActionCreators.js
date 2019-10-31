import * as actionTypes from "./actionTypes";

export const authStart = () => ({ type: actionTypes.AUTHORIZATION_START });

export const authFail = () => ({ type: actionTypes.AUTHORIZATION_FAIL });

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
  };
};
