import {
  UPDATE_CLASSES,
  SET_DEADLINE,
  SET_PROMPTS,
  ADD_TASK_ERROR
} from '../actions/taskToClass';

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case UPDATE_CLASSES:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          classes: action.payload
        }
      }
    case SET_DEADLINE:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          deadLine: action.payload
        }
      }
    case SET_PROMPTS:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          promptsAllowed: action.payload.prompt,
          descriptionRequired: action.payload.description
        }
      }
    case ADD_TASK_ERROR:
      return {
        ...statePart,
        errors: action.payload
      }
    default:
      return statePart;
  }
}
