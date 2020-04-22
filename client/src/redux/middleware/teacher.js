import { apiRequest } from '../actions/apiRequest';
import {
  GET_TEACHER,
  TEACHER_ERROR,
  TEACHER_SUCCESS,
  loadingTeacher,
  teacherSuccess,
  teacherError
} from '../actions/teacher';


import {
  smallLoadingStart,
  smallLoadingStop
} from '../actions/smallLoading';

const teacher = ({dispatch}) => next => action => {
  next(action);
  if ( action.type === GET_TEACHER  ) {
    dispatch(smallLoadingStart());
    dispatch(loadingTeacher());
    dispatch(apiRequest('GET',`/api/teacher/profile/${action.payload}`, teacherSuccess, teacherError, null, null));
  }
  if ( action.type === TEACHER_ERROR || action.type === TEACHER_SUCCESS ) {
    dispatch(smallLoadingStop());
  }
};

export default teacher;
