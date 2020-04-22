import {
  LOADING_PROFILE,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  CLEAR_PROFILE
} from '../actions/profile';

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case LOADING_PROFILE:
      return{
        ...statePart,
        isFetching: true
      }
    case PROFILE_SUCCESS:
      return{
        ...statePart,
        data: action.payload,
        isFetching: false
      }
    case PROFILE_ERROR:
      return{
        ...statePart,
        isFetching: false,
        errors: action.payload
      }
    case CLEAR_PROFILE:
      return{
        ...statePart,
        isFetching: true,
        data: {}
      }
    default:
      return statePart;
  }
}
