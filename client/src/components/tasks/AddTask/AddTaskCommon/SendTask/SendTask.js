import React, { useState } from "react";
import PropTypes from "prop-types";
import Errors from "../../../../layout/Errors/Errors";
import styles from "./SendTask.module.scss";
import { connect } from "react-redux";

const SendTask = ({ newTask, send, apiErrors }) => {
  const { content, name, groups, section, class: classNew } = newTask;
  const [errors, setErrors] = useState("");

  const sendTask = () => {
    const errors = [];
    if (!content.trim().length) errors.push("Nie podano treści");
    if (!name.trim().length) errors.push("Nie podano nazwy zadania");
    if (!groups.length) errors.push("Nie podano grup");
    if (groups.length > 20) errors.push("Maksymalnie 20 zadań");
    if (!section.length || !classNew.length) errors.push("Nie wybrano działu");
    if (!errors.length) {
      setErrors([]);
      send(newTask);
    } else setErrors(errors);
  };

  return (
    <div className={styles.root}>
      {errors.length > 0 && (
        <ul>
          {errors.map((item, i) => (
            <li key={i} className={styles.error}>
              {item}
            </li>
          ))}
        </ul>
      )}
      {apiErrors && <Errors errors={apiErrors.data.err} />}
      <button onClick={() => sendTask()}>Zapisz zadanie</button>
    </div>
  );
};

SendTask.propTypes = {
  newTask: PropTypes.object.isRequired,
  send: PropTypes.func.isRequired,
  apiErrors: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  newTask: state.newTask.data,
  apiErrors: state.newTask.errors,
});

export default connect(mapStateToProps)(SendTask);
