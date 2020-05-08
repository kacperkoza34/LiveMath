import React from "react";
import PropTypes from "prop-types";
import Errors from "../../../../layout/Errors/Errors";
import styles from "./SendSolution.module.scss";

const SendSolution = ({
  result,
  taskStatus,
  answers,
  description,
  sendSolution,
  resolved,
  error,
  apiErrors,
  toUpdate,
  checkAnswers,
  setChekAnswers,
  accountType,
}) => {
  return (
    <div className={styles.root}>
      {resolved ? (
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
      ) : (
        <>
          {!toUpdate && accountType === "student" && checkAnswers ? (
            <>
              {apiErrors && <Errors errors={apiErrors.data.err} />}
              {error.length > 0 && <div className={styles.error}>{error}</div>}
              {Object.keys(answers).length === result ? (
                <div>
                  <p className={styles.success}>Dobra odpowiedź</p>
                  <button onClick={() => sendSolution(result)}>
                    Prześlij rozwiązanie
                  </button>
                </div>
              ) : (
                <div className={styles.send}>
                  <div>
                    <button onClick={() => sendSolution(result)}>
                      Prześlij
                    </button>
                  </div>
                  <div>
                    <button onClick={() => sendSolution(result, true)}>
                      Wyślij prośbe o weryfikacje
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </>
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

SendSolution.propTypes = {
  result: PropTypes.number.isRequired,
  taskStatus: PropTypes.object,
  answers: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  sendSolution: PropTypes.func.isRequired,
  resolved: PropTypes.bool.isRequired,
  error: PropTypes.any.isRequired,
  toUpdate: PropTypes.bool.isRequired,
  checkAnswers: PropTypes.bool.isRequired,
  setChekAnswers: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired,
};

export default SendSolution;