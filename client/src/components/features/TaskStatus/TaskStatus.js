import React from "react";
import styles from "./TaskStatus.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faCalendarDay,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";

const TaskStatus = ({ deadLine, resolved, description, toUpdate }) => {
  const displayStatus = () => {
    if (Date.parse(deadLine) < Date.now() && !resolved)
      return (
        <div className={styles.fail}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
      );
    if (Date.parse(deadLine) > Date.now() && !resolved)
      return (
        <div className={styles.toDo}>
          <FontAwesomeIcon icon={faCalendarDay} />
        </div>
      );
    if (resolved && toUpdate)
      return (
        <div className={styles.toCheck}>
          <FontAwesomeIcon icon={faQuestion} />
        </div>
      );
    if (resolved)
      return (
        <div className={styles.succes}>
          <a href={description} rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon icon={faCheckCircle} />
          </a>
        </div>
      );
  };
  return <div className={styles.root}>{displayStatus()}</div>;
};

export default TaskStatus;
