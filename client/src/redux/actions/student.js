export const GET_STUDENT= '[student] GET_STUDENT';
export const STUDENT_SUCCESS = '[student] STUDENT_SUCCESS';
export const STUDENT_ERROR = '[student] STUDENT_ERROR';
export const STUDENT_LOADING = '[student] STUDENT_LOADING';

export const studentLoading = (payload) =>({
  type: STUDENT_LOADING,
  payload
});


export const getStudent = (payload) =>({
  type: GET_STUDENT,
  payload
});

export const studentSuccess = (payload) =>({
  type: STUDENT_SUCCESS,
  payload
});

export const studentError = (payload) =>({
  type: STUDENT_ERROR,
  payload
});
