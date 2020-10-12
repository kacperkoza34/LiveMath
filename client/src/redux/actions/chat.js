export const GET_USERS_FROM_SOCKET_IO = "[chat] GET_USERS_FROM_SOCKET_IO";
export const GET_NEW_MESSAGES_FROM_API = "[chat] GET_NEW_MESSAGES_FROM_API";
export const COMBINE_CHAT_USERS_WITH_MESSAGES =
  "[chat] COMBINE_CHAT_USERS_WITH_MESSAGES";
export const UPDATE_USER_STATE = "[chat] UPDATE_USER_STATE";
export const UPDATE_USER_NEW_MESSAGE = "[chat] UPDATE_USER_NEW_MESSAGE";
export const SET_SENDER_AND_RECIPENT = "[chat] SET_SENDER_AND_RECIPENT";
export const SET_MESSAGES_IN_WINDOW = "[chat] SET_MESSAGES_IN_WINDOW";
export const ADD_SINGLE_MESSAGE = "[chat] ADD_SINGLE_MESSAGE";

export const MESSAGES_ERROR = "[chat] MESSAGES_ERROR";
export const CHAT_ERROR = "[chat] CHAT_ERROR";

export const setChatUsers = (payload, id) => ({
  type: GET_USERS_FROM_SOCKET_IO,
  payload,
  meta: { id }
});

export const getNewMessagesFromApi = payload => ({
  type: GET_NEW_MESSAGES_FROM_API,
  payload
});

export const combineChatUsersWithMessages = payload => ({
  type: COMBINE_CHAT_USERS_WITH_MESSAGES,
  payload
});

export const updateUserState = payload => ({
  type: UPDATE_USER_STATE,
  payload
});

export const updateUserNewMessage = payload => ({
  type: UPDATE_USER_NEW_MESSAGE,
  payload
});

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

export const chatError = payload => ({
  type: CHAT_ERROR,
  payload
});
