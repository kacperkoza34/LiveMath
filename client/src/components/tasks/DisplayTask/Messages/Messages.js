import React from "react";
import PropTypes from "prop-types";
import styles from "./Messages.module.scss";

const Messages = ({ messages }) => {
  return (
    <>
      {messages.length > 0 && (
        <div className={styles.root}>
          <>
            <h4 className={styles.title}>Dyskusja</h4>

            <ul>
              {messages.map(({ message, author }, index) => (
                <li key={index} className={styles.message}>
                  <div className={styles.spaceBetween}>
                    <h4>{author}</h4>
                    <p>{"2018-212-12"}</p>
                  </div>
                  <pre>{message}</pre>
                </li>
              ))}
            </ul>
          </>
        </div>
      )}
    </>
  );
};

Messages.propTypes = {
  messages: PropTypes.array.isRequired
};

export default Messages;
