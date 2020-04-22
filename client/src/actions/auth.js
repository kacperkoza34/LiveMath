import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user

export const loadUser = (register = false) => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  if(register) window.location.reload();
  else {
    try {
      let res;
      if(localStorage.token){
        res = await axios.get('/api/auth');
        dispatch({
          type: USER_LOADED,
          payload: res.data
        });
      } else {
        dispatch({
          type: AUTH_ERROR
        })
      }
    } catch (err){
      dispatch({
        type: AUTH_ERROR
      })
    };
  }
};

// Register user

export const register = ({ name, email, password, params}) => async dispatch =>{
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, password});
  try {
    let res;
    if(params.class){
      res = await axios.post(`/api/users/student/${params.teacher}/${params.class}`, body, config);
    }
    else {
      res = await axios.post(`/api/users/teacher/${params.teacher}`, body, config);
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser(true));
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(({msg}) => {
        dispatch(setAlert(msg, 'danger'));
      });
    };
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login user

export const login = ({email, password, accountType}) => async dispatch =>{
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }
  const body = JSON.stringify({email, password, accountType});
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser(true));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(({msg}) => {
        dispatch(setAlert(msg, 'danger'));
      });
    };
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// LOGOUT

export const logout = () => dispatch => {
  window.location.reload();
  dispatch({type: CLEAR_PROFILE});
  dispatch({type: LOGOUT});
}
