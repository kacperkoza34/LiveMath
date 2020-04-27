import { apiRequest } from "../actions/apiRequest";
import {
  ADD_OPEN_TASK,
  ADD_CLOSE_TASK,
  ADD_BOOLEAN_TASK,
  ADD_TASK_SUCCESS,
  addTaskError,
  taskSuccess,
} from "../actions/taskToClass";

import { smallLoadingStart, smallLoadingStop } from "../actions/smallLoading";

const taskToClass = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === ADD_OPEN_TASK) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "POST",
        "/api/tasks/addOpenTask",
        taskSuccess,
        smallLoadingStop,
        action.payload,
        null
      )
    );
  }

  if (action.type === ADD_CLOSE_TASK) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "POST",
        "/api/tasks/addCloseTask",
        taskSuccess,
        smallLoadingStop,
        action.payload,
        null
      )
    );
  }

  if (action.type === ADD_BOOLEAN_TASK) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "POST",
        "/api/tasks/addBooleanTask",
        taskSuccess,
        smallLoadingStop,
        action.payload,
        null
      )
    );
  }

  if (action.type === ADD_TASK_SUCCESS) {
    dispatch(smallLoadingStop());
  }
};

export default taskToClass;
