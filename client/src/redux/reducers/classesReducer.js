import {
  LOADING_CLASSES,
  CLASSES_SUCCESS,
  CLASSES_ERROR,
  UPDATE_CLASS,
  ADD_CLASS,
  ADD_CLASS_TO_STATE,
  CLEAR_CLASSES
} from '../actions/classes';

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case LOADING_CLASSES:
      return{
        ...statePart,
        isFetching: true
      }
    case CLASSES_SUCCESS:
      return{
        ...statePart,
        data: action.payload,
        isFetching: false
      }
    case CLASSES_ERROR:
      return{
        ...statePart,
        errors: action.payload,
        isFetching: false
      }
    case UPDATE_CLASS:
      return {
        ...statePart,
        loading: false,
        data: [...statePart.data.map((item)=>{
          if(item._id == action.payload.id) item.open = action.payload.newStatus;
          return item
        })],
        errors: []
      };
    case ADD_CLASS_TO_STATE:
      return {
        ...statePart,
        loading: false,
        data: [...statePart.data,action.payload],
        errors: []
      };
    case CLEAR_CLASSES:
      return {
        ...statePart,
        data: []
      };
    default:
      return statePart;
  }
}
