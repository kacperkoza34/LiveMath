import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Errors.module.scss";

const Errors = ({ errors }) => {
  useEffect(() => {}, [errors]);
  return (
    <div className={styles.root}>
      {errors.map(({ msg }, index) => (
        <div key={index} className="alert alert-danger">
          {msg}
        </div>
      ))}
    </div>
  );
};

Errors.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default Errors;
