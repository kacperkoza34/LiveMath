import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardTeacher from "../DashboardTeacher/DashboardTeacher";
import DashboardStudent from "../DashboardStudent/DashboardStudent";
import BeatLoader from "react-spinners/BeatLoader";

const Dashboard = ({ user: { data, isFetching, errors } }) => {
  const content = isFetching ? (
    <BeatLoader size={25} />
  ) : (
    <>
      {data.accountType === "student" ? (
        <DashboardStudent user={data} />
      ) : (
        <DashboardTeacher user={data} />
      )}
    </>
  );
  return errors ? errors.data.msg : content;
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
