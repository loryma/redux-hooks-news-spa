import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  data: null,
  subreddit: "science",
  receivedAt: null
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUBREDDIT_START:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_SUBREDDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        subreddit: action.subreddit,
        receivedAt: action.receivedAt
      };
    case actionTypes.FETCH_SUBREDDIT_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default newsReducer;
