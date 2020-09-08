import React, { useState } from "react";
import PropTypes from "prop-types";
import Errors from "../../../../layout/Errors/Errors";
import BtnPrimary from "../../../../features/BtnPrimary/BtnPrimary";
import TextareaAutosize from "react-textarea-autosize";
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
  accountType
}) => {
  const [message, setMessage] = useState("");
  return (
    <div className={styles.root}>
      {resolved ? (
        <div>
          {toUpdate ? (
            <p className={styles.statusBox + " " + styles.toUpdate}>
              Zadanie wysłano do sprawdzenia
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
              {apiErrors && <Errors errors={apiErrors.data.err} />}
              {error.length > 0 && <div className={styles.error}>{error}</div>}
              <div className={styles.send}>
                <div>
                  <BtnPrimary
                    font={12}
                    border={2}
                    onClick={() => sendSolution(result, false, message)}
                  >
                    Prześlij rozwiązanie
                  </BtnPrimary>
                </div>
                <div>
                  <BtnPrimary
                    font={12}
                    border={2}
                    onClick={() => sendSolution(result, true, message)}
                  >
                    Wyślij prośbe o sprawdzenie
                  </BtnPrimary>
                </div>
              </div>
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
            <BtnPrimary
              font={12}
              border={2}
              onClick={() => setChekAnswers(true)}
            >
              Sprawdź odpowiedź
            </BtnPrimary>
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
  accountType: PropTypes.string.isRequired
};

export default SendSolution;
