import React from "react";
import PropTypes from "prop-types";
import styles from "./TasksList.module.scss";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearTasks } from "../../../redux/actions/tasks";

const TasksList = ({ tasks, clearTasks }) => {
  const compare = (a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  };
  const sortedTasks = [...tasks].sort(compare);

  const displayOpenTask = ({
    task,
    deadLine,
    promptsAllowed,
    descriptionRequired,
  }) => (
    <div className={styles.openTask}>
      <table>
        <tr>
          <td className={styles.name}>
            <Link
              onClick={() => clearTasks()}
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
          <td>Podpowiedzi:{promptsAllowed ? " dostępne" : " niedostępne"}</td>{" "}
          <td>Opis: {descriptionRequired ? "wymagany" : "niewymagany"}</td>
        </tr>
      </table>
    </div>
  );

  const displayCloseTask = ({ task, deadLine }) => (
    <div className={styles.closeTask}>
      <table>
        <tr>
          <td className={styles.name}>
            {" "}
            <Link
              onClick={() => clearTasks()}
              to={`/display/closeTask/${task._id}`}
            >
              {task.name}
            </Link>
          </td>{" "}
          <td>
            {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
          </td>
        </tr>
      </table>
    </div>
  );

  const displayBooleanTask = ({ task, deadLine }) => (
    <div className={styles.booleanTask}>
      <table>
        <tr>
          <td className={styles.name}>
            {" "}
            <Link
              onClick={() => clearTasks()}
              to={`/display/booleanTask/${task._id}`}
            >
              {task.name}
            </Link>
          </td>{" "}
          <td>
            {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
          </td>
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

export default connect(null, { clearTasks })(TasksList);
