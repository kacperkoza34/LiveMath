import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TasksList.module.scss";
import Moment from "react-moment";
import { connect } from "react-redux";
import { clearTasks, setTaskConfig } from "../../../redux/actions/tasks";
import OpenTaskView from "../../features/OpenTaskView/OpenTaskView";
import CloseTaskView from "../../features/CloseTaskView/CloseTaskView";
import BooleanTaskView from "../../features/BooleanTaskView/BooleanTaskView";

const TasksList = ({
  clearTasks,
  setTaskConfig,
  tasks,
  taskFromApi,
  onlyName,
  accountType
}) => {
  const [tasksRange, setRange] = useState({
    start: 0,
    end: 10,
    currentPage: 0
  });

  const compare = (a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  };

  const sortedTasks = tasks.sort(compare);

  const displayPagesSelector = () => {
    const { currentPage } = tasksRange;
    const lengthDivededByRange = sortedTasks.length / 10;

    const buttonsStart = currentPage === 0 ? 0 : currentPage - 1;

    const buttonsEnd =
      lengthDivededByRange > buttonsStart + 3
        ? buttonsStart + 3
        : lengthDivededByRange;

    if (sortedTasks.length > 10) {
      const buttons = [];
      for (let i = buttonsStart; i < buttonsEnd; i++)
        buttons.push(
          <li
            className={i == currentPage && styles.activePage}
            onClick={() => changePage(i)}
          >
            {i + 1}
          </li>
        );
      return <ul>{buttons.map(item => item)}</ul>;
    }
  };

  const changePage = index => {
    const basicEnd = index * 10 + 10;
    const endOfRange =
      basicEnd > sortedTasks.length ? sortedTasks.length : basicEnd;
    setRange({ start: index * 10, end: endOfRange, currentPage: index });
  };

  return (
    <div className={styles.root}>
      {sortedTasks
        .slice(tasksRange.start, tasksRange.end)
        .map((item, index) => {
          if (item.taskType === "taskClose" || item.taskType === "closeTask")
            return (
              <CloseTaskView
                accountType={accountType}
                onlyName={onlyName}
                data={item}
                index={index}
                clearTasks={clearTasks}
                setTaskConfig={taskFromApi ? setTaskConfig : null}
              />
            );
          if (item.taskType === "taskOpen" || item.taskType === "openTask")
            return (
              <OpenTaskView
                accountType={accountType}
                onlyName={onlyName}
                data={item}
                index={index}
                clearTasks={clearTasks}
                setTaskConfig={taskFromApi ? setTaskConfig : null}
              />
            );
          if (
            item.taskType === "taskBoolean" ||
            item.taskType === "booleanTask"
          )
            return (
              <BooleanTaskView
                accountType={accountType}
                onlyName={onlyName}
                data={item}
                index={index}
                clearTasks={clearTasks}
                setTaskConfig={taskFromApi ? setTaskConfig : null}
              />
            );
          else return <>Brak zadań</>;
        })}
      <div className={styles.page}>{displayPagesSelector()}</div>
    </div>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  clearTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  accountType: state.user.data.accountType
});

export default connect(mapStateToProps, { clearTasks, setTaskConfig })(
  TasksList
);
