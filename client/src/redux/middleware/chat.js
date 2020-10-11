import {
  GET_USERS_FROM_SOCKET_IO,
  GET_NEW_MESSAGES_FROM_API,
  getNewMessagesFromApi,
  combineChatUsersWithMessages,
  chatError
} from "../actions/chat";

import { apiRequest } from "../actions/apiRequest";

const chat = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_USERS_FROM_SOCKET_IO) {
    dispatch(getNewMessagesFromApi(action.meta.id));
  }
  if (action.type === GET_NEW_MESSAGES_FROM_API) {
    dispatch(
      apiRequest(
        "GET",
        `/api/chat/getNewMessages/${action.payload}`,
        combineChatUsersWithMessages,
        chatError,
        null,
        null
      )
    );
  }
};

export default chat;
