import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SendOpenTask.module.scss";
import { connect } from "react-redux";
import { sendOpenTask } from "../../../../../../redux/actions/newTask";

const SendOpenTask = ({ newTask, sendOpenTask }) => {
  const {
    content,
    name,
    variables,
    model,
    groups,
    section,
    points,
    class: classNew,
  } = newTask;
  const [errors, setErrors] = useState("");
  const sendTask = () => {
    const errors = [];
    if (!content.trim().length) errors.push("Nie podano treści");
    if (!name.trim().length) errors.push("Nie podano nazwy zadania");
    if (!variables.length) errors.push("Nie podano zmiennych");
    if (!model.trim().length) errors.push("Nie podano wzoru");
    if (!groups.length) errors.push("Nie podano grup");
    if (!section.length || !classNew.length) errors.push("Nie wybrano działu");
    if (!points) errors.push("Nie wybrano punktów");
    if (!errors.length) {
      setErrors([]);
      sendOpenTask(newTask);
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

export default connect(mapStateToProps, { sendOpenTask })(SendOpenTask);
