import React, { useState } from "react";
import styles from "./ChatWindow.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const ChatWindow = ({
  id,
  name,
  active,
  toggleChat,
  sendMessageSocket,
  senderId
}) => {
  const [message, setMessage] = useState("");

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      setMessage("");
      sendMessageSocket(message, id, senderId);
    }
  };
  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <div>{name}</div>
        <div className={styles.exit} onClick={() => toggleChat(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>

      <div className={styles.messagesBox}>
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
  senderId: state.user.data._id
});
export default connect(mapStateToProps)(ChatWindow);
