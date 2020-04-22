import {
  GET_CLASSES,
  CLASSES_ERROR,
  ADD_CLASS,
  UPDATE_CLASS
} from '../actions/types';

const initialState = {
  myClasses: null,
  loading: true,
  error: false
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CLASSES:
      return {
        ...state,
        loading: false,
        myClasses: payload
      };
    case ADD_CLASS:
      return {
        ...state,
        loading: false,
        myClasses: [...state.myClasses,payload]
      };
    case UPDATE_CLASS:
      return {
        ...state,
        loading: false,
        myClasses: [...state.myClasses.map((item)=>{
          if(item._id == payload.id) item.open = payload.newStatus;
          return item
        })]
      };
    case CLASSES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
    return state;
  }
}
