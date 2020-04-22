export const GET_TASKS = '[tasks] GET_TASKS';
export const TASKS_SUCCESS = '[tasks] TASKS_SUCCESS';
export const TASKS_ERROR = '[tasks] TASKS_ERROR';
export const TASKS_LOADING = '[tasks] TASKS_LOADING';
export const GET_OPEN_TASK = '[tasks] GET_OPEN_TASK';
export const GET_CLOSE_TASK = '[tasks] GET_CLOSE_TASK';
export const GET_BOOLEAN_TASK = '[tasks] GET_BOOLEAN_TASK';
export const CLEAR_TASKS = '[tasks] CLEAR_TASKS';

export const getTasks = (payload) =>({
  type: GET_TASKS,
  payload
});

export const taskLoading = (payload) =>({
  type: TASKS_LOADING
});

export const taskSuccess = (payload) =>({
  type: TASKS_SUCCESS,
  payload
});

export const taskError = (payload) =>({
  type: TASKS_ERROR,
  payload
});

export const clearTasks = () =>({
  type: CLEAR_TASKS
});

export const getOpenTask = (payload) =>({
  type: GET_OPEN_TASK,
  payload
});

export const getCloseTask = (payload) =>({
  type: GET_CLOSE_TASK,
  payload
});

export const getBooleanTask = (payload) =>({
  type: GET_BOOLEAN_TASK,
  payload
});
