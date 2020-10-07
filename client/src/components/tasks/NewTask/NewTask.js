import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import BtnPrimary from "../../features/BtnPrimary/BtnPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./NewTask.module.scss";

const NewTask = () => {
  const [taskType, setTaskType] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [isModalVisible, setModalVisibily] = useState(false);

  if (taskType) return <Redirect push to={`/add/${taskType}`} />;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <BtnPrimary font={12} border={2} onClick={() => setModalVisibily(true)}>
          Stwórz zadanie
        </BtnPrimary>
        {isModalVisible && (
          <div className={styles.overlay}>
            <div className={styles.modal}>
              <div className={styles.header}>
                <h4>Wybierz rodzaj zadania</h4>
                <div
                  className={styles.exit}
                  onClick={() => setModalVisibily(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <BtnPrimary onClick={() => setTaskType("openTask")}>
                Zadanie otwarte
              </BtnPrimary>
              <BtnPrimary onClick={() => setTaskType("closeTask")}>
                Zadanie zamknięte
              </BtnPrimary>
              <BtnPrimary onClick={() => setTaskType("booleanTask")}>
                Zadanie prawda/fałsz
              </BtnPrimary>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewTask;
