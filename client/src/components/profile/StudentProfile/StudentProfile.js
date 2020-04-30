import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./StudentProfile.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
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
  }, [id]);
  return (
    <div className={styles.root}>
      {isFetching ? (
        <BeatLoader />
      ) : (
        <div>
          <h3>{name}</h3>
          <div>{`Postęp: ${points}/${maxPoints}`}</div>
          <TasksList tasks={[...tasksOpen, ...tasksClose, ...tasksBoolean]} />
        </div>
      )}
    </div>
  );
};

StudentProfile.propTypes = {};

const mapStateToProps = (state) => ({
  student: state.student,
  user: state.user.data._id,
});

export default connect(mapStateToProps, { getStudent })(StudentProfile);
