import { apiRequest } from '../actions/apiRequest';
import {
  GET_PROFILE,
  loadingProfile,
  profileSuccess,
  profileError
} from '../actions/profile';



const profile = ({dispatch}) => next => action => {
  next(action);
  if ( action.type === GET_PROFILE  ) {
    dispatch(loadingProfile());
    dispatch(apiRequest('GET','/api/teacher/profile/me', profileSuccess, profileError, null, null));
  }
};

export default profile;
