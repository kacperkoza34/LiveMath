import React from "react";
import PropTypes from "prop-types";
import styles from "./TaskTypeBox.module.scss";
import { connect } from "react-redux";

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
