export const ADD_TASK_CONTENT = '[task] ADD_TASK_CONTENT';
export const ADD_TASK_VARIABELS = '[task] ADD_TASK_VARIABELS';
export const ADD_TASK_MODEL = '[task] ADD_TASK_MODEL';
export const ADD_VAR_DESCRIPTION = '[task] ADD_VAR_DESCRIPTION';
export const ADD_GROUP = '[task] ADD_GROUP';
export const ADD_ADDITIONAL_VARIABLE = '[task] ADD_ADDITIONAL_VARIABLE';
export const REMOVE_ADDITIONAL_VARIABLE = '[task] REMOVE_ADDITIONAL_VARIABLE';

export const addTaskContent = (payload) => ({
  type: ADD_TASK_CONTENT,
  payload
});

export const addTaskData = (payload) => ({
  type: ADD_TASK_VARIABELS,
  payload
});

export const addTaskModel = (payload) => ({
  type: ADD_TASK_MODEL,
  payload
});

export const addVarDescription = (value, variable) => ({
  type: ADD_VAR_DESCRIPTION,
  payload: {value, variable}
});

export const addGroup = (payload) => ({
  type: ADD_GROUP,
  payload
});

export const addAddVariable = (payload) => ({
  type: ADD_ADDITIONAL_VARIABLE,
  payload
});

export const removeAddVariable = (payload) => ({
  type: REMOVE_ADDITIONAL_VARIABLE,
  payload
});
