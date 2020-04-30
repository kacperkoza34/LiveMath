export const USE_PROMPT = "[RESOLVE_TASK] USE_PROMPT";
export const UPDATE_PROMPT = "[RESOLVE_TASK] UPDATE_PROMPT";

export const useOnePrompt = (payload) => ({
  type: USE_PROMPT,
  payload,
});

export const updatePrompt = (payload) => ({
  type: UPDATE_PROMPT,
  payload,
});
