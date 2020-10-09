import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./StudentChat.module.scss";

const StudentChat = ({ users }) => {
  return (
    <div className={styles.root}>
      <FontAwesomeIcon icon={faUser} />
      <span className={users.active ? styles.active : styles.disactive}></span>
    </div>
  );
};

export default StudentChat;
