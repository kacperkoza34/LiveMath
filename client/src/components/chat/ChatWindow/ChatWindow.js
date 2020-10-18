import React, { useState, useEffect } from "react";
import MessagesList from "../MessagesList/MessagesList";
import BeatLoader from "react-spinners/BeatLoader";
import Moment from "react-moment";
import styles from "./ChatWindow.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { updateUserState } from "../../../redux/actions/chatUsers";
import { loadNewMessages } from "../../../redux/actions/chatWindow";

const ChatWindow = ({
  name,
  sendMessageSocket,
  accountType,
  chatWindow,
  marginLeft,
  closeChat,
  updateUserState,
  loadNewMessages
}) => {
  const { senderId, recipentId, messages, isFetching } = chatWindow;
  const [message, setMessage] = useState("");

  useEffect(() => {
    updateUserState({ _id: recipentId, newState: false, param: "newMessages" });
  }, [isFetching, recipentId, updateUserState]);

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      setMessage("");
      sendMessageSocket(message, recipentId, senderId, accountType);
    }
  };

  const displayMessagesList = () =>{
    if(isFetching) return <BeatLoader size={10} />;
    else return <MessagesList
        messages={messages}
        isFetching={isFetching}
        senderId={senderId}
        recipentId={recipentId}
        loadNewMessages={loadNewMessages}
        detectTyping={message}
      />
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
        {displayMessagesList()}
      </div>

      <div className={styles.sendBox}>
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Wiadomość"
            name="message"
            autoComplete="off"
          />
          <button>Wyślij</button>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  chatWindow: state.chatWindow,
  accountType: state.user.data.accountType
});
export default connect(mapStateToProps, { updateUserState, loadNewMessages })(
  ChatWindow
);
