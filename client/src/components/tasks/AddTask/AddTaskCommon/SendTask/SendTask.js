import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SendTask.module.scss";
import { connect } from "react-redux";

const SendTask = ({ newTask, send }) => {
  const { content, name, groups, section, class: classNew } = newTask;
  const [errors, setErrors] = useState("");

  const sendTask = () => {
    const errors = [];
    if (!content.trim().length) errors.push("Nie podano treści");
    if (!name.trim().length) errors.push("Nie podano nazwy zadania");
    if (!groups.length) errors.push("Nie podano grup");
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
          {errors.map((item) => (
            <li className={styles.error}>{item}</li>
          ))}
        </ul>
      )}
      <button onClick={() => sendTask()}>Zapisz zadanie</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  newTask: state.newTask.data,
});

export default connect(mapStateToProps)(SendTask);
