export const GET_PROFILE = '[profile] GET_PROFILE';
export const LOADING_PROFILE = '[profile] LOADING_PROFILE';
export const PROFILE_SUCCESS = '[profile] PROFILE_SUCCESS';
export const PROFILE_ERROR = '[profile] PROFILE_ERROR';
export const CLEAR_PROFILE = '[profile] CLEAR_PROFILE';

export const getProfile = () =>({
  type: GET_PROFILE
});

export const loadingProfile = () =>({
  type: LOADING_PROFILE
});

export const profileSuccess = (payload) =>({
  type: PROFILE_SUCCESS,
  payload
});

export const profileError = (payload) =>({
  type: PROFILE_ERROR,
  payload
});

export const clearProfile = () =>({
  type: CLEAR_PROFILE
});
