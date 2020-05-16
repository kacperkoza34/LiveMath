import React from "react";
import PropTypes from "prop-types";
import styles from "./TasksList.module.scss";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearTasks, setTaskConfig } from "../../../redux/actions/tasks";

const TasksList = ({ tasks, clearTasks, setTaskConfig }) => {
  const compare = (a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  };
  const sortedTasks = tasks.sort(compare);

  const displayStatus = (deadLine, resolved, description, toUpdate) => {
    if (Date.parse(deadLine) < Date.now() && !resolved)
      return (
        <div className={styles.statusBox + " " + styles.failed}>
          Niewykonane
        </div>
      );
    if (Date.parse(deadLine) > Date.now() && !resolved)
      return (
        <div className={styles.statusBox + " " + styles.toDo}>Do wykonania</div>
      );
    if (resolved && toUpdate)
      return (
        <div className={styles.statusBox + " " + styles.toUpdate}>
          Do sprawdzenia
        </div>
      );
    if (resolved)
      return (
        <div className={styles.statusBox + " " + styles.success}>
          <a href={description} rel="noopener noreferrer" target="_blank">
            Rozwiązane
          </a>
        </div>
      );
  };

  const displayOpenTask = (
    {
      task,
      deadLine,
      promptsAllowed,
      descriptionRequired,
      description,
      usedPrompts,
      resolved,
      result,
      _id,
      group,
      answer,
      toUpdate,
      messages,
    },
    index
  ) => (
    <div key={index} className={styles.openTask}>
      <table>
        <tbody>
          <tr>
            <td>{task.name}</td>
            <td>
              {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
            </td>
          </tr>
          <tr>
            <td>
              {promptsAllowed
                ? `Wykorzystane podpowiedzi: ${usedPrompts}`
                : "Podpowiedzi niedostępne"}
            </td>
            <td>
              Załącznik: {descriptionRequired ? "wymagany" : "niewymagany"}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <Link
                onClick={() => {
                  clearTasks();
                  setTaskConfig({
                    description,
                    deadLine,
                    resolved,
                    promptsAllowed,
                    descriptionRequired,
                    usedPrompts,
                    _id,
                    group,
                    answer,
                    toUpdate,
                    messages,
                  });
                }}
                to={`/display/openTask/${task._id}`}
              >
                {displayStatus(deadLine, resolved, description, toUpdate)}
              </Link>
            </td>
            <td>Wynik: {`${result}/${task.points}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const displayCloseTask = (
    {
      task,
      deadLine,
      resolved,
      result,
      description,
      descriptionRequired,
      answer,
      toUpdate,
      _id,
      messages,
    },
    index
  ) => (
    <div key={index} className={styles.closeTask}>
      <table>
        <tbody>
          <tr>
            <td>{task.name}</td>
            <td>
              {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              Załącznik: {descriptionRequired ? "wymagany" : "niewymagany"}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <Link
                onClick={() => {
                  clearTasks();
                  setTaskConfig({
                    deadLine,
                    resolved,
                    result,
                    answer,
                    description,
                    descriptionRequired,
                    toUpdate,
                    _id,
                    messages,
                  });
                }}
                to={`/display/closeTask/${task._id}`}
              >
                {displayStatus(deadLine, resolved, description, toUpdate)}
              </Link>
            </td>
            <td>Wynik: {`${result}/${task.points}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const displayBooleanTask = (
    { task, deadLine, resolved, result, answer, _id },
    index
  ) => (
    <div key={index} className={styles.booleanTask}>
      <table>
        <tbody>
          <tr>
            <td>{task.name}</td>
            <td>
              {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <Link
                onClick={() => {
                  clearTasks();
                  setTaskConfig({ deadLine, resolved, answer, _id });
                }}
                to={`/display/booleanTask/${task._id}`}
              >
                {displayStatus(deadLine, resolved)}
              </Link>
            </td>
            <td>Wynik: {`${result}/${task.points}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={styles.root}>
      {sortedTasks.map((item, index) => {
        if (item.taskType === "taskClose") return displayCloseTask(item, index);
        if (item.taskType === "taskOpen") return displayOpenTask(item, index);
        if (item.taskType === "taskBoolean")
          return displayBooleanTask(item, index);
        else return <>Brak zadań</>;
      })}
    </div>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  clearTasks: PropTypes.func.isRequired,
  setTaskConfig: PropTypes.func.isRequired,
};

export default connect(null, { clearTasks, setTaskConfig })(TasksList);
