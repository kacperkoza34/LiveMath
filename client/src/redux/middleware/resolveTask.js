import { apiRequest } from "../actions/apiRequest";
import {
  USE_PROMPT,
  UPDATE_PROMPT,
  SEND_OPEN_TASK_RESOLUTION,
  SEND_CLOSE_TASK_RESOLUTION,
  TASKS_RESOLVED,
  REVIEW_OPEN_TASK,
  REVIEW_OPEN_TASK_SUCCESS,
  REVIEW_CLOSE_TASK,
  REVIEW_CLOSE_TASK_SUCCESS,
  updatePrompt,
  taskResolved,
  reviewOpenTaskSuccess,
  reviewCloseTaskSuccess,
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

  if (action.type === SEND_CLOSE_TASK_RESOLUTION) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "PUT",
        `/api/student/profile/resolve/close`,
        taskResolved,
        taskError,
        action.payload,
        null
      )
    );
  }

  if (action.type === REVIEW_OPEN_TASK) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "PUT",
        `/api/student/profile/resolve/open/update`,
        reviewOpenTaskSuccess,
        taskError,
        action.payload,
        null
      )
    );
  }

  if (action.type === REVIEW_CLOSE_TASK) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "PUT",
        `/api/student/profile/resolve/close/update`,
        reviewCloseTaskSuccess,
        taskError,
        action.payload,
        null
      )
    );
  }

  if (
    action.type === UPDATE_PROMPT ||
    action.type === TASKS_ERROR ||
    action.type === TASKS_RESOLVED ||
    action.type === REVIEW_OPEN_TASK_SUCCESS ||
    action.type === REVIEW_CLOSE_TASK_SUCCESS
  ) {
    dispatch(smallLoadingStop());
  }
};

export default resolveTask;
