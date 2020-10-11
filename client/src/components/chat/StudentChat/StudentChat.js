import React, { useState } from "react";
import ChatWindow from "../ChatWindow/ChatWindow";
import TeacherIcon from "./TeacherIcon";

const StudentChat = ({ teacher: { _id, name, active }, sendMessageSocket }) => {
  const [chatWindowActive, setChatWindow] = useState(false);
  const styles = chatWindowActive ? "0 50px" : "50px";
  const displayChat = () => {
    if (chatWindowActive)
      return (
        <ChatWindow
          toggleChat={setChatWindow}
          id={_id}
          name={name}
          active={active}
          sendMessageSocket={sendMessageSocket}
        />
      );
    else return <TeacherIcon toggleChat={setChatWindow} active={active} />;
  };
  return <div style={{ margin: styles }}>{displayChat()}</div>;
};

export default StudentChat;
