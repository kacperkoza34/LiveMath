import {
  SET_SENDER_AND_RECIPENT,
  SET_MESSAGES_IN_WINDOW,
  MARK_MESSAGE_AS_VIEWED,
  MESSAGES_ERROR,
  ADD_SINGLE_MESSAGE,
  CLEAR_CHAT_WINDOW,
  SCROLL_DOWN,
  LOAD_NEW_MESSAGES
} from "../actions/chatWindow";

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case SET_SENDER_AND_RECIPENT:
      const { recipentId, senderId } = action.payload;
      return {
        ...statePart,
        isFetching: !statePart.isFetching,
        recipentId: recipentId,
        senderId: senderId
      };
    case SET_MESSAGES_IN_WINDOW:
      return {
        ...statePart,
        isFetching: false,
        messages: [...action.payload, ...statePart.messages],
        loadingNewMessages: false
      };
    case ADD_SINGLE_MESSAGE:
      return {
        ...statePart,
        messages: [...statePart.messages, action.payload]
      };
    case CLEAR_CHAT_WINDOW:
      return {
        ...statePart,
        messages: []
      };
    case SCROLL_DOWN:
      return {
        ...statePart,
        scrollDown: action.payload
      };
    case LOAD_NEW_MESSAGES:
      return {
        ...statePart,
        loadingNewMessages: true
      };
    case MESSAGES_ERROR:
      return {
        ...statePart,
        isFetching: false,
        isError: true,
        messages: action.payload
      };
    default:
      return statePart;
  }
}
