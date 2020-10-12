import {
  GET_USERS_FROM_SOCKET_IO,
  GET_NEW_MESSAGES_FROM_API,
  SET_SENDER_AND_RECIPENT,
  getNewMessagesFromApi,
  combineChatUsersWithMessages,
  chatError,
  setMessagesInWindow,
  messagesError
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
  if (action.type === SET_SENDER_AND_RECIPENT) {
    const { senderId, recipentId } = action.payload;
    if (senderId && recipentId) {
      dispatch(
        apiRequest(
          "GET",
          `/api/chat/loadAllMessages/${senderId}/${recipentId}`,
          setMessagesInWindow,
          messagesError,
          null,
          null
        )
      );
    } else dispatch(setMessagesInWindow([]));
  }
};

export default chat;
