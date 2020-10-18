import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./TasksList.module.scss";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import TaskTypeBox from "../../features/TaskTypeBox/TaskTypeBox";
import TasksListView from "../../features/TasksList/TasksList";
import { connect } from "react-redux";
import { getTasks, clearTasks } from "../../../redux/actions/tasks";

const TasksList = ({
  classId,
  sectionId,
  getTasks,
  clearTasks,
  tasks: { data, isFetching, errors }
}) => {
  useEffect(() => {
    if (classId && sectionId) {
      getTasks({ classId, sectionId });
    }
  }, [getTasks, sectionId, classId]);

  return (
    <div className={styles.root}>
      <TaskTypeBox />
      {isFetching ? (
        <BeatLoader size={20} />
      ) : (
        <>
          {classId && sectionId ? (
            <>
              <ul>
                {data.length > 0 ? (
                  <TasksListView
                    tasks={data}
                    taskFromApi={false}
                    onlyName={true}
                    displayContent={true}
                  />
                ) : (
                  "Nie ma zadań z tego działu"
                )}
              </ul>
            </>
          ) : (
            "Wybierz dział"
          )}
        </>
      )}
    </div>
  );
};

TasksList.propTypes = {
  classId: PropTypes.number,
  sectionId: PropTypes.number,
  getTasks: PropTypes.func,
  clearTasks: PropTypes.func,
  tasks: PropTypes.object
};

const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps, { getTasks, clearTasks })(TasksList);
