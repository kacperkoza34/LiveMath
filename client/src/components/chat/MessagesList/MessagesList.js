import React, { useState, useEffect, useRef, useCallback } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Moment from "react-moment";
import styles from "./MessagesList.module.scss";

const MessagesList = ({
  messages,
  isFetching,
  senderId,
  recipentId,
  loadNewMessages,
  detectTyping
}) => {
  const messagesEndRef = useRef(null);
  const messagesView = useRef(null);
  const [isOnBottom, setBottom] = useState(true);
  const [displayDateIndex, setDisplayDate] = useState(false);

  const scrollToBottom = () => {
    if (messages.length <= 12)
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  const displayDate = key => {
    setDisplayDate(state => (key + 1 === state ? true : key + 1));
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  }, [detectTyping]);

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
    return () => setBottom(state =>true);
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
        {messages.length > 0  &&  messages.map(({ content, author, date }, i) => {
          if(author === 'chatBoot') return <div className={styles.chatBoot}>{content}</div>
          else return (
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
          })
        }
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesList;
