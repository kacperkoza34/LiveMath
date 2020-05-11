import React from "react";
import PropTypes from "prop-types";
import styles from "./Messages.module.scss";

const Messages = ({ messages }) => {
  return (
    <>
      {messages.length > 0 && (
        <div className={styles.root}>
          <>
            <h4>Dyskusja</h4>

            <ul>
              {messages.map(({ message, author }, index) => (
                <li key={index} className={styles.message}>
                  <h4>{author}</h4>
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
  messages: PropTypes.array.isRequired,
};

export default Messages;
