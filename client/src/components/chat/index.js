import React, { useEffect, useState } from "react";
import StudentChat from "./StudentChat/StudentChat";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import styles from "./index.module.scss";

const Chat = ({ token, id, accountType }) => {
  const [error, setError] = useState("");
  const [chatUsersList, setChatUsersList] = useState(null);

  const PORT =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

  const socket = socketIOClient(PORT);
  const isTeacher = accountType == "teacher";
  const sendMessageSocket = (message, recipentId, senderId) => {
    socket.emit("message", { message, recipentId, senderId });
  };

  const updateChatUsersList = (newStatus, _id) => {
    setChatUsersList(state =>
      state.map(item => {
        if (item._id == _id) item.active = newStatus;
        return item;
      })
    );
  };

  useEffect(() => {
    socket.emit("auth", { token });
    socket.on("authSuccess", ({ users }) => {
      setChatUsersList(users);
      socket.on("markAsNotActive", ({ _id }) => {
        updateChatUsersList(false, _id);
      });
      socket.on("markAsActive", ({ _id }) => {
        updateChatUsersList(true, _id);
      });
    });

    socket.on("error", ({ error }) => {
      socket.disconnect();
      setError(error);
    });

    socket.on("message", ({ message }) => console.log(message));

    return () => socket.disconnect();
  }, []);

  const displayChatList = () => {
    if (chatUsersList) {
      if (accountType === "teacher") return <>nauczyciel</>;
      else
        return (
          <StudentChat
            users={chatUsersList[0]}
            sendMessageSocket={sendMessageSocket}
          />
        );
    } else return null;
  };

  return (
    <div className={styles.chat}>
      {error.length > 0 ? <div>{error}</div> : displayChatList()}
    </div>
  );
};

export default Chat;
