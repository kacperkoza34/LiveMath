import React, { useRef, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Landing.module.scss";
import { connect } from "react-redux";

import { ReactComponent as Animation } from "./Animation.svg";
import gsap from "gsap";

const Landing = ({ isAuthenticated }) => {
  // const animation = useRef(null);
  //
  // useEffect(() => {
  //   const [elements] = animation.current.children;
  // }, []);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.welcome}>
          <h1>Witaj w LiveMath!</h1>
          <Link to="/login" className={styles.btnLogin}>
            <h4>Zaloguj się</h4>
          </Link>
        </div>
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
