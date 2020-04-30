import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./BooleanTask.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import MathJax from "../../MathJax";
import AddTaskToClass from "../../AddTaskToClass/AddTaskToClass/AddTaskToClass";
import { connect } from "react-redux";
import { getBooleanTask, setTaskConfig } from "../../../../redux/actions/tasks";

const BooleanTask = ({
  match,
  getBooleanTask,
  accountType,
  setTaskConfig,
  tasks: { data, isFetching, errors, taskConfig },
}) => {
  useEffect(() => {
    getBooleanTask(match.params.id);
    return () => setTaskConfig({});
  }, []);

  const answers = {};
  const [taskStatus, setTaskStatus] = useState(null);
  const [checkAnswers, setChekAnswers] = useState(false);

  const prepareState = () => {
    data.data.forEach((item, i) => {
      answers[`${i}`] = "";
    });
    setTaskStatus({ ...answers });
  };

  const onChange = (e) => {
    setChekAnswers(false);
    if (e.target.value === "")
      setTaskStatus({ ...taskStatus, [e.target.name]: "" });
    else
      setTaskStatus({
        ...taskStatus,
        [e.target.name]: e.target.value === "true" ? true : false,
      });
  };

  const displayResult = () => {
    let result = 0;
    data.data.forEach(({ answer }, i) => answer === taskStatus[i] && result++);
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
          <p>{data.description}</p>
          <p className={styles.points}>Punkty: {data.points}</p>
          {taskStatus && (
            <ul>
              {data.data.map(({ content, answer }, i) => (
                <li className={styles.item}>
                  {`${i + 1}). `}
                  {content + "   "}
                  <select
                    className={styles.select}
                    name={`${i}`}
                    value={taskStatus[`${i}`]}
                    onChange={(e) => onChange(e)}
                  >
                    <option value={""}>Wybierz odpowiedz</option>
                    <option value={true}>Prawda</option>
                    <option value={false}>Fałsz</option>
                  </select>
                  {checkAnswers &&
                    (answer === taskStatus[`${i}`] ? (
                      <div className={styles.success}>Dobrze</div>
                    ) : (
                      <div className={styles.fail}>Źle</div>
                    ))}
                </li>
              ))}
            </ul>
          )}
          <button className={styles.check} onClick={() => setChekAnswers(true)}>
            Sprawdź odpowiedzi
          </button>
          {checkAnswers && (
            <div className={styles.result}>{displayResult()}</div>
          )}
          {!Object.keys(taskConfig).length > 0 && accountType == "teacher" && (
            <AddTaskToClass />
          )}
        </>
      )}
    </div>
  );
};

BooleanTask.propTypes = {};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  accountType: state.user.data.accountType,
});

export default connect(mapStateToProps, { getBooleanTask, setTaskConfig })(
  BooleanTask
);
