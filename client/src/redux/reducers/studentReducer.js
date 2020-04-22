import {
  STUDENT_SUCCESS,
  STUDENT_ERROR,
  STUDENT_LOADING
} from '../actions/student';

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case STUDENT_SUCCESS:
      return {
        ...statePart,
        data: action.payload,
        isFetching: false
      }
    case STUDENT_ERROR:
      return {
        ...statePart,
        isFetching: false,
        errors: action.payload
      }
    case STUDENT_LOADING:
      return {
        ...statePart,
        isFetching: true,
        errors: action.payload
      }
    default:
      return statePart;
  }
}
