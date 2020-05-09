import {
  LOADING_CLASSES,
  CLASSES_SUCCESS,
  CLASSES_ERROR,
  UPDATE_CLASS,
  ADD_CLASS_TO_STATE,
  CLEAR_CLASSES,
  SET_CURRENT_CLASS,
} from "../actions/classes";

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case LOADING_CLASSES:
      return {
        ...statePart,
        isFetching: true,
      };
    case CLASSES_SUCCESS:
      return {
        ...statePart,
        data: action.payload,
        isFetching: false,
        errors: false,
      };
    case CLASSES_ERROR:
      return {
        ...statePart,
        errors: action.payload,
        isFetching: false,
      };
    case UPDATE_CLASS:
      return {
        ...statePart,
        loading: false,
        data: [
          ...statePart.data.map((item) => {
            if (item._id === action.payload.id)
              item.open = action.payload.newStatus;
            return item;
          }),
        ],
        errors: false,
      };
    case ADD_CLASS_TO_STATE:
      return {
        ...statePart,
        loading: false,
        data: [...statePart.data, action.payload],
        errors: false,
      };
    case SET_CURRENT_CLASS:
      return {
        ...statePart,
        currentClass: action.payload,
      };
    case CLEAR_CLASSES:
      return {
        ...statePart,
        data: [],
        errors: false,
      };
    default:
      return statePart;
  }
}
