import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  data: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE_START:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return { ...state, loading: false, data: action.data };
    case actionTypes.FETCH_PROFILE_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default profileReducer;
