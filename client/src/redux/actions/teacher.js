export const GET_TEACHER = '[teacher] GET_TEACHER';
export const LOADING_TEACHER = '[teacher] LOADING_TEACHER';
export const TEACHER_SUCCESS = '[teacher] TEACHER_SUCCESS';
export const TEACHER_ERROR = '[teacher] TEACHER_ERROR';
export const CLEAR_TEACHER = '[teacher] CLEAR_TEACHER';

export const getTeacher = (payload) =>({
  type: GET_TEACHER,
  payload
});

export const loadingTeacher = () =>({
  type: LOADING_TEACHER
});

export const teacherSuccess = (payload) =>({
  type: TEACHER_SUCCESS,
  payload
});

export const teacherError = (payload) =>({
  type: TEACHER_ERROR,
  payload
});

export const clearTeacher = () =>({
  type: CLEAR_TEACHER
});
