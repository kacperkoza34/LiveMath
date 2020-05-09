import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Aside.module.scss";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Aside = ({ children }) => {
  const [active, setActive] = useState(false);
  return (
    <div className={styles.aside}>
      <div
        className={
          active ? [styles.root, styles.active].join(" ") : styles.root
        }
      >
        <div className={styles.asideWrapper}>
          <div id={"list"} className={styles.list}>
            {children}
          </div>
          <div
            onClick={() => setActive(!active)}
            className={
              active
                ? [styles.control, styles.controlActive].join(" ")
                : styles.control
            }
          >
            <span>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Aside.propTypes = {
  children: PropTypes.node,
};

export default Aside;
