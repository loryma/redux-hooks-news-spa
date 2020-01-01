import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchSubredditStart = () => ({
  type: actionTypes.FETCH_SUBREDDIT_START
});

export const fetchSubredditSuccess = (subreddit, json) => ({
  type: actionTypes.FETCH_SUBREDDIT_SUCCESS,
  subreddit,
  data: json.data.children.map(child => child.data),
  receivedAt: Date.now()
});

export const fetchSubredditFail = error => ({
  type: actionTypes.FETCH_SUBREDDIT_FAIL,
  error
});

export const fetchSubreddit = subreddit => {
  return dispatch => {
    dispatch(fetchSubredditStart());
    axios
      .get(`https://www.reddit.com/r/${subreddit}.json`)
      .then(res => {
        console.log(res.data);
        const json = res.data;
        dispatch(fetchSubredditSuccess(subreddit, json));
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchSubredditFail(error => dispatch(fetchSubredditFail(error))));
      });
  };
};
