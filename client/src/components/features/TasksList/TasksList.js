import React from "react";
import PropTypes from "prop-types";
import styles from "./TasksList.module.scss";
import Moment from "react-moment";
import { connect } from "react-redux";
import { clearTasks, setTaskConfig } from "../../../redux/actions/tasks";
import OpenTaskView from "../../features/OpenTaskView/OpenTaskView";
import CloseTaskView from "../../features/OpenTaskView/OpenTaskView";
import BooleanTaskView from "../../features/BooleanTaskView/BooleanTaskView";

const TasksList = ({ tasks, clearTasks, setTaskConfig, onlyName }) => {
  const compare = (a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  };
  const sortedTasks = tasks.sort(compare);

  return (
    <div className={styles.root}>
      {sortedTasks.map((item, index) => {
        if (item.taskType === "taskClose")
          return (
            <CloseTaskView
              onlyName={onlyName}
              data={item}
              index={index}
              clearTasks={clearTasks}
              setTaskConfig={setTaskConfig}
            />
          );
        if (item.taskType === "taskOpen")
          return (
            <OpenTaskView
              onlyName={onlyName}
              data={item}
              index={index}
              clearTasks={clearTasks}
              setTaskConfig={setTaskConfig}
            />
          );
        if (item.taskType === "taskBoolean")
          return (
            <BooleanTaskView
              onlyName={onlyName}
              data={item}
              index={index}
              clearTasks={clearTasks}
              setTaskConfig={setTaskConfig}
            />
          );
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
