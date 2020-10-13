import {
  SET_SENDER_AND_RECIPENT,
  setMessagesInWindow,
  messagesError
} from "../actions/chatWindow";

import { apiRequest } from "../actions/apiRequest";

const chatWindow = ({ dispatch }) => next => action => {
  next(action);
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

export default chatWindow;
