export const ADD_TASK_CONTENT = "[task] ADD_TASK_CONTENT";
export const ADD_TASK_VARIABELS = "[task] ADD_TASK_VARIABELS";
export const ADD_TASK_MODEL = "[task] ADD_TASK_MODEL";
export const ADD_VAR_DESCRIPTION = "[task] ADD_VAR_DESCRIPTION";
export const ADD_GROUP = "[task] ADD_GROUP";
export const DELETE_GROUP = "[task] DELETE_GROUP";
export const ADD_ADDITIONAL_VARIABLE = "[task] ADD_ADDITIONAL_VARIABLE";
export const REMOVE_ADDITIONAL_VARIABLE = "[task] REMOVE_ADDITIONAL_VARIABLE";
export const ADD_CLASS = "[task] ADD_CLASS";
export const ADD_SECTION = "[task] ADD_SECTION";
export const UPDATE_POINTS = "[task] UPDATE_POINTS";
export const ADD_NAME = "[task] ADD_NAME";
export const SEND_OPEN_TASK = "[task] SEND_OPEN_TASK";
export const SEND_CLOSE_TASK = "[task] SEND_CLOSE_TASK";
export const SEND_BOOLEAN_TASK = "[task] SEND_BOOLEAN_TASK";
export const NEW_TASK_ERROR = "[task] NEW_TASK_ERROR";
export const CLEAR_NEW_TASK = "[task] CLEAR_NEW_TASK";

export const addTaskContent = (payload) => ({
  type: ADD_TASK_CONTENT,
  payload,
});

export const addTaskName = (payload) => ({
  type: ADD_NAME,
  payload,
});

export const addTaskData = (payload) => ({
  type: ADD_TASK_VARIABELS,
  payload,
});

export const addTaskModel = (payload) => ({
  type: ADD_TASK_MODEL,
  payload,
});

export const addVarDescription = (value, variable) => ({
  type: ADD_VAR_DESCRIPTION,
  payload: { value, variable },
});

export const addGroup = (payload) => ({
  type: ADD_GROUP,
  payload,
});

export const deleteGroup = (payload) => ({
  type: DELETE_GROUP,
  payload,
});

export const addAddVariable = (payload) => ({
  type: ADD_ADDITIONAL_VARIABLE,
  payload,
});

export const removeAddVariable = (payload) => ({
  type: REMOVE_ADDITIONAL_VARIABLE,
  payload,
});

export const addClass = (payload) => ({
  type: ADD_CLASS,
  payload,
});

export const addSection = (payload) => ({
  type: ADD_SECTION,
  payload,
});

export const updatePoints = (payload) => ({
  type: UPDATE_POINTS,
  payload,
});

export const sendOpenTask = (payload) => ({
  type: SEND_OPEN_TASK,
  payload,
});

export const sendCloseTask = (payload) => ({
  type: SEND_CLOSE_TASK,
  payload,
});

export const sendBooleanTask = (payload) => ({
  type: SEND_BOOLEAN_TASK,
  payload,
});

export const clearTask = (payload) => ({
  type: CLEAR_NEW_TASK,
  payload,
});

export const newTaskError = (payload) => ({
  type: NEW_TASK_ERROR,
  payload,
});
