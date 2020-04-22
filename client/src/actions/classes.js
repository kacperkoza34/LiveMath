import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CLASSES,
  CLASSES_ERROR,
  ADD_CLASS,
  UPDATE_CLASS
} from './types';

// Get teacher's classes
export const getClasses = () => async dispatch => {
  try {
    const res = await axios.get('/api/class/my');
    dispatch({
      type: GET_CLASSES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CLASSES_ERROR,
      payload: err.response
    });
  }
};

export const addClass = (title,maxStudentsAmount) => async dispatch => {
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }
  const body = JSON.stringify({title,maxStudentsAmount});
  try {
    const res = await axios.post('/api/class/create',body,config);
    dispatch({
      type: ADD_CLASS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(({msg}) => {
        dispatch(setAlert(msg, 'danger'));
      });
    };
    dispatch({
      type: CLASSES_ERROR,
      payload: err.response
    });
  }
};

export const openClass = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/class/open/${id}`);
    dispatch({
      type: UPDATE_CLASS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(({msg}) => {
        dispatch(setAlert(msg, 'danger'));
      });
    };
    dispatch({
      type: CLASSES_ERROR,
      payload: err.response
    });
  }
};

export const closeClass = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/class/close/${id}`);
    dispatch({
      type: UPDATE_CLASS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(({msg}) => {
        dispatch(setAlert(msg, 'danger'));
      });
    };
    dispatch({
      type: CLASSES_ERROR,
      payload: err.response
    });
  }
};
