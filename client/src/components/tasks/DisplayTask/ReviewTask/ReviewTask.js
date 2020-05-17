import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ReviewTask.module.scss";
import Help from "../../../features/Help/Help";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";

const ReviewTask = ({
  taskId,
  studentId,
  reduxAction,
  dispatch,
  correctAnswer,
  correctAnswers,
  studentAnswers,
}) => {
  const [message, setMessage] = useState("");
  const [accept, setAccept] = useState(false);

  const send = (e) => {
    e.preventDefault();
    reduxAction({
      message,
      student_id: studentId,
      task_id: taskId,
    });
  };
  return (
    <div className={styles.root}>
      <form onSubmit={(e) => send(e)}>
        <div className={styles.spaceBetween}>
          <h4>Panel sprawdzający</h4>
          <Help id={3} title={"Dowiedz się więcej"} />
        </div>
        {correctAnswer ? (
          <h5>Poprawna odpowiedź: {correctAnswer}</h5>
        ) : (
          <>
            <h5>Poprawne odpowiedzi: </h5>
            <ul>
              {correctAnswers.map(({ answer }, index) => (
                <li
                  className={
                    answer === studentAnswers[index]
                      ? styles.succesBgColor
                      : styles.failBgColor
                  }
                  key={index}
                >{`${index + 1}.  Poprawna: ${answer} , uczeń: ${
                  studentAnswers[index]
                }`}</li>
              ))}
            </ul>
          </>
        )}
        <h5>Dodaj wiadomość:</h5>
        <TextareaAutosize
          required
          maxcols="15"
          mincols="5"
          maxrows="15"
          minrows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Potwierdź</button>
      </form>
    </div>
  );
};

ReviewTask.propTypes = {
  taskId: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  reduxAction: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  correctAnswer: PropTypes.object.isRequired,
  correctAnswers: PropTypes.object.isRequired,
};

export default connect()(ReviewTask);
