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
  const sortedTasks = [...tasks].sort(compare);

  const displayStatus = (deadLine, resolved) => {
    if (Date.parse(deadLine) < Date.now() && !resolved)
      return <div className={styles.failed}>Niewykonane</div>;
    if (Date.parse(deadLine) > Date.now() && !resolved)
      return <div>Do wykonania</div>;
    if (resolved) return <div className={styles.success}>Rozwiązane</div>;
  };

  const displayOpenTask = ({
    task,
    deadLine,
    promptsAllowed,
    descriptionRequired,
    usedPrompts,
    resolved,
    _id,
  }) => (
    <div className={styles.openTask}>
      <table>
        <tr>
          <td className={styles.name}>
            <Link
              onClick={() => {
                clearTasks();
                setTaskConfig({
                  description: "",
                  deadLine,
                  resolved,
                  promptsAllowed,
                  descriptionRequired,
                  usedPrompts,
                  _id,
                });
              }}
              to={`/display/openTask/${task._id}`}
            >
              {task.name}
            </Link>
          </td>{" "}
          <td>
            {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
          </td>
        </tr>
        <tr>
          <td>
            {promptsAllowed
              ? `Wykorzystane podpowiedzi: ${usedPrompts}`
              : "Podpowiedzi niedostępne"}
          </td>{" "}
          <td>Opis: {descriptionRequired ? "wymagany" : "niewymagany"}</td>
        </tr>
        <tr>
          <td>Status: {displayStatus(deadLine, resolved)}</td>{" "}
        </tr>
      </table>
    </div>
  );

  const displayCloseTask = ({ task, deadLine, resolved }) => (
    <div className={styles.closeTask}>
      <table>
        <tr>
          <td className={styles.name}>
            {" "}
            <Link
              onClick={() => {
                clearTasks();
                setTaskConfig({ deadLine, resolved });
              }}
              to={`/display/closeTask/${task._id}`}
            >
              {task.name}
            </Link>
          </td>{" "}
          <td>
            {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
          </td>
        </tr>
        <tr>
          <td>Status: {displayStatus(deadLine, resolved)}</td>{" "}
        </tr>
      </table>
    </div>
  );

  const displayBooleanTask = ({ task, deadLine, resolved }) => (
    <div className={styles.booleanTask}>
      <table>
        <tr>
          <td className={styles.name}>
            {" "}
            <Link
              onClick={() => {
                clearTasks();
                setTaskConfig({ deadLine, resolved });
              }}
              to={`/display/booleanTask/${task._id}`}
            >
              {task.name}
            </Link>
          </td>{" "}
          <td>
            {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
          </td>
        </tr>
        <tr>
          <td>Status: {displayStatus(deadLine, resolved)}</td>{" "}
        </tr>
      </table>
    </div>
  );

  return (
    <div className={styles.root}>
      {sortedTasks.map((item) => {
        if (item.taskType == "taskClose") return displayCloseTask(item);
        if (item.taskType == "taskOpen") return displayOpenTask(item);
        if (item.taskType == "taskBoolean") return displayBooleanTask(item);
      })}
    </div>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default connect(null, { clearTasks, setTaskConfig })(TasksList);
