export const UPDATE_CLASSES =  '[taskToClass] UPDATE_CLASSES';
export const SET_DEADLINE =  '[taskToClass] SET_DEADLINE';
export const SET_PROMPTS = '[taskToClass] SET_PROMPTS';
export const ADD_OPEN_TASK = '[taskToClass] ADD_OPEN_TASK';
export const ADD_TASK_ERROR = '[taskToClass] ADD_TASK_ERROR';


export const updateClasses = (payload) =>({
  type: UPDATE_CLASSES,
  payload
})

export const setDeadLine = (payload) =>({
  type: SET_DEADLINE,
  payload
})

export const setPrompts = (payload) =>({
  type: SET_PROMPTS,
  payload
})

export const addOpenTask = (payload) =>({
  type: ADD_OPEN_TASK,
  payload
})

export const addTaskError = (payload) =>({
  type: ADD_TASK_ERROR,
  payload
})
