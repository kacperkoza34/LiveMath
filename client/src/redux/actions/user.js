export const GET_USER = '[user] GET_USER';
export const LOADING_USER = '[user] LOADING_USER';
export const USER_SUCCESS = '[user] USER_SUCCESS';
export const USER_ERROR = '[user] USER_ERROR';
export const CLEAR_USER = '[user] CLEAR_USER';


export const getUser = () =>({
  type: GET_USER
});

export const loadingUser = () =>({
  type: LOADING_USER
});


export const userSuccess = (payload) =>({
  type: USER_SUCCESS,
  payload
});

export const userError = (payload) =>({
  type: USER_ERROR,
  payload
});

export const clearUser = () =>({
  type: CLEAR_USER
});
