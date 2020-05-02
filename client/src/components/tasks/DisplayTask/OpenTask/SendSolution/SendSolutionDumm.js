import React from "react";
import PropTypes from "prop-types";

const SendSolutionDumm = ({ checkAnswer, answer, correctAnswer, check }) => {
  return (
    <div>
      {checkAnswer ? (
        correctAnswer == answer ? (
          "Brawo!"
        ) : (
          "Pomyśl o tym jeszcze raz"
        )
      ) : (
        <button onClick={() => check(true)}>Dodaj odpowiedz!</button>
      )}
    </div>
  );
};

export default SendSolutionDumm;
