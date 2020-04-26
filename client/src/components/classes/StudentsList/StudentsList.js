import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./StudentsList.module.scss";

const StudentsList = ({ students }) => {
  return (
    <div className={styles.root}>
      {students.map(({ student }, index) => (
        <Link className={styles.btnClass} to={`/student/${student._id}`}>{`${
          index + 1
        }. ${student.name}`}</Link>
      ))}
    </div>
  );
};

StudentsList.propTypes = {};

export default StudentsList;
