import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DashboardTeacher from "../DashboardTeacher/DashboardTeacher";
import DashboardStudent from "../DashboardStudent/DashboardStudent";
import BeatLoader from "react-spinners/BeatLoader";

const Dashboard = ({ user: { data, isFetching, errors } }) => {
  const content = isFetching ? (
    <BeatLoader size={50} />
  ) : (
    <>
      {data.accountType == "student" ? (
        <DashboardStudent user={data} />
      ) : (
        <DashboardTeacher user={data} />
      )}
    </>
  );
  return errors ? errors.data.msg : content;
};

Dashboard.propTypes = {
  getTeacherProfile: PropTypes.func.isRequired,
  getStudentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
