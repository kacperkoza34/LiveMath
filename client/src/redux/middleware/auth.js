import { apiRequest } from '../actions/apiRequest';
import {
  REGISTER_START,
  REGISTER_SUCCESS,
  LOGIN_START,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  ALREDY_LOGGED,
  LOGOUT,
  authError,
  loginSuccess,
  registerSuccess,
  loading
} from '../actions/auth';

import { getUser, clearUser } from '../actions/user';
import { clearTeacher } from '../actions/teacher';
import { clearProfile } from '../actions/profile';
import { clearClasses } from '../actions/classes';

import setAuthToken from '../../utils/setAuthToken';

const configJson = {
  headers: {
    'Content-Type' : 'application/json'
  }
};

const auth = ({dispatch}) => next => action => {
  next(action);
  if ( action.type === REGISTER_START  ) {
    const { name, email, password, params } = action.payload;

    let url = '';
    if(params.class){
       url = `/api/users/student/${params.teacher}/${params.class}`
     } else {
       url = `/api/users/teacher/${params.teacher}`
     }
    dispatch(loading());
    dispatch(apiRequest('POST', url, registerSuccess, authError, {name, email, password}, configJson));
  }

  if ( action.type === LOGIN_START  ) {
    const url = '/api/auth';
    dispatch(loading());
    dispatch(apiRequest('POST', url, loginSuccess, authError, action.payload, configJson));
  }

  if ( action.type === REGISTER_SUCCESS ||
       action.type === LOGIN_SUCCESS ||
       action.type === ALREDY_LOGGED
    ) {
    setAuthToken(action.payload.token);
    dispatch(getUser());
  }

  if( action.type === LOGOUT ) {
    dispatch(clearUser());
    dispatch(clearTeacher());
    dispatch(clearProfile());
    dispatch(clearClasses());
  }
};

export default auth;
