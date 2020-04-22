import { apiRequest } from '../actions/apiRequest';
import {
  GET_USER,
  loadingUser,
  userSuccess,
  userError
} from '../actions/user';



const user = ({dispatch}) => next => action => {
  next(action);
  if ( action.type === GET_USER  ) {
    dispatch(loadingUser());
    dispatch(apiRequest('GET','/api/auth', userSuccess, userError, null, null));
  }
};

export default user;
