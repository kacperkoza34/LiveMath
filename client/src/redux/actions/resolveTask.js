export const USE_PROMPT = "[RESOLVE_TASK] USE_PROMPT";
export const UPDATE_PROMPT = "[RESOLVE_TASK] UPDATE_PROMPT";
export const UPDATE_DESCRIPTION = "[RESOLVE_TASK] UPDATE_DESCRIPTION";
export const UPDATE_ANSWER = "[RESOLVE_TASK] UPDATE_ANSWER";
export const UPDATE_ANSWERS = "[RESOLVE_TASK] UPDATE_ANSWERS";
export const SEND_OPEN_TASK_RESOLUTION =
  "[RESOLVE_TASK] SEND_OPEN_TASK_RESOLUTION";
export const SEND_CLOSE_TASK_RESOLUTION =
  "[RESOLVE_TASK] SEND_CLOSE_TASK_RESOLUTION";
export const SEND_BOOLEAN_TASK_RESOLUTION =
  "[RESOLVE_TASK] SEND_BOOLEAN_TASK_RESOLUTION";
export const TASKS_RESOLVED = "[RESOLVE_TASK] TASKS_RESOLVED";
export const REVIEW_OPEN_TASK = "[RESOLVE_TASK] REVIEW_OPEN_TASK";
export const REVIEW_OPEN_TASK_SUCCESS =
  "[RESOLVE_TASK] REVIEW_OPEN_TASK_SUCCESS";
export const REVIEW_CLOSE_TASK = "[RESOLVE_TASK] REVIEW_CLOSE_TASK";
export const REVIEW_CLOSE_TASK_SUCCESS =
  "[RESOLVE_TASK] REVIEW_CLOSE_TASK_SUCCESS";

export const useOnePrompt = (payload) => ({
  type: USE_PROMPT,
  payload,
});

export const updatePrompt = (payload) => ({
  type: UPDATE_PROMPT,
  payload,
});

export const updateDescription = (payload) => ({
  type: UPDATE_DESCRIPTION,
  payload,
});

export const updateAnswer = (payload) => ({
  type: UPDATE_ANSWER,
  payload,
});

export const updateAnswers = (payload) => ({
  type: UPDATE_ANSWERS,
  payload,
});

export const sendOpenTaskResolution = (payload) => ({
  type: SEND_OPEN_TASK_RESOLUTION,
  payload,
});

export const sendCloseTaskResolution = (payload) => ({
  type: SEND_CLOSE_TASK_RESOLUTION,
  payload,
});

export const sendBooleanTaskResolution = (payload) => ({
  type: SEND_BOOLEAN_TASK_RESOLUTION,
  payload,
});

export const taskResolved = (payload) => ({
  type: TASKS_RESOLVED,
  payload,
});

export const reviewOpenTask = (payload) => ({
  type: REVIEW_OPEN_TASK,
  payload,
});

export const reviewOpenTaskSuccess = (payload) => ({
  type: REVIEW_OPEN_TASK_SUCCESS,
  payload,
});

export const reviewCloseTask = (payload) => ({
  type: REVIEW_CLOSE_TASK,
  payload,
});

export const reviewCloseTaskSuccess = (payload) => ({
  type: REVIEW_CLOSE_TASK_SUCCESS,
  payload,
});
