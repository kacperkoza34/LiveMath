import React from "react";
import styles from "./TaskTypeBox.module.scss";

const TaskTypeBox = () => {
  return (
    <div className={styles.root}>
      <span>
        <div className={styles.box + " " + styles.taskOpen} />{" "}
        {" - zd. otwarte"}
      </span>
      <span>
        <div className={styles.box + " " + styles.taskClose} />
        {" - zd. zamknięte"}
      </span>
      <span>
        <div className={styles.box + " " + styles.taskBoolean} />
        {" - zd. prawda fałsz"}
      </span>
    </div>
  );
};

export default TaskTypeBox;
