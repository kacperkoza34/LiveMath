import {
  ADD_TASK_CONTENT,
  ADD_TASK_VARIABELS,
  ADD_TASK_MODEL,
  ADD_VAR_DESCRIPTION,
  ADD_GROUP,
  ADD_ADDITIONAL_VARIABLE,
  REMOVE_ADDITIONAL_VARIABLE,
  ADD_CLASS,
  ADD_SECTION,
  ADD_NAME,
  NEW_TASK_ERROR,
  CLEAR_NEW_TASK,
  DELETE_GROUP,
  UPDATE_POINTS,
} from "../actions/newTask";

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case ADD_TASK_CONTENT:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          content: action.payload,
          model: "",
          groups: [],
          variables: [],
          additionalVariables: [],
        },
      };
    case ADD_NAME:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          name: action.payload,
        },
      };
    case ADD_TASK_VARIABELS:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          variables: action.payload,
          model: "",
          additionalVariables: [],
          groups: [],
        },
      };

    case ADD_TASK_MODEL:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          model: action.payload,
        },
      };

    case ADD_VAR_DESCRIPTION:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          variables: statePart.data.variables.map((item) => {
            if (item.variable === action.payload.variable)
              return { ...item, description: action.payload.value };
            else return item;
          }),
        },
      };
    case ADD_ADDITIONAL_VARIABLE:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          groups: [],
          additionalVariables: [
            ...statePart.data.additionalVariables,
            action.payload,
          ],
        },
      };
    case REMOVE_ADDITIONAL_VARIABLE:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          additionalVariables: statePart.data.additionalVariables.filter(
            ({ variable }) => variable != action.payload
          ),
        },
      };
    case ADD_GROUP:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          groups: [...statePart.data.groups, action.payload],
        },
      };
    case DELETE_GROUP:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          groups: statePart.data.groups.filter(
            ({ id }) => id != action.payload
          ),
        },
      };
    case ADD_CLASS:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          class: action.payload,
        },
      };
    case ADD_SECTION:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          section: action.payload,
        },
      };
    case UPDATE_POINTS:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          points: action.payload,
        },
      };
    case CLEAR_NEW_TASK:
      return {
        ...statePart,
        data: {
          content: "",
          name: "",
          variables: [],
          additionalVariables: [],
          model: "",
          groups: [],
          class: "",
          section: "",
        },
        success: action.payload,
      };
    case NEW_TASK_ERROR:
      return {
        ...statePart,
        errors: action.payload,
      };
    default:
      return statePart;
  }
}
