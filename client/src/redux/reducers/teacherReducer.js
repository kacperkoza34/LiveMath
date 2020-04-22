import {
  LOADING_TEACHER,
  TEACHER_SUCCESS,
  TEACHER_ERROR,
  CLEAR_TEACHER
} from '../actions/teacher';

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case LOADING_TEACHER:
      return {
        ...statePart,
        isFetching: true
      }
    case TEACHER_SUCCESS:
      return {
        ...statePart,
        isFetching: false,
        data: action.payload
      }
    case TEACHER_ERROR:
      return {
        ...statePart,
        isFetching: false,
        errors: action.payload
      }
    case CLEAR_TEACHER:
      return {
        ...statePart,
        data: {}
      }
    default:
      return statePart;
  }
}
