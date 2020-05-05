import React from "react";
import styles from "./TaskTypeBox.module.scss";

const TaskTypeBox = () => {
  return (
    <div className={styles.root}>
      <span>
        <div className={styles.box + " " + styles.openTask} />{" "}
        {" - zd. otwarte"}
      </span>
      <span>
        <div className={styles.box + " " + styles.closeTask} />
        {" - zd. zamknięte"}
      </span>
      <span>
        <div className={styles.box + " " + styles.booleanTask} />
        {" - zd. prawda fałsz"}
      </span>
    </div>
  );
};

export default TaskTypeBox;
