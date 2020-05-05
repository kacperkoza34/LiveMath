import React from "react";
import PropTypes from "prop-types";
import styles from "./SendSolution.module.scss";

const SendSolutionApi = ({
  checkAnswer,
  answer,
  correctAnswer,
  error,
  resolved,
  accountType,
  check,
  sendSolution,
  toUpdate,
}) => {
  return (
    <div className={styles.root}>
      {resolved ? (
        <>
          {toUpdate ? (
            <p className={styles.statusBox + " " + styles.toUpdate}>
              Zadanie wysłano do weryfikacji
            </p>
          ) : (
            <p className={styles.statusBox + " " + styles.success}>
              Zadanie rozwiazane
            </p>
          )}
        </>
      ) : (
        <>
          {checkAnswer && (
            <>
              {error.length > 0 && <div className={styles.error}>{error}</div>}
              {correctAnswer === answer ? (
                <div>
                  <p className={styles.statusBox + " " + styles.success}>
                    Dobra odpowiedź
                  </p>
                  <button onClick={() => sendSolution()}>
                    Prześlij rozwiązanie
                  </button>
                </div>
              ) : (
                <div>
                  <p className={styles.error}>Zła odpowiedź</p>
                  <button onClick={() => sendSolution(true)}>
                    Prześlij z prośbą o weryfikacje
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
      {!resolved && (
        <>
          {" "}
          {!checkAnswer && (
            <button onClick={() => check(true)}>Sprawdź odpowiedź</button>
          )}
        </>
      )}
    </div>
  );
};

SendSolutionApi.propTypes = {
  checkAnswer: PropTypes.bool.isRequired,
  answers: PropTypes.object,
  sendSolution: PropTypes.func.isRequired,
  resolved: PropTypes.bool.isRequired,
  error: PropTypes.any.isRequired,
  check: PropTypes.func.isRequired,
  accountType: PropTypes.string,
};

export default SendSolutionApi;
