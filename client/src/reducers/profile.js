import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS,
  GET_TEACHER_PROFILE
} from '../actions/types';

const initialState = {
  myProfile: null,
  otherProfile: null,
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        myProfile: payload,
        otherProfile: null,
        loading: false,
        error: {}
      };
    case GET_TEACHER_PROFILE:
      return {
        ...state,
        otherProfile: payload
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        myProfile: null,
        otherProfile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        myProfile: null,
        loading: false,
        otherProfile: null
      }
    default:
      return state;
  }
}
