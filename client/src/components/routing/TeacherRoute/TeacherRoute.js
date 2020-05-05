import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const TeacherRoute = ({
  component: Component,
  auth: { isAuthenticated },
  accountType,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated && accountType === "teacher")
          return <Component {...props} />;
        else return <Redirect to="/login" />;
      }}
    />
  );
};

TeacherRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  accountType: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  accountType: state.user.data.accountType,
});

export default connect(mapStateToProps)(TeacherRoute);
