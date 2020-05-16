import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./BooleanTask.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import AddTaskToClass from "../../AddTaskToClass/AddTaskToClass/AddTaskToClass";
import Errors from "../../../layout/Errors/Errors";
import { connect } from "react-redux";
import { getBooleanTask, setTaskConfig } from "../../../../redux/actions/tasks";
import {
  updateAnswer,
  sendBooleanTaskResolution,
} from "../../../../redux/actions/resolveTask";

const BooleanTaskFromApi = ({
  match,
  getBooleanTask,
  accountType,
  setTaskConfig,
  updateAnswer,
  sendBooleanTaskResolution,
  tasks: { data, isFetching, errors, taskConfig },
}) => {
  useEffect(() => {
    getBooleanTask(match.params.id);
    return () => setTaskConfig({});
  }, [getBooleanTask, setTaskConfig, match.params.id]);

  const { answer, resolved, deadLine, _id } = taskConfig;

  const [taskStatus, setTaskStatus] = useState(null);

  const answers = {};

  const prepareState = () => {
    data.data.forEach((item, i) => {
      answers[`${i}`] = "";
    });
    setTaskStatus({ ...answers });
  };

  const onChange = (e) => {
    if (e.target.value === "") {
      setTaskStatus({ ...taskStatus, [e.target.name]: "" });
      updateAnswer({ ...taskStatus, [e.target.name]: "" });
    } else
      setTaskStatus({
        ...taskStatus,
        [e.target.name]: e.target.value === "true" ? true : false,
      });
    updateAnswer({
      ...taskStatus,
      [e.target.name]: e.target.value === "true" ? true : false,
    });
  };
  const countResult = () => {
    let result = 0;
    data.data.forEach(
      ({ answer: correctAnswer }, i) => correctAnswer === answer[i] && result++
    );
    return result;
  };

  const displayResult = () => {
    return `Wynik: ${countResult()}/${Object.keys(answer).length}`;
  };

  const sendSolution = () => {
    sendBooleanTaskResolution({
      result: countResult(),
      deadLine,
      _id,
      answer,
    });
  };
  return (
    <div className={styles.root}>
      {isFetching ? (
        <BeatLoader size={20} />
      ) : (
        <>
          <div
            className={
              accountType === "teacher" || resolved ? styles.overlay : ""
            }
          >
            {taskStatus === null && prepareState()}

            <div className={styles.header}>
              <div>
                <h4>{data.name}</h4>
                <p>{data.content}</p>
              </div>
              <p className={styles.points}>Punkty: {data.points}</p>
            </div>
            <ul>
              {data.data.map(({ content, answer: correctAnswer }, i) => (
                <li
                  key={i}
                  className={
                    resolved
                      ? answer[`${i}`] === correctAnswer
                        ? [styles.item, styles.succesBgColor].join(" ")
                        : [styles.item, styles.failBgColor].join(" ")
                      : styles.item
                  }
                >
                  <div className={styles.questionBox}>
                    <div>
                      {`${i + 1}) `}
                      {content + "   "}
                    </div>
                    <select
                      className={styles.select}
                      name={`${i}`}
                      value={answer[`${i}`]}
                      onChange={(e) => onChange(e)}
                    >
                      <option value={""}>Wybierz odpowiedz</option>
                      <option value={true}>Prawda</option>
                      <option value={false}>Fałsz</option>
                    </select>
                  </div>
                  {resolved ? (
                    correctAnswer === answer[`${i}`] ? (
                      <div className={styles.success}>Dobrze</div>
                    ) : (
                      <div className={styles.fail}>Źle</div>
                    )
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </div>
          {errors && <Errors errors={errors.data.err} />}
          {resolved ? (
            <div className={styles.result}>{displayResult()}</div>
          ) : (
            <>
              {accountType === "student" ? (
                <button className={styles.check} onClick={() => sendSolution()}>
                  Wyślij odpowiedź
                </button>
              ) : (
                <div className={styles.result}>{displayResult()}</div>
              )}
            </>
          )}
          {!Object.keys(taskConfig).length > 0 && accountType === "teacher" && (
            <AddTaskToClass />
          )}
        </>
      )}
    </div>
  );
};

BooleanTaskFromApi.propTypes = {
  match: PropTypes.object.isRequired,
  getBooleanTask: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired,
  setTaskConfig: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  sendBooleanTaskResolution: PropTypes.func.isRequired,
  task: PropTypes.object,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  accountType: state.user.data.accountType,
});

export default connect(mapStateToProps, {
  getBooleanTask,
  setTaskConfig,
  updateAnswer,
  sendBooleanTaskResolution,
})(BooleanTaskFromApi);
