import React from "react";
import PropTypes from "prop-types";
import styles from "./SendSolution.module.scss";

const SendSolution = ({
  result,
  taskStatus,
  answers,
  description,
  sendSolution,
  resolved,
  error,
  toUpdate,
  checkAnswers,
  setChekAnswers,
  accountType,
}) => {
  return (
    <div className={styles.root}>
      {resolved && (
        <div>
          {toUpdate ? (
            <p className={styles.statusBox + " " + styles.toUpdate}>
              Zadanie wysłano do weryfikacji
            </p>
          ) : (
            <>
              <p className={styles.statusBox + " " + styles.success}>
                Zadanie rozwiazane
              </p>
            </>
          )}
        </div>
      )}
      {accountType === "student" && checkAnswers ? (
        <>
          {error.length > 0 && <div className={styles.error}>{error}</div>}
          {Object.keys(answers).length == result ? (
            <div>
              <p className={styles.success}>Dobra odpowiedź</p>
              <button onClick={() => sendSolution()}>
                Prześlij rozwiązanie
              </button>
            </div>
          ) : (
            <div>
              <button onClick={() => sendSolution(result)}>Prześlij</button>
              <button onClick={() => sendSolution(result, true)}>
                Wyślij prośbe o weryfikacje
              </button>
            </div>
          )}
        </>
      ) : (
        ""
      )}
      {!resolved && (
        <>
          {" "}
          {!checkAnswers && (
            <button onClick={() => setChekAnswers(true)}>
              Sprawdź odpowiedź
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SendSolution;
