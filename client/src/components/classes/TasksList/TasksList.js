import React from "react";
import PropTypes from "prop-types";
import styles from "./TasksList.module.scss";
import Moment from "react-moment";
import BtnPrimary from "../../features/BtnPrimary/BtnPrimary";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearTasks } from "../../../redux/actions/tasks";
import OpenTaskView from "../../features/OpenTaskView/OpenTaskView";
import CloseTaskView from "../../features/OpenTaskView/OpenTaskView";

const TasksList = ({ tasks, clearTasks }) => {
  const compare = (a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  };
  const sortedTasks = tasks.sort(compare);

  const displayBooleanTask = ({ task, deadLine }, index) => (
    <div key={index} className={styles.booleanTask}>
      <table>
        <tbody>
          <tr>
            <td className={styles.name}>
              <Link
                onClick={() => clearTasks()}
                to={`/display/booleanTask/${task._id}`}
              >
                {task.name}
              </Link>
            </td>
            <td>
              {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={styles.root}>
      <Link to={"/tasks"}>
        <BtnPrimary size={12} border={2}>
          Dodaj zadanie
        </BtnPrimary>
      </Link>
      {sortedTasks.map((item, index) => {
        if (item.taskType === "taskClose")
          return (
            <CloseTaskView data={item} index={index} clearTasks={clearTasks} />
          );
        if (item.taskType === "taskOpen")
          return (
            <OpenTaskView data={item} index={index} clearTasks={clearTasks} />
          );
        if (item.taskType === "taskBoolean")
          return displayBooleanTask(item, index);
        else return <>Brak zadań</>;
      })}
    </div>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  clearTasks: PropTypes.func.isRequired
};

export default connect(null, { clearTasks })(TasksList);
