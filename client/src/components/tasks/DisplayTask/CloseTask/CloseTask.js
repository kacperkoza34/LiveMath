import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BeatLoader from "react-spinners/BeatLoader";
import MathJax from "../../MathJax";
import AddTaskToClass from "../../AddTaskToClass/AddTaskToClass";
import { connect } from "react-redux";
import { getCloseTask } from "../../../../redux/actions/tasks";

const CloseTask = ({
  match,
  getCloseTask,
  accountType,
  tasks: { data, isFetching, errors },
}) => {
  useEffect(() => {
    getCloseTask(match.params.id);
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
    setTaskStatus({ ...taskStatus, [e.target.name]: e.target.value });
  };

  const displayResult = () => {
    let result = 0;
    data.data.forEach(({ answer }, i) => answer == taskStatus[i] && result++);
    return `${result}/${Object.keys(taskStatus).length}`;
  };
  return (
    <>
      {isFetching ? (
        <BeatLoader size={20} />
      ) : (
        <>
          {taskStatus === null && prepareState()}
          <h4>{data.name}</h4>
          <p>{data.content}</p>
          {taskStatus && (
            <ul>
              {data.data.map(({ content, answer }, i) => (
                <li>
                  {`${i + 1}). `}
                  <MathJax content={content} />
                  Podaj odpowiedz:
                  <input
                    name={`${i}`}
                    value={taskStatus[`${i}`]}
                    onChange={(e) => onChange(e)}
                  ></input>
                  {checkAnswers &&
                    (taskStatus[`${i}`] == answer ? "Ok" : "Źle")}
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => setChekAnswers(true)}>
            Sprawdź odpowiedzi
          </button>
          {checkAnswers && displayResult()}
          {accountType == "teacher" && <AddTaskToClass />}
        </>
      )}
    </>
  );
};

CloseTask.propTypes = {};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  accountType: state.user.data.accountType,
});

export default connect(mapStateToProps, { getCloseTask })(CloseTask);
