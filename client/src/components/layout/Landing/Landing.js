import React, { useRef, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Landing.module.scss";
import BtnPrimary from "../../features/BtnPrimary/BtnPrimary";
import { connect } from "react-redux";

import { ReactComponent as Animation2 } from "./Animation2.svg";

import gsap from "gsap";

const Landing = ({ isAuthenticated }) => {
  const animation = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      const [elements] = animation.current.children;
      const math = elements.querySelectorAll(".math");
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      gsap.set(math, { autoAlpha: 0 });
      tl.to(math, { duration: 1, autoAlpha: 1, stagger: 1 });
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.welcome}>
          <h1>Witaj w LiveMath!</h1>

          <Link to="/login">
            <BtnPrimary font={16} border={2}>
              Logowanie
            </BtnPrimary>
          </Link>

          <Link to="/register/firstline" className={styles.btnLogin}>
            <BtnPrimary font={16} border={2}>
              Rejestracja
            </BtnPrimary>
          </Link>

          <div className={styles.animation} ref={animation}>
            <Animation2 />
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
