import {
  TASKS_LOADING,
  TASKS_SUCCESS,
  TASKS_ERROR,
  CLEAR_TASKS
} from '../actions/tasks';

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case TASKS_LOADING:
      return {
        ...statePart,
        isFetching: true
      }
    case TASKS_SUCCESS:
      return {
        ...statePart,
        isFetching: false,
        data: action.payload
      }
    case TASKS_ERROR:
      return {
        ...statePart,
        isFetching: false,
        errors: action.payload
      }
    case CLEAR_TASKS:
      return {
        ...statePart,
        data: {},
        isFetching: true
      }
    default:
      return statePart;
  }
}
