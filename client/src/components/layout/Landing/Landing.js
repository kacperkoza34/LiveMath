import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Landing.module.scss";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className={styles.root}>
      <div className={styles.wrapper}>
        <h1>Witaj w LiveMath!</h1>
        <Link to="/login" className={styles.btnLogin}>
          <h4>Zaloguj się</h4>
        </Link>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
