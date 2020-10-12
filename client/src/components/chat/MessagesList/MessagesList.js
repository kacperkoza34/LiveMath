import React, { useState, useEffect, useRef } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Moment from "react-moment";
import styles from "./MessagesList.module.scss";

const MessagesList = ({ messages, isFetching, senderId }) => {
  const messagesEndRef = useRef(null);
  const [displayDate, setDisplayDate] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    if (!isFetching) scrollToBottom();
  }, [isFetching, scrollToBottom]);

  return (
    <div className={styles.messages}>
      {messages.length ? (
        messages.map(({ content, author, date }, key) => {
          return (
            <div
              onClick={() =>
                setDisplayDate(state => (key === state ? true : key))
              }
              key={key}
              className={
                senderId == author
                  ? styles.self + " " + styles.message
                  : styles.message
              }
            >
              {displayDate === key && (
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
  );
};

export default MessagesList;
