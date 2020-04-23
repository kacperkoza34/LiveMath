import { apiRequest } from '../actions/apiRequest';
import {
  SEND_OPEN_TASK,
  CLEAR_NEW_TASK,
  NEW_TASK_ERROR,
  newTaskError,
  clearTask
} from '../actions/newTask';

import {
  smallLoadingStart,
  smallLoadingStop
} from '../actions/smallLoading'


const newTask = ({dispatch}) => next => action => {
  next(action);
  if ( action.type === SEND_OPEN_TASK  ) {
    dispatch(smallLoadingStart());
    dispatch(apiRequest('POST','/api/tasks/open', clearTask, newTaskError, action.payload, null));
  }
  if ( action.type === CLEAR_NEW_TASK  ) {
    dispatch(smallLoadingStop());
  }
  if ( action.type === NEW_TASK_ERROR  ) {
    dispatch(smallLoadingStop());
  }
};

export default newTask;
