import { apiRequest } from "../actions/apiRequest";
import {
  GET_CLASSES,
  OPEN_CLASS,
  CLOSE_CLASS,
  UPDATE_CLASS,
  ADD_CLASS,
  CLASSES_ERROR,
  ADD_CLASS_TO_STATE,
  loadingClasses,
  classesSuccess,
  classesError,
  updateClass,
  addClassToState,
} from "../actions/classes";

import { smallLoadingStart, smallLoadingStop } from "../actions/smallLoading";

const configJson = {
  headers: {
    "Content-Type": "application/json",
  },
};

const classes = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === GET_CLASSES) {
    dispatch(loadingClasses());
    dispatch(
      apiRequest(
        "GET",
        "/api/class/my",
        classesSuccess,
        classesError,
        null,
        null
      )
    );
  }

  if (action.type === OPEN_CLASS) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "PUT",
        `/api/class/open/${action.payload}`,
        updateClass,
        classesError,
        null,
        null
      )
    );
  }

  if (action.type === CLOSE_CLASS) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "PUT",
        `/api/class/close/${action.payload}`,
        updateClass,
        classesError,
        null,
        null
      )
    );
  }
  if (action.type === UPDATE_CLASS) {
    dispatch(smallLoadingStop());
  }
  if (action.type === ADD_CLASS) {
    dispatch(smallLoadingStart());
    dispatch(
      apiRequest(
        "POST",
        "/api/class/create",
        addClassToState,
        classesError,
        action.payload,
        configJson
      )
    );
  }
  if (action.type === CLASSES_ERROR) {
    dispatch(smallLoadingStop());
  }
  if (action.type === ADD_CLASS_TO_STATE) {
    dispatch(smallLoadingStop());
  }
};

export default classes;
