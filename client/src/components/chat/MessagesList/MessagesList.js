import React, { useState, useEffect, useRef, useCallback } from "react";
import Moment from "react-moment";
import BeatLoader from "react-spinners/BeatLoader";
import { scrollDown } from "../../../redux/actions/chatWindow";
import { connect } from "react-redux";
import styles from "./MessagesList.module.scss";

const MessagesList = ({
  messages,
  isFetching,
  senderId,
  recipentId,
  loadNewMessages,
  scrollDown,
  shouldScrollDown,
  loadingNewMessages
}) => {
  const messagesEndRef = useRef(null);
  const messagesView = useRef(null);
  const [displayDateIndex, setDisplayDate] = useState(false);

  const scrollToBottom = () => {
    if (messages.length <= 12)
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  const displayDate = key => {
    setDisplayDate(state => (key + 1 === state ? true : key + 1));
  };

  useEffect(() => {
    if (shouldScrollDown) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
      scrollDown(false);
    }
  }, [scrollDown, shouldScrollDown]);

  useEffect(() => {
    if (!isFetching) scrollToBottom();

    messagesView.current.onscroll = e => {
      if (e.srcElement.scrollTop === 0 && !isFetching) {
        loadNewMessages({
          senderId,
          recipentId,
          messagesAmount: messages.length
        });
      }
    };
  }, [
    isFetching,
    loadNewMessages,
    messages.length,
    recipentId,
    scrollToBottom,
    senderId
  ]);

  return (
    <div ref={messagesView} className={styles.root}>
      <div className={styles.messages}>
        {loadingNewMessages && <BeatLoader size={10} />}
        {messages.length > 0 &&
          messages.map(({ content, author, date }, i) => {
            if (author === "chatBoot")
              return <div className={styles.chatBoot}>{content}</div>;
            else
              return (
                <div
                  onClick={() => displayDate(i)}
                  key={i}
                  className={
                    senderId == author
                      ? styles.self + " " + styles.message
                      : styles.message
                  }
                >
                  {displayDateIndex === i + 1 && (
                    <div className={styles.date}>
                      <Moment format="YYYY/MM/DD HH:mm">{date}</Moment>{" "}
                    </div>
                  )}
                  {content}
                </div>
              );
          })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  shouldScrollDown: state.chatWindow.scrollDown,
  loadingNewMessages: state.chatWindow.loadingNewMessages
});

export default connect(mapStateToProps, { scrollDown })(MessagesList);
