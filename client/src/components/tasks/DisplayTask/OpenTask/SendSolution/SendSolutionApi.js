import React, { useState } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-textarea-autosize";
import BtnPrimary from "../../../../features/BtnPrimary/BtnPrimary";
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
  toUpdate
}) => {
  const [message, setMessage] = useState("");
  return (
    <div className={styles.root}>
      {resolved ? (
        <>
          {toUpdate ? (
            <p className={styles.statusBox + " " + styles.toUpdate}>
              Zadanie wysłano do sprawdzenia
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
              <h4>Wiadomość do nauczyciela:</h4>
              <TextareaAutosize
                required
                maxcols="15"
                mincols="5"
                maxrows="15"
                minrows="5"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              {error.length > 0 && <div className={styles.error}>{error}</div>}
              {correctAnswer === answer ? (
                <div>
                  <p className={styles.statusBox + " " + styles.success}>
                    Dobra odpowiedź
                  </p>
                  <BtnPrimary
                    font={12}
                    border={2}
                    onClick={() => sendSolution(false, message)}
                  >
                    Prześlij rozwiązanie
                  </BtnPrimary>
                </div>
              ) : (
                <div>
                  <p className={styles.error}>Zła odpowiedź</p>
                  <BtnPrimary
                    font={12}
                    border={2}
                    onClick={() => sendSolution(true, message)}
                  >
                    Prześlij z prośbą o sprawdzenie
                  </BtnPrimary>
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
            <BtnPrimary font={12} border={2} onClick={() => check(true)}>
              Sprawdź odpowiedź
            </BtnPrimary>
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
  accountType: PropTypes.string
};

export default SendSolutionApi;
