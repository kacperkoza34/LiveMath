import React from "react";
import styles from "./TaskStatus.module.scss";

const TaskStatus = ({ deadLine, resolved, description, toUpdate }) => {
  if (Date.parse(deadLine) < Date.now() && !resolved)
    return (
      <div className={styles.statusBox + " " + styles.failed}>Niewykonane</div>
    );
  if (Date.parse(deadLine) > Date.now() && !resolved)
    return (
      <div className={styles.statusBox + " " + styles.toDo}>Do wykonania</div>
    );
  if (resolved && toUpdate)
    return (
      <div className={styles.statusBox + " " + styles.toUpdate}>
        Do sprawdzenia
      </div>
    );
  if (resolved)
    return (
      <div className={styles.statusBox + " " + styles.success}>
        <a href={description} rel="noopener noreferrer" target="_blank">
          Rozwiązane
        </a>
      </div>
    );
};

export default TaskStatus;
