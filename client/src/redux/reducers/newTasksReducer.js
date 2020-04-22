import {
  ADD_TASK_CONTENT,
  ADD_TASK_VARIABELS,
  ADD_TASK_MODEL,
  ADD_VAR_DESCRIPTION,
  ADD_GROUP,
  ADD_ADDITIONAL_VARIABLE,
  REMOVE_ADDITIONAL_VARIABLE
} from '../actions/newTask';

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case ADD_TASK_CONTENT:
      return {
        ...statePart,
        content: action.payload
      };

    case ADD_TASK_VARIABELS:
      return {
        ...statePart,
        variables: action.payload,
        model: '',
        groups: []
      };

    case ADD_TASK_MODEL:
      return {
        ...statePart,
        model: action.payload
      };

    case ADD_VAR_DESCRIPTION:
      return {
        ...statePart,
        variables: statePart.variables.map( item =>{
          if(item.variable === action.payload.variable) return { ...item, description: action.payload.value };
          else return item;
        })
      };
    case ADD_ADDITIONAL_VARIABLE:
      return {
        ...statePart,
        additionalVariables: [...statePart.additionalVariables, action.payload]
      };
    case REMOVE_ADDITIONAL_VARIABLE:
      return {
        ...statePart,
        additionalVariables: statePart.additionalVariables.filter(({variable})=> variable != action.payload)
      };
    case ADD_GROUP:
      return {
        ...statePart,
        groups: action.payload
      };

    default:
      return statePart;
  }
}
