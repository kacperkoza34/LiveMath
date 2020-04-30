import { apiRequest } from "../actions/apiRequest";
import {
  USE_PROMPT,
  UPDATE_PROMPT,
  updatePrompt,
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

  if (action.type === UPDATE_PROMPT || action.type === TASKS_ERROR) {
    dispatch(smallLoadingStop());
  }
};

export default resolveTask;
