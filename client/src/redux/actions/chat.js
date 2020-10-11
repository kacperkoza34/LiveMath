export const GET_USERS_FROM_SOCKET_IO = "[chat] GET_USERS_FROM_SOCKET_IO";
export const COMBINE_CHAT_USERS_WITH_API = "[chat] COMBINE_CHAT_USERS_WITH_API";

export const setChatUsers = payload => ({
  type: GET_USERS_FROM_SOCKET_IO,
  payload
});

export const combineChatUsersWithApi = payload => ({
  type: COMBINE_CHAT_USERS_WITH_API,
  payload
});
