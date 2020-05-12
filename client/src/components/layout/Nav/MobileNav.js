import React, { useState, useEffect } from "react";
import styles from "./MobileNav.module.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MobileNav = ({ navLinks, logo }) => {
  const [hidden, hide] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      hide(true);
    });
  }, []);

  return (
    <nav className={styles.root}>
      <div className={styles.header}>
        <div className={styles.logo} onClick={() => hide(true)}>
          {logo}
        </div>
        <span>
          <FontAwesomeIcon icon={faBars} onClick={() => hide(!hidden)} />
        </span>
      </div>
      <ul
        onClick={() => hide(true)}
        className={
          !hidden ? [styles.navLinks, styles.active].join(" ") : styles.navLinks
        }
      >
        {navLinks}
      </ul>
    </nav>
  );
};

MobileNav.propTypes = {
  navLinks: PropTypes.node,
  logo: PropTypes.node,
};

export default MobileNav;
