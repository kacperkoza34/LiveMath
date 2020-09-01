import React from "react";
import PropTypes from "prop-types";
import BtnPrimary from "../../../../features/BtnPrimary/BtnPrimary";

const SendSolutionDumm = ({ checkAnswer, answer, correctAnswer, check }) => {
  return (
    <div>
      {checkAnswer ? (
        correctAnswer === answer ? (
          "Brawo!"
        ) : (
          "Pomyśl o tym jeszcze raz"
        )
      ) : (
        <BtnPrimary font={12} border={2} onClick={() => check(true)}>
          Dodaj odpowiedz!
        </BtnPrimary>
      )}
    </div>
  );
};

SendSolutionDumm.propTypes = {
  checkAnswer: PropTypes.bool.isRequired,
  answer: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string,
  check: PropTypes.func.isRequired
};

export default SendSolutionDumm;
