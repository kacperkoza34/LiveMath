import React from "react";
import styles from "./Help.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Help = ({ id, title }) => {
  return (
    <div className={styles.root}>
      <Link to={`/about/${id}`}>
        {" "}
        <span> {`${title}  `}</span>
        <FontAwesomeIcon icon={faInfoCircle} />
      </Link>
    </div>
  );
};

export default Help;
