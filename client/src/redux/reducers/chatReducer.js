import {
  GET_USERS_FROM_SOCKET_IO,
  COMBINE_CHAT_USERS_WITH_MESSAGES,
  CHAT_ERROR,
  UPDATE_USER_STATE
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
            if (item._id === action.payload) item.active = !item.active;
            return item;
          })
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
