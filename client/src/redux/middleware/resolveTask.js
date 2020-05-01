import { apiRequest } from "../actions/apiRequest";
import {
  USE_PROMPT,
  UPDATE_PROMPT,
  SEND_OPEN_TASK_RESOLUTION,
  TASKS_RESOLVED,
  updatePrompt,
  taskResolved,
} from "../actions/resolveTask";
import { taskError, TASKS_ERROR } from "../actions/tasks";

import { smallLoadingStart, smallLoadingStop } from "../actions/smallLoading";

const resolveTask = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type === USE_PROMPT) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "PUT",
        `/api/tasks/${action.payload}`,
        updatePrompt,
        taskError,
        null,
        null
      )
    );
  }

  if (action.type === SEND_OPEN_TASK_RESOLUTION) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "PUT",
        `/api/student/profile/resolve/open`,
        taskResolved,
        taskError,
        action.payload,
        null
      )
    );
  }

  if (
    action.type === UPDATE_PROMPT ||
    action.type === TASKS_ERROR ||
    action.type === TASKS_RESOLVED
  ) {
    dispatch(smallLoadingStop());
  }
};

export default resolveTask;
