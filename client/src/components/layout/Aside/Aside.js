import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Aside.module.scss";

const Aside = ({ children }) => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={
        active
          ? [styles.hiden, styles.asideWrapper].join(" ")
          : [styles.asideWrapper].join(" ")
      }
    >
      {children}
      <div onClick={() => setActive(!active)} className={styles.control}></div>
    </div>
  );
};

Aside.propTypes = {
  children: PropTypes.node,
};

export default Aside;
