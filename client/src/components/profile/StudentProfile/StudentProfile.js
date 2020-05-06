import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./StudentProfile.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import { Line } from "rc-progress";
import TasksList from "./TasksList";
import { connect } from "react-redux";
import { getStudent } from "../../../redux/actions/student";

const StudentProfile = ({
  id,
  student: {
    isFetching,
    data: { name, tasksOpen, tasksBoolean, tasksClose, points, maxPoints },
  },
  user,
  getStudent,
  match,
}) => {
  useEffect(() => {
    if (match) getStudent(match.params.id);
    else getStudent(user);
  }, [id, getStudent, user, match]);
  return (
    <div className={styles.root}>
      {isFetching ? (
        <BeatLoader />
      ) : (
        <div>
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
          <TasksList tasks={[...tasksOpen, ...tasksClose, ...tasksBoolean]} />
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
  match: PropTypes.object,
};

const mapStateToProps = (state) => ({
  student: state.student,
  user: state.user.data._id,
});

export default connect(mapStateToProps, { getStudent })(StudentProfile);
