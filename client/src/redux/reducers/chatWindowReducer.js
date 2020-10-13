import {
  SET_SENDER_AND_RECIPENT,
  SET_MESSAGES_IN_WINDOW,
  MARK_MESSAGE_AS_VIEWED,
  MESSAGES_ERROR,
  ADD_SINGLE_MESSAGE
} from "../actions/chatWindow";

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case SET_SENDER_AND_RECIPENT:
      const { recipentId, senderId } = action.payload;
      return {
        ...statePart,
        isFetching: !statePart.isFetching,
        recipentId:  recipentId,
        senderId:  senderId
      };
    case SET_MESSAGES_IN_WINDOW:
      return {
        ...statePart,
        isFetching: false,
        messages: action.payload
      };
    case ADD_SINGLE_MESSAGE:
      return {
        ...statePart,
        messages: [...statePart.messages, action.payload]
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
