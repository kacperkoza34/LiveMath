import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./TeacherIcon.module.scss";

const TeacherIcon = props => {
  return (
    <div {...props} className={styles.root}>
      <FontAwesomeIcon
        className={props.newMessages ? styles.newMessages : undefined}
        icon={faUser}
      />
      <span className={props.active ? styles.active : styles.disactive}></span>
    </div>
  );
};

export default TeacherIcon;
