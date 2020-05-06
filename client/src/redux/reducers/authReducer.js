import {
  AUTH_LOADING,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  ALREDY_LOGGED,
  LOGOUT,
  CLEAR_ERRORS,
} from "../actions/auth";

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...statePart,
        isFetching: true,
        errors: false,
      };

    case ALREDY_LOGGED:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...statePart,
        isFetching: false,
        isAuthenticated: true,
        token: action.payload.token,
        errors: false,
      };
    case AUTH_ERROR:
      return {
        ...statePart,
        isFetching: false,
        errors: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...statePart,
        isAuthenticated: false,
        token: null,
      };
    case CLEAR_ERRORS:
      return {
        ...statePart,
        errors: false,
      };
    default:
      return statePart;
  }
}
