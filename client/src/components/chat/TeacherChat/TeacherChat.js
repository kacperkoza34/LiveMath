import React, { useState } from "react";
import ChatWindow from "../ChatWindow/ChatWindow";
import styles from "./TeacherChat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setSenderAndRecipent } from "../../../redux/actions/chat";
import { connect } from "react-redux";
import {
  faAngleDown,
  faAngleUp,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const TeacherChat = ({
  users,
  sendMessageSocket,
  senderId,
  setSenderAndRecipent,
  stateRecipentId,
  stateSenderId
}) => {
  const [selectedUserName, setSelectedUserName] = useState("");
  const [displayList, setDisplayList] = useState(false);

  const compareActive = (a, b) => {
    return a.active === b.active ? 0 : a.active ? -1 : 1;
  };

  const compareNewMessages = (a, b) => {
    return a.newMessages === b.newMessages ? 0 : a.newMessages ? -1 : 1;
  };

  const sortUsers = array => {
    return array.sort(compareActive).sort(compareNewMessages);
  };

  const displayMessageIcon = () => {
    const display = users.some(({ newMessages }) => newMessages === true);
    if (display)
      return (
        <FontAwesomeIcon
          className={display && styles.newMessage}
          icon={faEnvelope}
        />
      );
  };

  const displayChatList = () => {
    return (
      <div className={styles.root}>
        <div
          onClick={() => setDisplayList(state => !state)}
          className={styles.header}
        >
          <div className={styles.title}>
            <h3>Chat </h3>
            {displayMessageIcon()}
          </div>{" "}
          {displayList ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleUp} />
          )}
        </div>
        {displayList && (
          <ul>
            {sortUsers(users).map(({ name, _id, active, newMessages }) => {
              return (
                <li
                  key={_id}
                  onClick={() => {
                    setSelectedUserName(name);
                    setSenderAndRecipent({ recipentId: _id, senderId });
                  }}
                >
                  <span
                    className={active ? styles.active : styles.disactive}
                  ></span>
                  {name}
                  {newMessages && (
                    <FontAwesomeIcon
                      className={newMessages ? styles.newMessage : undefined}
                      icon={faEnvelope}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      {stateRecipentId && stateSenderId ? (
        <ChatWindow
          name={selectedUserName}
          sendMessageSocket={sendMessageSocket}
          marginLeft={"0"}
          closeChat={setSenderAndRecipent}
        />
      ) : (
        displayChatList()
      )}
    </>
  );
};
const mapStateToProps = state => ({
  stateRecipentId: state.chat.currentChat.recipentId,
  stateSenderId: state.chat.currentChat.senderId
});
export default connect(mapStateToProps, { setSenderAndRecipent })(TeacherChat);
