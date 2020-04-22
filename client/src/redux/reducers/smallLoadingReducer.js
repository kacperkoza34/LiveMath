import {
  FETCHING_STOP,
  FETCHING_START
} from '../actions/smallLoading';

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCHING_START: return true
    case FETCHING_STOP: return false
    default:
      return statePart;
  }
}
