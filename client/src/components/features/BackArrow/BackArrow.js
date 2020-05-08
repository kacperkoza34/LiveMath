import React from "react";
import styles from "./BackArrow.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";

const BackArrow = ({ history }) => {
  return (
    <div onClick={() => history.goBack()} className={styles.root}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
};

export default withRouter(BackArrow);
