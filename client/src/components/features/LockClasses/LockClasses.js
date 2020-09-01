import React from "react";
import styles from "./LockClasses.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LockClasses = props => {
  const { icon } = props;
  return (
    <span {...props} className={styles.root}>
      <FontAwesomeIcon icon={icon} />
    </span>
  );
};

export default LockClasses;
