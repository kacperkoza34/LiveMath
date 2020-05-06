import React, { useState } from "react";
import styles from "./MobileNav.module.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MobileNav = ({ navLinks, logo }) => {
  const [hidden, hide] = useState(true);
  return (
    <nav className={styles.root}>
      <div className={styles.header}>
        <h3>{logo}</h3>
        <span>
          <FontAwesomeIcon icon={faBars} onClick={() => hide(!hidden)} />
        </span>
      </div>
      {!hidden && (
        <ul onClick={() => hide(true)} className={styles.navLinks}>
          {navLinks}
        </ul>
      )}
    </nav>
  );
};

MobileNav.propTypes = {
  navLinks: PropTypes.node,
  logo: PropTypes.node,
};

export default MobileNav;
