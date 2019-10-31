import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  userId: null,
  error: null
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTHORIZATION_START:
      return { ...state, loading: true };
    case actionTypes.AUTHORIZE:
      return { userId: payload.userId, loading: false, error: null };
    case actionTypes.AUTHORIZATION_FAIL:
      return { ...state, error: payload.error };
    default:
      return state;
  }
};

export default authReducer;
