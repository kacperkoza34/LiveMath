export const USE_PROMPT = "[RESOLVE_TASK] USE_PROMPT";
export const UPDATE_PROMPT = "[RESOLVE_TASK] UPDATE_PROMPT";
export const UPDATE_DESCRIPTION = "[RESOLVE_TASK] UPDATE_DESCRIPTION";
export const UPDATE_ANSWER = "[RESOLVE_TASK] UPDATE_ANSWER";
export const SEND_OPEN_TASK_RESOLUTION =
  "[RESOLVE_TASK] SEND_OPEN_TASK_RESOLUTION";
export const TASKS_RESOLVED = "[RESOLVE_TASK] TASKS_RESOLVED";

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

export const sendOpenTaskResolution = (payload) => ({
  type: SEND_OPEN_TASK_RESOLUTION,
  payload,
});

export const taskResolved = () => ({
  type: TASKS_RESOLVED,
});
