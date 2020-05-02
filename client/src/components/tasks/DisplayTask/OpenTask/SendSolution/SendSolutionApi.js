import React, { useState } from "react";
import PropTypes from "prop-types";

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
    <div>
      {resolved ? (
        <>
          {toUpdate ? (
            <>Zadanie wysłano do weryfikacji</>
          ) : (
            <>Zadanie rozwiazane</>
          )}
        </>
      ) : (
        <>
          {checkAnswer && (
            <>
              {error.length > 0 && <div>{error}</div>}
              {correctAnswer == answer ? (
                <div>
                  <p>Dobra odpowiedź</p>
                  <button onClick={() => sendSolution()}>
                    Prześlij rozwiązanie
                  </button>
                </div>
              ) : (
                <div>
                  <p>Zła odpowiedź</p>
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

export default SendSolutionApi;
