import React, { useEffect, useState } from "react";
import StudentChat from "./StudentChat/StudentChat";
import TeacherChat from "./TeacherChat/TeacherChat";
import socketIOClient from "socket.io-client";
import { addSingleMessage } from "../../redux/actions/chatWindow";

import {
  setChatUsers,
  updateUserState,
  chatError
} from "../../redux/actions/chatUsers";

import { connect } from "react-redux";
import styles from "./index.module.scss";

const Chat = ({
  token,
  id,
  accountType,
  setChatUsers,
  addSingleMessage,
  updateUserState,
  chatUsers: { data, isFetching, isError },
  stateRecipentId,
  stateSenderId
}) => {
  const [isAuth, setAuth] = useState(false);

  const PORT =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

  const socket = socketIOClient(PORT);
  const isTeacher = accountType == "teacher";

  const sendMessageSocket = (message, recipentId, senderId) => {
    socket.emit("message", { message, recipentId, senderId });
  };

  useEffect(() => {

    socket.emit("auth", { token });
    socket.on("authSuccess", ({ users }) => {
      if (!isAuth) setChatUsers(users, id);
      setAuth(true);
    });

    socket.on("markAsNotActive", ({ _id }) => {
      if (!isAuth)  updateUserState({ _id, newState: false, param: "active" });
    });
    socket.on("markAsActive", ({ _id }) => {
      if (!isAuth)  updateUserState({ _id, newState: true, param: "active" });
    });

    socket.on("message", message => {
      const { author } = message;
      console.log("message recived");
      if (author !== stateRecipentId) {
        updateUserState({
          _id: author,
          newState: true,
          param: "newMessages"
        });
      } else addSingleMessage(message);
    });

    socket.on("messageSaved", message => {
      console.log("message svaed");
      if (stateRecipentId && stateSenderId) addSingleMessage(message);
    });

    socket.on("error", ({ error }) => {
      console.log("errr");
      socket.disconnect();
      chatError();
    });
    return () => socket.disconnect();
  }, [ stateRecipentId, stateSenderId ]);

  const displayChatList = () => {
    if (data.length) {
      if (accountType === "teacher")
        return (
          <TeacherChat
            senderId={id}
            users={data}
            sendMessageSocket={sendMessageSocket}
          />
        );
      else {
        return (
          <StudentChat
            senderId={id}
            users={data[0]}
            sendMessageSocket={sendMessageSocket}
          />
        );
      }
    } else return null;
  };

  return (
    <div className={styles.chat}>
      {isError ? <div>{"Błąd czatu"}</div> : displayChatList()}
    </div>
  );
};

const mapStateToProps = state => ({
  chatUsers: state.chatUsers,
  stateRecipentId: state.chatWindow.recipentId,
  stateSenderId: state.chatWindow.senderId
});

export default connect(mapStateToProps, {
  setChatUsers,
  updateUserState,
  addSingleMessage
})(Chat);
