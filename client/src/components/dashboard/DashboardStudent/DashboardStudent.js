import React, { useEffect } from "react";
import PropTypes from "prop-types";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
import StudentProfile from "../../profile/StudentProfile/StudentProfile";

const DashboardStudent = () => {
  return (
    <>
      <StudentProfile />
    </>
  );
};

DashboardStudent.propTypes = {};

export default DashboardStudent;
