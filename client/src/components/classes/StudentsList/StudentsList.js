import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import styles from "./StudentsList.module.scss";

const StudentsList = ({ students }) => {
  const compare = (a, b) => {
    if (a.studentProfile.name < b.studentProfile.name) {
      return -1;
    }
    if (a.studentProfile.name > b.studentProfile.name) {
      return 1;
    }
    return 0;
  };

  return (
    <div className={styles.root}>
      {students
        .sort(compare)
        .map(
          (
            { studentProfile: { user, name, points, maxPoints, needReview } },
            index
          ) => (
            <Link
              key={index}
              className={
                index % 2 !== 0
                  ? [styles.btnList, styles.student].join(" ")
                  : [styles.btnList, styles.student, styles.light].join(" ")
              }
              to={`/student/${user}`}
            >
              <span>
                {`${index + 1}. ${name}  `}{" "}
                {needReview && (
                  <FontAwesomeIcon
                    className={styles.review}
                    icon={faQuestion}
                  />
                )}
              </span>
              <span>{`${points}/${maxPoints}`}</span>
            </Link>
          )
        )}
    </div>
  );
};

StudentsList.propTypes = {
  students: PropTypes.array.isRequired,
};

export default StudentsList;
