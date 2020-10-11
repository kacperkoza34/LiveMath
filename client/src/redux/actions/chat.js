export const GET_USERS_FROM_SOCKET_IO = "[chat] GET_USERS_FROM_SOCKET_IO";
export const GET_NEW_MESSAGES_FROM_API = "[chat] GET_NEW_MESSAGES_FROM_API";
export const COMBINE_CHAT_USERS_WITH_MESSAGES =
  "[chat] COMBINE_CHAT_USERS_WITH_MESSAGES";
export const UPDATE_USER_STATE = "[chat] UPDATE_USER_STATE";
export const UPDATE_USER_NEW_MESSAGE = "[chat] UPDATE_USER_NEW_MESSAGE";

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

export const chatError = payload => ({
  type: CHAT_ERROR,
  payload
});
