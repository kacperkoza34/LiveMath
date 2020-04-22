import { apiRequest } from '../actions/apiRequest';
import {
  GET_STUDENT,
  studentSuccess,
  studentError,
  studentLoading
} from '../actions/student';

const student = ({dispatch}) => next => action => {
  next(action);
  if ( action.type === GET_STUDENT ) {
    dispatch(studentLoading());
    dispatch(apiRequest('GET',`/api/student/profile/${action.payload}`, studentSuccess, studentError, null, null));
  }
};

export default student;
