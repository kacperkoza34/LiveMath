import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./TeacherIcon.module.scss";

const TeacherIcon = ({ active, toggleChat }) => {
  return (
    <div onClick={() => toggleChat(true)} className={styles.root}>
      <FontAwesomeIcon icon={faUser} />
      <span className={active ? styles.active : styles.disactive}></span>
    </div>
  );
};

export default TeacherIcon;
