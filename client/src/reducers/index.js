import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import classes from './classes';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  classes
});
