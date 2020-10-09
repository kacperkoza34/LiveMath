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

  useEffect(() => {
    socket.emit("auth", { token });
    socket.on("message", ({ message }) => console.log(message));
    socket.on("error", ({ error }) => {
      socket.disconnect();
      setError(error);
    });

    if (isTeacher) {
      socket.emit("askAboutStudents", { token });
      socket.on("getStudents", data => setChatUsersList(data));
    } else {
      socket.emit("askAboutTeacher", { token });
      socket.on("getTeacher", data => setChatUsersList(data));
    }

    return () => socket.disconnect();
  }, []);

  const displayChatList = () => {
    if (chatUsersList) {
      if (accountType === "teacher") return <>nauczyciel</>;
      else return <StudentChat users={chatUsersList} />;
    } else return null;
  };

  return (
    <div className={styles.chat}>
      {error.length > 0 ? <div>{error}</div> : displayChatList()}
    </div>
  );
};

export default Chat;
