import { apiRequest } from '../actions/apiRequest';
import {
  GET_TASKS,
  GET_OPEN_TASK,
  GET_CLOSE_TASK,
  GET_BOOLEAN_TASK,
  taskSuccess,
  taskError,
  taskLoading
} from '../actions/tasks';


const student = ({dispatch}) => next => action => {
  next(action);
  if ( action.type === GET_TASKS ) {
    const { classId, sectionId } = action.payload;
    dispatch(taskLoading());
    dispatch(apiRequest('GET',`/api/tasks/search/${classId}/${sectionId}`, taskSuccess, taskError, null, null));
  }
  if ( action.type === GET_OPEN_TASK ) {
    dispatch(taskLoading());
    dispatch(apiRequest('GET',`/api/tasks/open/${action.payload}`, taskSuccess, taskError, null, null));
  }
  if ( action.type === GET_CLOSE_TASK ) {
    dispatch(taskLoading());
    dispatch(apiRequest('GET',`/api/tasks/close/${action.payload}`, taskSuccess, taskError, null, null));
  }
  if ( action.type === GET_BOOLEAN_TASK ) {
    dispatch(taskLoading());
    dispatch(apiRequest('GET',`/api/tasks/boolean/${action.payload}`, taskSuccess, taskError, null, null));
  }
};

export default student;
