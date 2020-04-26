export const GET_CLASSES = "[class] GET_CLASSES";
export const LOADING_CLASSES = "[class] LOADING_CLASSES";
export const CLASSES_SUCCESS = "[class] CLASSES_SUCCESS";
export const CLASSES_ERROR = "[class] CLASSES_ERROR";
export const OPEN_CLASS = "[class] OPEN_CLASS";
export const CLOSE_CLASS = "[class] CLOSE_CLASS";
export const UPDATE_CLASS = "[class] UPDATE_CLASS";
export const ADD_CLASS = "[class] ADD_CLASS";
export const ADD_CLASS_TO_STATE = "[class] ADD_CLASS_TO_STATE";
export const CLEAR_CLASSES = "[class] CLEAR_CLASSES";

export const getClasses = () => ({
  type: GET_CLASSES,
});

export const loadingClasses = () => ({
  type: LOADING_CLASSES,
});

export const classesSuccess = (payload) => ({
  type: CLASSES_SUCCESS,
  payload,
});

export const classesError = (payload) => ({
  type: CLASSES_ERROR,
  payload,
});

export const openClass = (payload) => ({
  type: OPEN_CLASS,
  payload,
});

export const closeClass = (payload) => ({
  type: CLOSE_CLASS,
  payload,
});

export const updateClass = (payload) => ({
  type: UPDATE_CLASS,
  payload,
});

export const addClass = (payload) => ({
  type: ADD_CLASS,
  payload,
});

export const addClassToState = (payload) => ({
  type: ADD_CLASS_TO_STATE,
  payload,
});

export const clearClasses = () => ({
  type: CLEAR_CLASSES,
});
