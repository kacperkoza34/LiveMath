import {
  TASKS_LOADING,
  TASKS_SUCCESS,
  TASKS_ERROR,
  CLEAR_TASKS,
  SET_TASK_CONFIG,
  SET_CURRENT_CLASS,
  SET_CURRENT_SECTION,
} from "../actions/tasks";

import {
  UPDATE_PROMPT,
  UPDATE_DESCRIPTION,
  UPDATE_ANSWER,
  TASKS_RESOLVED,
  REVIEW_OPEN_TASK_SUCCESS,
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
        errors: false,
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
          toUpdate: action.payload ? true : false,
          resolved: true,
        },
      };
    case REVIEW_OPEN_TASK_SUCCESS:
      return {
        ...statePart,
        taskConfig: {
          ...statePart.taskConfig,
          toUpdate: false,
          resolved: action.payload.resolved ? true : false,
          messages: [...statePart.taskConfig.messages, action.payload.message],
        },
      };

    case SET_CURRENT_CLASS:
      return {
        ...statePart,
        currentTasks: {
          ...statePart.currentTasks,
          class: action.payload,
        },
      };
    case SET_CURRENT_SECTION:
      return {
        ...statePart,
        currentTasks: {
          ...statePart.currentTasks,
          section: action.payload,
        },
      };
    default:
      return statePart;
  }
}
