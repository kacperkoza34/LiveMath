import React, { useState } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { reviewCloseTask } from "../../../../../redux/actions/resolveTask";

const ReviewTask = ({ taskId, studentId, reviewCloseTask, correctAnswer }) => {
  const [message, setMessage] = useState("");
  const [accept, setAccept] = useState(false);

  const send = (e) => {
    e.preventDefault();
    reviewCloseTask({
      message,
      accept,
      student_id: studentId,
      task_id: taskId,
    });
  };
  return (
    <div>
      <form onSubmit={(e) => send(e)}>
        <h4>Panel weryfikacyjny</h4>
        <h5>Poprawna odpowiedź: {correctAnswer}</h5>
        <h5>Dodaj wiadomość:</h5>
        <TextareaAutosize
          required
          maxCols="15"
          minCols="5"
          maxRows="15"
          minRows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <h4>Wybierz status</h4>
        <select
          value={accept}
          onChange={(e) => {
            setAccept(e.target.value === "true" ? true : false);
          }}
        >
          <option value={false}>Do poprawy</option>
          <option value={true}>Rozwiązane</option>
        </select>
        <button>Potwierdź</button>
      </form>
    </div>
  );
};

export default connect(null, { reviewCloseTask })(ReviewTask);
