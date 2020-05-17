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
  //
  //   const xLine = elements.querySelectorAll(".x-line");
  //   const yLine = elements.querySelectorAll(".y-line");
  //   const zLine = elements.querySelectorAll(".z-line");
  //   const orangeLine = elements.querySelectorAll(".orange-line");
  //
  //   const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
  //
  //   gsap.set([xLine, yLine, zLine, orangeLine], { autoAlpha: 0 });
  //
  //   tl.to(xLine, { duration: 0.2, autoAlpha: 1, stagger: 0.3 })
  //     .to(yLine, { duration: 0.2, autoAlpha: 1, stagger: 0.3 })
  //     .to(zLine, { duration: 0.2, autoAlpha: 1, stagger: 0.3 })
  //     .fromTo(
  //       orangeLine[0],
  //       { scaleY: 0, autoAlpha: 1 },
  //       { duration: 1, scaleY: 1 }
  //     )
  //     .fromTo(
  //       orangeLine[1],
  //       { scaleY: 0, autoAlpha: 1 },
  //       { duration: 0.4, scaleY: 1 }
  //     );
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
