import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styles from "./NewTask.module.scss";

const NewTask = () => {
  const [taskType, setTaskType] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [valiadtionError, setError] = useState(false);

  const addTask = () => {
    if (taskType) setRedirect(true);
    else setError(true);
  };

  if (taskType && redirect) return <Redirect to={`/add/${taskType}`} />;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div>
          <button onClick={() => addTask()}>Dodaj zadanie</button>
          <select
            value={taskType}
            onChange={(e) => {
              setError(false);
              setTaskType(e.target.value);
            }}
          >
            <option value={""}>---</option>
            <option value={"openTask"}>Zadanie otwarte</option>
            <option value={"closeTask"}>Zadanie zamknięte</option>
            <option value={"booleanTask"}>Zadanie prawda fałsz</option>
          </select>
        </div>
        <div>
          {valiadtionError && (
            <div className={styles.warning}>Wybierz rodzaj zadania</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewTask;
