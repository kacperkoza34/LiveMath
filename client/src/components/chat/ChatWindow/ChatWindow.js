import React, { useState } from "react";
import MessagesList from "../MessagesList/MessagesList";
import BeatLoader from "react-spinners/BeatLoader";
import Moment from "react-moment";
import styles from "./ChatWindow.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const ChatWindow = ({
  name,
  sendMessageSocket,
  accountType,
  currentChat,
  marginLeft,
  closeChat
}) => {
  const { senderId, recipentId, messages, isFetching } = currentChat;

  const [message, setMessage] = useState("");

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      setMessage("");
      sendMessageSocket(message, recipentId, senderId, accountType);
    }
  };
  return (
    <div style={{ marginLeft: marginLeft }} className={styles.root}>
      <div className={styles.topBar}>
        <div>{name}</div>
        <div
          onClick={() => closeChat({ recipentId: "", senderId: "" })}
          className={styles.exit}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className={styles.messagesBox}>
        {isFetching ? (
          <BeatLoader size={10} />
        ) : (
          <MessagesList
            messages={messages}
            isFetching={isFetching}
            senderId={senderId}
          />
        )}

        <div className={styles.sendBox}>
          <form onSubmit={sendMessage}>
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Wiadomość"
              name="message"
            />
            <button>Wyślij</button>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  currentChat: state.chat.currentChat,
  accountType: state.user.data.accountType
});
export default connect(mapStateToProps)(ChatWindow);
