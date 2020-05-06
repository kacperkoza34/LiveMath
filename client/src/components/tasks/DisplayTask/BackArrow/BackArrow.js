import React from "react";
import styles from "./BackArrow.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackArrow = () => {
  return (
    <div className={styles.root}>
      <Link to="/dashboard">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
    </div>
  );
};

export default BackArrow;
