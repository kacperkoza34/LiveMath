import {
  LOADING_USER,
  USER_SUCCESS,
  USER_ERROR,
  CLEAR_USER
} from '../actions/user';

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...statePart,
        isFetching: true
      }
    case USER_SUCCESS:
      return {
        ...statePart,
        isFetching: false,
        data: {...action.payload.user, accountType: action.payload.accountType}
      }
    case USER_ERROR:
      return {
        ...statePart,
        isFetching: false,
        errors: action.payload
      }
    case CLEAR_USER:
      return {
        ...statePart,
        isFetching: true,
        data: {}
      }
    default:
      return statePart;
  }
}
