import React from "react";
import PropTypes from "prop-types";

const Messages = ({ messages }) => {
  return (
    <div>
      {messages.length > 0 && (
        <>
          <h4>Informacje od nauczyciela</h4>

          <ul>
            {messages.map((message) => (
              <li>{message}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Messages;
