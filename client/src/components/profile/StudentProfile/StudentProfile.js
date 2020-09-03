import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./StudentProfile.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import { Line } from "rc-progress";
import BackArrow from "../../features/BackArrow/BackArrow";
import TasksList from "../../features/TasksList/TasksList";
import { connect } from "react-redux";
import { getStudent } from "../../../redux/actions/student";
import { clearTasks, setTaskConfig } from "../../../redux/actions/tasks";

const StudentProfile = ({
  id,
  student: {
    isFetching,
    data: { name, tasksOpen, tasksBoolean, tasksClose, points, maxPoints }
  },
  user: { _id, accountType },
  getStudent,
  match
}) => {
  useEffect(() => {
    if (match) getStudent(match.params.id);
    else getStudent(_id);
  }, [id, getStudent, _id, match]);
  return (
    <div className={styles.root}>
      {isFetching ? (
        <BeatLoader />
      ) : (
        <div>
          {accountType == "teacher" && <BackArrow />}
          <div className={styles.profile}>
            <h3>{name}</h3>
            <span className={styles.result}>
              <Line
                percent={(points / maxPoints) * 100}
                strokeWidth="8"
                strokeColor="#222f3e"
                trailColor="#222f3e"
              />
              <div>{`Postęp: ${points}/${maxPoints}`}</div>
            </span>
          </div>
          <TasksList
            clearTasks={clearTasks}
            setTaskConfig={setTaskConfig}
            tasks={[...tasksOpen, ...tasksClose, ...tasksBoolean]}
          />
        </div>
      )}
    </div>
  );
};

StudentProfile.propTypes = {
  id: PropTypes.string,
  student: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  getStudent: PropTypes.func.isRequired,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  student: state.student,
  user: state.user.data
});

export default connect(mapStateToProps, { getStudent })(StudentProfile);
