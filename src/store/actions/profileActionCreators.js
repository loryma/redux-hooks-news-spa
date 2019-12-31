import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchProfileStart = () => ({
  type: actionTypes.FETCH_PROFILE_START
});

export const fetchProfileSuccess = data => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  data
});

export const fetchProfileFail = error => ({
  type: actionTypes.FETCH_PROFILE_FAIL,
  error
});

export const fetchProfile = idToken => {
  return dispatch => {
    dispatch(fetchProfileStart());
    const query = { idToken };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCN9xjxG_Rqwwg9nN97i38XSW9CAImL-tg",
        query
      )
      .then(res => {
        const userData = res.users[0];
        dispatch(fetchProfileSuccess(userData));
      })
      .catch(error => {
        dispatch(fetchProfileFail(error => dispatch(fetchProfileFail(error))));
      });
  };
};
