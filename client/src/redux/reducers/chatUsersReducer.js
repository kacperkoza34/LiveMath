import {
  GET_USERS_FROM_SOCKET_IO,
  COMBINE_CHAT_USERS_WITH_MESSAGES,
  CHAT_ERROR,
  UPDATE_USER_STATE
} from "../actions/chatUsers";

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case GET_USERS_FROM_SOCKET_IO:
      return {
        ...statePart,
        data: action.payload.map(item => {
          return { ...item, newMessages: false };
        })
      };
    case COMBINE_CHAT_USERS_WITH_MESSAGES:
      return {
        ...statePart,
        data: statePart.data.map(item => {
          return {
            ...item,
            newMessages: action.payload.some(
              ({ senderId }) => senderId === item._id
            )
          };
        })
      };
    case UPDATE_USER_STATE:
      return {
        ...statePart,
        data: statePart.data.map(item => {
          if (item._id === action.payload._id)
            item[action.payload.param] = action.payload.newState;
          return item;
        })
      };
    case CHAT_ERROR:
      return {
        ...statePart,
        isError: action.payload
      };
    default:
      return statePart;
  }
}
