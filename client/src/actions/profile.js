import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_TEACHER_PROFILE
} from './types';

// Get current teacher profile
export const getProfile = (accountType) => async dispatch => {
  try {
    let res;
    if(accountType == 'teacher') res = await axios.get('/api/teacher/profile/me');
    else res = await axios.get('/api/student/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response
    });
  }
};

// Get teacher profile
export const getTeacherProfile = (id) => async dispatch => {
  try {
    let res = await axios.get(`/api/teacher/profile/${id}`);
    dispatch({
      type: GET_TEACHER_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response
    });
  }
};
