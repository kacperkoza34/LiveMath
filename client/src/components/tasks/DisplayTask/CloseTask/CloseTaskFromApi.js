import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./CloseTask.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import MathJax from "../../MathJax";
import SendSolution from "./SendSolution/SendSolution";
import TextareaAutosize from "react-textarea-autosize";
import LinkBlank from "../../../features/LinkBlank/LinkBlank";
import ReviewTask from "../ReviewTask/ReviewTask";
import Messages from "../Messages/Messages";
import { connect } from "react-redux";
import { getCloseTask, setTaskConfig } from "../../../../redux/actions/tasks";
import {
  updateDescription,
  updateAnswer,
  sendCloseTaskResolution,
  reviewCloseTask,
} from "../../../../redux/actions/resolveTask";

const CloseTaskFromApi = ({
  match,
  getCloseTask,
  accountType,
  setTaskConfig,
  updateDescription,
  updateAnswer,
  sendCloseTaskResolution,
  student,
  reviewCloseTask,
  tasks: { data, isFetching, errors, taskConfig },
}) => {
  useEffect(() => {
    getCloseTask(match.params.id);
    return () => setTaskConfig({});
  }, [getCloseTask, setTaskConfig, match.params.id]);

  const {
    answer,
    description,
    descriptionRequired,
    resolved,
    toUpdate,
    _id,
    messages,
  } = taskConfig;

  const answers = {};
  const [taskStatus, setTaskStatus] = useState(null);
  const [checkAnswers, setChekAnswers] = useState(false);
  const [error, setError] = useState("");

  const prepareState = () => {
    data.data.forEach((item, i) => {
      answers[`${i}`] = answer[i];
    });
    setTaskStatus({ ...answers });
  };

  const onChange = (e) => {
    setChekAnswers(false);
    setTaskStatus({ ...taskStatus, [e.target.name]: e.target.value });
    updateAnswer({ ...taskStatus, [e.target.name]: e.target.value });
  };

  let result = 0;

  const displayResult = () => {
    result = 0;
    data.data.forEach(({ answer }, i) => answer === taskStatus[i] && result++);
    return `Wynik: ${result}/${Object.keys(taskStatus).length}`;
  };

  const sendSolution = (result, toUpdate = false, message) => {
    if (descriptionRequired && !description.length)
      setError("Wymagane zdjęcie!");
    else {
      if (toUpdate)
        sendCloseTaskResolution({ ...taskConfig, toUpdate, result, message });
      else
        sendCloseTaskResolution({ ...taskConfig, toUpdate, result, message });
    }
  };

  return (
    <div>
      {isFetching ? (
        <BeatLoader size={20} />
      ) : (
        <>
          <div
            className={
              accountType === "teacher" || resolved ? styles.overlay : ""
            }
          >
            {" "}
            {taskStatus === null && prepareState()}
            <div className={styles.header}>
              <div>
                <h4>{data.name}</h4>
                <p>{data.content}</p>
              </div>
              <p className={styles.points}>Punkty: {data.points}</p>
            </div>
            {taskStatus && (
              <ul>
                {data.data.map(({ content, answer: correctAnswer }, i) => (
                  <li
                    key={i}
                    className={
                      checkAnswers || resolved
                        ? answer[`${i}`] === correctAnswer
                          ? [styles.listElement, styles.succesBgColor].join(" ")
                          : [styles.listElement, styles.failBgColor].join(" ")
                        : styles.listElement
                    }
                  >
                    <div className={styles.order}>
                      {`${i + 1})`}
                      <div style={{ marginLeft: "5px" }}>
                        <MathJax content={"`" + content + "`"} />
                      </div>
                    </div>
                    Podaj odpowiedz:
                    <div className={styles.item}>
                      <input
                        autoComplete="off"
                        name={`${i}`}
                        value={answer[`${i}`]}
                        onChange={(e) => onChange(e)}
                      ></input>
                      <div>
                        <span>Twoja odpowiedz:</span>
                        <div className={styles.result}>
                          <MathJax content={"`" + answer[`${i}`] + "`"} />
                        </div>
                      </div>
                      {checkAnswers &&
                        (answer[`${i}`] === correctAnswer ? (
                          <div className={styles.success}>Ok</div>
                        ) : (
                          <div className={styles.fail}>Źle</div>
                        ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.description}>
              <h4>Link do zdjęcia</h4>
              <TextareaAutosize
                maxcols="15"
                mincols="5"
                value={description}
                onChange={(e) => updateDescription(e.target.value)}
              ></TextareaAutosize>
            </div>
            {checkAnswers && displayResult()}
            <SendSolution
              setChekAnswers={setChekAnswers}
              checkAnswers={checkAnswers}
              displayResult={displayResult}
              sendSolution={sendSolution}
              resolved={resolved}
              error={error}
              apiErrors={errors}
              toUpdate={toUpdate}
              result={result}
              answers={answer}
              description={description}
              accountType={accountType}
            />
          </div>
          {description.length > 0 && <LinkBlank url={description} />}
          {accountType === "teacher" && toUpdate ? (
            <ReviewTask
              correctAnswers={data.data}
              studentAnswers={answer}
              taskId={_id}
              studentId={student}
              reduxAction={reviewCloseTask}
            />
          ) : (
            ""
          )}
          <Messages messages={messages} />
        </>
      )}
    </div>
  );
};

CloseTaskFromApi.propTypes = {
  match: PropTypes.object.isRequired,
  getCloseTask: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired,
  setTaskConfig: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  sendCloseTaskResolution: PropTypes.func.isRequired,
  student: PropTypes.string.isRequired,
  reviewCloseTask: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  accountType: state.user.data.accountType,
  student: state.student.data._id,
});

export default connect(mapStateToProps, {
  getCloseTask,
  setTaskConfig,
  updateDescription,
  updateAnswer,
  sendCloseTaskResolution,
  reviewCloseTask,
})(CloseTaskFromApi);
