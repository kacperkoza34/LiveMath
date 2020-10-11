import {
  GET_USERS_FROM_SOCKET_IO,
  COMBINE_CHAT_USERS_WITH_API,
  combineChatUsersWithApi
} from "../actions/chat";

import { apiRequest } from "../actions/apiRequest";

const chat = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_USERS_FROM_SOCKET_IO) {
    dispatch(combineChatUsersWithApi(action.payload.id));
  }
  if (action.type === COMBINE_CHAT_USERS_WITH_API) {
    dispatch(apiRequest(action.payload.id));
  }
};

export default chat;
