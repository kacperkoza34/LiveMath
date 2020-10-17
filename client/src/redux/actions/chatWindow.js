export const SET_SENDER_AND_RECIPENT = "[chat] SET_SENDER_AND_RECIPENT";
export const SET_MESSAGES_IN_WINDOW = "[chat] SET_MESSAGES_IN_WINDOW";
export const ADD_SINGLE_MESSAGE = "[chat] ADD_SINGLE_MESSAGE";
export const LOAD_NEW_MESSAGES = "[chat] LOAD_NEW_MESSAGES";
export const CLEAR_CHAT_WINDOW = "[chat] CLEAR_CHAT_WINDOW";
export const SCROLL_DOWN = "[chat] SCROLL_DOWN";
export const LOADING_NEW_MESSAGES = "[chat] LOADING_NEW_MESSAGES";
export const MESSAGES_ERROR = "[chat] MESSAGES_ERROR";

export const setSenderAndRecipent = payload => ({
  type: SET_SENDER_AND_RECIPENT,
  payload
});

export const setMessagesInWindow = payload => ({
  type: SET_MESSAGES_IN_WINDOW,
  payload
});

export const addSingleMessage = payload => ({
  type: ADD_SINGLE_MESSAGE,
  payload
});

export const loadNewMessages = payload => ({
  type: LOAD_NEW_MESSAGES,
  payload
});

export const clearChatWindow = payload => ({
  type: CLEAR_CHAT_WINDOW,
  payload
});

export const scrollDown = payload => ({
  type: SCROLL_DOWN,
  payload
});

export const messagesError = payload => ({
  type: MESSAGES_ERROR,
  payload
});
