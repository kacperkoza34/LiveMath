import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const StudentRoute = ({
  component: Component,
  accountType,
  auth: { isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated && accountType === "student")
          return <Component {...props} />;
        else return <Redirect to="/login" />;
      }}
    />
  );
};

StudentRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  accountType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  accountType: state.user.data.accountType,
});

export default connect(mapStateToProps)(StudentRoute);
