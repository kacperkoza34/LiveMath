import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const StudentsList = ({ students }) => {
  return (
    <>
      {students.map(({ student }, index) => (
        <li className="posts">
          <Link to={`/student/${student._id}`}>{`${index + 1}. ${
            student.name
          }`}</Link>
        </li>
      ))}
    </>
  );
};

StudentsList.propTypes = {};

export default StudentsList;
