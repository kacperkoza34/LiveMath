import { apiRequest } from '../actions/apiRequest';
import {
  ADD_OPEN_TASK,
  addTaskError
} from '../actions/taskToClass';

import {
  smallLoadingStart,
  smallLoadingStop
} from '../actions/smallLoading';

const taskToClass = ({dispatch}) => next => action => {
  next(action);
  if ( action.type === ADD_OPEN_TASK ) {
    dispatch(smallLoadingStart());
    dispatch(apiRequest('POST','/api/tasks/addOpenTask', smallLoadingStop, smallLoadingStop, action.payload, null));
  }
};

export default taskToClass;
