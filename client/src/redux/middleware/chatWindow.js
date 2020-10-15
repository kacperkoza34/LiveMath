import {
  SET_SENDER_AND_RECIPENT,
  LOAD_NEW_MESSAGES,
  clearChatWindow,
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
          `/api/chat/loadAllMessages/${senderId}/${recipentId}/0/12`,
          setMessagesInWindow,
          messagesError,
          null,
          null
        )
      );
    } else dispatch(clearChatWindow());
  }
  if (action.type === LOAD_NEW_MESSAGES) {
    const { senderId, recipentId, messagesAmount } = action.payload;
    dispatch(
      apiRequest(
        "GET",
        `/api/chat/loadAllMessages/${senderId}/${recipentId}/${messagesAmount}/${messagesAmount +
          12}`,
        setMessagesInWindow,
        messagesError,
        null,
        null
      )
    );
  }
};

export default chatWindow;
