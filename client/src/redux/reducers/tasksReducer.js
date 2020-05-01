import {
  TASKS_LOADING,
  TASKS_SUCCESS,
  TASKS_ERROR,
  CLEAR_TASKS,
  SET_TASK_CONFIG,
} from "../actions/tasks";

import {
  UPDATE_PROMPT,
  UPDATE_DESCRIPTION,
  UPDATE_ANSWER,
  TASKS_RESOLVED,
} from "../actions/resolveTask";

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case TASKS_LOADING:
      return {
        ...statePart,
        isFetching: true,
      };
    case TASKS_SUCCESS:
      return {
        ...statePart,
        isFetching: false,
        data: action.payload,
      };
    case TASKS_ERROR:
      return {
        ...statePart,
        isFetching: false,
        errors: action.payload,
      };
    case CLEAR_TASKS:
      return {
        ...statePart,
        data: {},
        isFetching: true,
      };
    case SET_TASK_CONFIG:
      return {
        ...statePart,
        taskConfig: action.payload,
      };
    case UPDATE_PROMPT:
      return {
        ...statePart,
        taskConfig: {
          ...statePart.taskConfig,
          usedPrompts: statePart.taskConfig.usedPrompts + 1,
        },
      };
    case UPDATE_DESCRIPTION:
      return {
        ...statePart,
        taskConfig: {
          ...statePart.taskConfig,
          description: action.payload,
        },
      };
    case UPDATE_ANSWER:
      return {
        ...statePart,
        taskConfig: {
          ...statePart.taskConfig,
          answer: action.payload,
        },
      };
    case TASKS_RESOLVED:
      return {
        ...statePart,
        taskConfig: {
          ...statePart.taskConfig,
          resolved: true,
        },
      };
    default:
      return statePart;
  }
}
