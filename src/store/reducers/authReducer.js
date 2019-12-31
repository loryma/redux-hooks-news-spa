import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  userId: null,
  idToken: null,
  email: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHORIZATION_START:
      return { ...state, loading: true };
    case actionTypes.AUTHORIZATION_SUCCESS:
      return {
        ...state,
        userId: action.localId,
        idToken: action.idToken,
        email: action.email,
        loading: false,
        error: null
      };
    case actionTypes.AUTHORIZATION_FAIL:
      return { ...state, error: action.error, loading: false };
    case actionTypes.LOGOUT:
      return { ...state, userId: null, idToken: null, email: null };
    default:
      return state;
  }
};

export default authReducer;
