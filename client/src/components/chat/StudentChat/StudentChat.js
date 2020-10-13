import React, { useState } from "react";
import ChatWindow from "../ChatWindow/ChatWindow";
import TeacherIcon from "./TeacherIcon";
import { setSenderAndRecipent } from "../../../redux/actions/chatWindow";
import { connect } from "react-redux";

const StudentChat = ({
  users: { _id: recipentId, name, active, newMessages },
  senderId,
  sendMessageSocket,
  stateRecipentId,
  stateSenderId,
  setSenderAndRecipent
}) => {
  const displayChat = () => {
    if (stateRecipentId && stateSenderId)
      return (
        <ChatWindow
          name={name}
          sendMessageSocket={sendMessageSocket}
          marginLeft={"50px"}
          closeChat={setSenderAndRecipent}
        />
      );
    else
      return (
        <TeacherIcon
          newMessages={newMessages}
          onClick={() => setSenderAndRecipent({ recipentId, senderId })}
          active={active}
        />
      );
  };
  return <div>{displayChat()}</div>;
};

const mapStateToProps = state => ({
  stateRecipentId: state.chatWindow.recipentId,
  stateSenderId: state.chatWindow.senderId
});

export default connect(mapStateToProps, { setSenderAndRecipent })(StudentChat);
