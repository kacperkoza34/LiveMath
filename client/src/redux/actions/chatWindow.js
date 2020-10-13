export const SET_SENDER_AND_RECIPENT = "[chat] SET_SENDER_AND_RECIPENT";
export const SET_MESSAGES_IN_WINDOW = "[chat] SET_MESSAGES_IN_WINDOW";
export const ADD_SINGLE_MESSAGE = "[chat] ADD_SINGLE_MESSAGE";
export const MESSAGES_ERROR = "[chat] MESSAGES_ERROR";

export const setSenderAndRecipent = payload => ({
  type: SET_SENDER_AND_RECIPENT,
  payload
});

export const setMessagesInWindow = payload => ({
  type: SET_MESSAGES_IN_WINDOW,
  payload
});

export const messagesError = payload => ({
  type: MESSAGES_ERROR,
  payload
});

export const addSingleMessage = payload => ({
  type: ADD_SINGLE_MESSAGE,
  payload
});
