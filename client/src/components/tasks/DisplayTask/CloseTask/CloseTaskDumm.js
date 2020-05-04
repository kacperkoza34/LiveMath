import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./CloseTask.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import MathJax from "../../MathJax";
import AddTaskToClass from "../../AddTaskToClass/AddTaskToClass/AddTaskToClass";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { getCloseTask, setTaskConfig } from "../../../../redux/actions/tasks";

const CloseTaskDumm = ({
  match,
  getCloseTask,
  accountType,
  setTaskConfig,
  tasks: { data, isFetching, errors },
}) => {
  useEffect(() => {
    getCloseTask(match.params.id);
    return () => setTaskConfig({});
  }, []);

  const answers = {};
  const [taskStatus, setTaskStatus] = useState(null);
  const [checkAnswers, setChekAnswers] = useState(false);
  const [description, setDescription] = useState("");

  const prepareState = () => {
    data.data.forEach((item, i) => {
      answers[`${i}`] = "";
    });
    setTaskStatus({ ...answers });
  };

  const onChange = (e) => {
    setChekAnswers(false);
    setTaskStatus({ ...taskStatus, [e.target.name]: e.target.value });
  };

  const displayResult = () => {
    let result = 0;
    data.data.forEach(({ answer }, i) => answer == taskStatus[i] && result++);
    return `Wynik: ${result}/${Object.keys(taskStatus).length}`;
  };

  return (
    <div className={styles.root}>
      {isFetching ? (
        <BeatLoader size={20} />
      ) : (
        <>
          {taskStatus === null && prepareState()}
          <h4>{data.name}</h4>
          <p>{data.content}</p>
          <p className={styles.points}>Punkty: {data.points}</p>
          {taskStatus && (
            <ul>
              {data.data.map(({ content, answer }, i) => (
                <li className={styles.listElement}>
                  <div className={styles.order}>
                    {`${i + 1}). `}
                    <MathJax content={"`" + content + "`"} />
                  </div>
                  Podaj odpowiedz:
                  <div className={styles.item}>
                    <input
                      autocomplete="off"
                      name={`${i}`}
                      value={taskStatus[`${i}`]}
                      onChange={(e) => onChange(e)}
                    ></input>
                    <div>
                      <span>Twoja odpowiedz:</span>
                      <div className={styles.result}>
                        <MathJax content={"`" + taskStatus[`${i}`] + "`"} />
                      </div>
                    </div>
                    {checkAnswers &&
                      (taskStatus[`${i}`] == answer ? (
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
            <h4>Miejsce na link z rozwiązaniem</h4>
            <TextareaAutosize
              maxCols="15"
              minCols="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextareaAutosize>
          </div>
          <div className={styles.check}>
            <button onClick={() => setChekAnswers(true)}>
              Sprawdź odpowiedzi
            </button>
          </div>
          {checkAnswers && (
            <div className={styles.result}>{displayResult()}</div>
          )}
          {accountType == "teacher" && <AddTaskToClass />}
        </>
      )}
    </div>
  );
};

CloseTaskDumm.propTypes = {};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  accountType: state.user.data.accountType,
});

export default connect(mapStateToProps, { getCloseTask, setTaskConfig })(
  CloseTaskDumm
);
