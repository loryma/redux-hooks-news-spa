import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchNewsStart = () => ({
  type: actionTypes.FETCH_NEWS_START
});

export const fetchNewsSuccess = data => ({
  type: actionTypes.FETCH_NEWS_SUCCESS,
  data
});

export const fetchNewsFail = error => ({
  type: actionTypes.FETCH_NEWS_FAIL,
  error
});

export const fetchNews = id => {
  return dispatch => {
    dispatch(fetchNewsStart());
    axios
      .get("https://mysterious-reef-29460.herokuapp.com/api/v1/news")
      .then(res => {
        if (res.data.status === "ok") {
          dispatch(fetchNewsSuccess(res.data.data));
        } else if (res.data.status === "err") {
          dispatch(fetchNewsFail(res.data));
        }
      })
      .catch(error => {
        dispatch(fetchNewsFail(error => dispatch(fetchNewsFail(error))));
      });
  };
};
