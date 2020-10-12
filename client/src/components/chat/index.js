import React, { useEffect, useState } from "react";
import StudentChat from "./StudentChat/StudentChat";
import TeacherChat from "./TeacherChat/TeacherChat";
import socketIOClient from "socket.io-client";
import {
  setChatUsers,
  updateUserState,
  chatError
} from "../../redux/actions/chat";
import { connect } from "react-redux";
import styles from "./index.module.scss";

const Chat = ({
  token,
  id,
  accountType,
  chatUsers,
  setChatUsers,
  updateUserState
}) => {
  const { data, isFetching, isError } = chatUsers;

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
      setChatUsers(users, id);
      socket.on("markAsNotActive", ({ _id }) => {
        updateUserState(_id);
      });
      socket.on("markAsActive", ({ _id }) => {
        updateUserState(_id);
      });
    });

    socket.on("error", ({ error }) => {
      socket.disconnect();
      chatError();
    });

    socket.on("message", ({ message }) => console.log(message));

    return () => socket.disconnect();
  }, []);

  const displayChatList = () => {
    if (data.length) {
      if (accountType === "teacher")
        return (
          <TeacherChat users={data} sendMessageSocket={sendMessageSocket} />
        );
      else {
        return (
          <StudentChat users={data[0]} sendMessageSocket={sendMessageSocket} />
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
  chatUsers: state.chat.chatUsers,
  isWindowChatOpen: !!state.chat.currentChat.senderId
});

export default connect(mapStateToProps, { setChatUsers, updateUserState })(
  Chat
);
