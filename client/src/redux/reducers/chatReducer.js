import {
  GET_USERS_FROM_SOCKET_IO,
  COMBINE_CHAT_USERS_WITH_MESSAGES,
  CHAT_ERROR,
  UPDATE_USER_STATE,
  SET_SENDER_AND_RECIPENT,
  SET_MESSAGES_IN_WINDOW,
  MESSAGES_ERROR,
  ADD_SINGLE_MESSAGE
} from "../actions/chat";

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case GET_USERS_FROM_SOCKET_IO:
      return {
        ...statePart,
        chatUsers: {
          ...statePart.chatUsers,
          data: action.payload.map(item => {
            return { ...item, newMessages: false };
          })
        }
      };
    case COMBINE_CHAT_USERS_WITH_MESSAGES:
      return {
        ...statePart,
        chatUsers: {
          ...statePart.chatUsers,
          data: statePart.chatUsers.data.map(item => {
            return {
              ...item,
              newMessages: action.payload.some(
                ({ senderId }) => senderId === item._id
              )
            };
          })
        }
      };
    case UPDATE_USER_STATE:
      return {
        ...statePart,
        chatUsers: {
          ...statePart.chatUsers,
          data: statePart.chatUsers.data.map(item => {
            if (item._id === action.payload._id)
              item[action.payload.param] = !item[action.payload.param];
            return item;
          })
        }
      };
    case SET_SENDER_AND_RECIPENT:
      return {
        ...statePart,
        currentChat: {
          ...statePart.currentChat,
          isFetching: true,
          recipentId: action.payload.recipentId,
          senderId: action.payload.senderId
        }
      };
    case SET_MESSAGES_IN_WINDOW:
      return {
        ...statePart,
        currentChat: {
          ...statePart.currentChat,
          isFetching: false,
          messages: action.payload
        }
      };
    case ADD_SINGLE_MESSAGE:
      return {
        ...statePart,
        currentChat: {
          ...statePart.currentChat,
          messages: [...statePart.currentChat.messages, action.payload]
        }
      };
    case MESSAGES_ERROR:
      return {
        ...statePart,
        currentChat: {
          ...statePart.currentChat,
          isFetching: false,
          isError: true,
          messages: action.payload
        }
      };
    case CHAT_ERROR:
      return {
        ...statePart,
        chatUsers: {
          ...statePart.chatUsers,
          isError: action.payload
        }
      };
    default:
      return statePart;
  }
}
