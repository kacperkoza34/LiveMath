import React, { useState, useEffect, useRef } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Moment from "react-moment";
import styles from "./MessagesList.module.scss";

const MessagesList = ({
  messages,
  isFetching,
  senderId,
  recipentId,
  loadNewMessages
}) => {
  const messagesEndRef = useRef(null);
  const messagesView = useRef(null);
  const [isOnBottom, setBottom] = useState(false);
  const [displayDate, setDisplayDate] = useState(false);

  const scrollToBottom = () => {
    if (!displayDate)
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    if (!isFetching && !isOnBottom) {
      setBottom(true);
      scrollToBottom();
    }

    messagesView.current.onscroll = e => {
      if (e.srcElement.scrollTop === 0 && !isFetching)
        loadNewMessages({
          senderId,
          recipentId,
          messagesAmount: messages.length
        });
    };
  }, [
    isFetching,
    isOnBottom,
    loadNewMessages,
    messages.length,
    recipentId,
    scrollToBottom,
    senderId,
    setBottom
  ]);

  return (
    <div ref={messagesView} className={styles.root}>
      <div className={styles.messages}>
        {messages.length ? (
          messages.map(({ content, author, date }, key) => {
            return (
              <div
                onClick={() =>
                  setDisplayDate(state => (key + 1 === state ? true : key + 1))
                }
                key={key}
                className={
                  senderId == author
                    ? styles.self + " " + styles.message
                    : styles.message
                }
              >
                {displayDate === key + 1 && (
                  <div className={styles.date}>
                    <Moment format="YYYY/MM/DD HH:mm">{date}</Moment>{" "}
                  </div>
                )}
                {content}
              </div>
            );
          })
        ) : (
          <>Wyślij pierwszą wiadomość</>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesList;
