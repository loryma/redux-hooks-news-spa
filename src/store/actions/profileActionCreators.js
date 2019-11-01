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

export const fetchProfile = id => {
  return dispatch => {
    dispatch(fetchProfileStart());
    axios
      .get("https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/" + id)
      .then(res => {
        if (res.data.status === "ok") {
          dispatch(fetchProfileSuccess(res.data.data));
        } else if (res.data.status === "err") {
          dispatch(fetchProfileFail(res.data));
        }
      })
      .catch(error => {
        dispatch(fetchProfileFail(error => dispatch(fetchProfileFail(error))));
      });
  };
};
