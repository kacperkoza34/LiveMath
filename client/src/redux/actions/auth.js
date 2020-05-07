export const REGISTER_START = "[auth] REGISTER_START";
export const REGISTER_SUCCESS = "[auth] REGISTER_SUCCESS";
export const LOGIN_START = "[auth] LOGIN_START";
export const LOGIN_SUCCESS = "[auth] LOGIN_SUCCESS";
export const ALREDY_LOGGED = "[auth] ALREDY_LOGGED";
export const LOGOUT = "[auth] LOGOUT";
export const AUTH_LOADING = "[auth] AUTH_LOADING";
export const AUTH_ERROR = "[auth] AUTH_ERROR";
export const CLEAR_ERRORS = "[auth] CLEAR_ERRORS";
export const VERIFY_EMAIL = "[auth] VERIFY_EMAIL";
export const VERIFY_SUCCESS = "[auth] VERIFY_SUCCESS";

export const loading = () => ({
  type: AUTH_LOADING,
});

export const authError = (payload) => ({
  type: AUTH_ERROR,
  payload,
});

export const register = (payload) => ({
  type: REGISTER_START,
  payload,
});

export const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const login = (payload) => ({
  type: LOGIN_START,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const alreadyLogged = (payload) => ({
  type: ALREDY_LOGGED,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});

export const verifyEmail = (payload) => ({
  type: VERIFY_EMAIL,
  payload,
});

export const verifySuccess = () => ({
  type: VERIFY_SUCCESS,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
