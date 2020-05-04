import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./StudentsList.module.scss";

const StudentsList = ({ students }) => {
  return (
    <div className={styles.root}>
      {students.map(
        (
          { studentProfile: { user, name, points, maxPoints, needReview } },
          index
        ) => (
          <div className={needReview && styles.toUpdate}>
            <Link
              className={styles.btnList + " " + styles.student}
              to={`/student/${user}`}
            >
              <span>{`${index + 1}. ${name}`}</span>
              <span>{`${points}/${maxPoints}`}</span>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

StudentsList.propTypes = {};

export default StudentsList;
