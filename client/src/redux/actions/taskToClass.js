export const UPDATE_CLASSES = "[taskToClass] UPDATE_CLASSES";
export const SET_DEADLINE = "[taskToClass] SET_DEADLINE";
export const SET_START_DATE = "[taskToClass] SET_START_DATE";
export const SET_PROMPTS = "[taskToClass] SET_PROMPTS";
export const SET_DESCRIPTION = "[taskToClass] SET_DESCRIPTION";
export const SET_MESSAGE = "[taskToClass] SET_MESSAGE";
export const ADD_OPEN_TASK = "[taskToClass] ADD_OPEN_TASK";
export const ADD_CLOSE_TASK = "[taskToClass] ADD_CLOSE_TASK";
export const ADD_BOOLEAN_TASK = "[taskToClass] ADD_BOOLEAN_TASK";
export const ADD_TASK_ERROR = "[taskToClass] ADD_TASK_ERROR";
export const ADD_TASK_SUCCESS = "[taskToClass] ADD_TASK_SUCCESS";
export const CLEAR_TASK = "[taskToClass] CLEAR_TASK";

export const updateClasses = payload => ({
  type: UPDATE_CLASSES,
  payload
});

export const setDeadLine = payload => ({
  type: SET_DEADLINE,
  payload
});

export const setStartDate = payload => ({
  type: SET_START_DATE,
  payload
});

export const setPrompts = payload => ({
  type: SET_PROMPTS,
  payload
});

export const setMessage = payload => ({
  type: SET_MESSAGE,
  payload
});

export const setDescription = payload => ({
  type: SET_DESCRIPTION,
  payload
});

export const addOpenTask = payload => ({
  type: ADD_OPEN_TASK,
  payload
});

export const addCloseTask = payload => ({
  type: ADD_CLOSE_TASK,
  payload
});

export const addBooleanTask = payload => ({
  type: ADD_BOOLEAN_TASK,
  payload
});

export const taskSuccess = () => ({
  type: ADD_TASK_SUCCESS
});

export const addTaskError = payload => ({
  type: ADD_TASK_ERROR,
  payload
});

export const clearTask = () => ({
  type: CLEAR_TASK
});
