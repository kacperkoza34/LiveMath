import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddTaskToClass.module.scss";
import { connect } from "react-redux";
import {
  addOpenTask,
  addCloseTask,
  addBooleanTask,
  clearTask,
} from "../../../../redux/actions/taskToClass";
import SelectClass from "../SelectClass/SelectClass";
import SelectDeadLine from "../SelectDeadLine/SelectDeadLine";
import SelectPrompt from "../SelectPrompt/SelectPrompt";
import SelectDescription from "../SelectDescription/SelectDescription";

const AddTaskToClass = ({
  taskId,
  points,
  taskType,
  taskParams,
  addOpenTask,
  addBooleanTask,
  addCloseTask,
  success,
  clearTask,
}) => {
  const { descriptionRequired, promptsAllowed, deadLine, classes } = taskParams;
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => clearTask();
  }, [clearTask]);

  const submitOpenTask = () => {
    if (deadLine.length && classes.length) {
      setError(false);
      addOpenTask({
        taskId,
        descriptionRequired,
        promptsAllowed,
        deadLine,
        classes,
        points,
      });
    } else setError(true);
  };

  const submitCloseTask = () => {
    if (deadLine.length && classes.length) {
      setError(false);
      addCloseTask({
        taskId,
        descriptionRequired,
        points,
        deadLine,
        classes,
      });
    } else setError(true);
  };

  const submitBooleanTask = () => {
    if (deadLine.length && classes.length) {
      setError(false);
      addBooleanTask({
        taskId,
        points,
        deadLine,
        classes,
      });
    } else setError(true);
  };

  const displayError = () => {
    return (
      error && (
        <h5 className={styles.error}>Wybierz klasy i termin wykonania</h5>
      )
    );
  };
  return success ? (
    <div className={styles.root}>
      <h3 className={styles.success}>Dodano zadanie</h3>
    </div>
  ) : (
    <div className={styles.root}>
      <h3>Dodaj zadanie do klas</h3>
      <SelectClass />
      <SelectDeadLine />
      {taskType === "openTask" && (
        <>
          <h4>Wybierz dodatkowe parametry</h4>
          <SelectPrompt />
          <SelectDescription />
          <div>
            {displayError()}
            <button onClick={() => submitOpenTask()}>
              Dodaj zadnie do klas
            </button>
          </div>
        </>
      )}
      {taskType === "closeTask" && (
        <>
          <h4>Wybierz dodatkowe parametry</h4>
          <SelectDescription />
          <div>
            {displayError()}
            <button onClick={() => submitCloseTask()}>
              Dodaj zadnie do klas
            </button>
          </div>
        </>
      )}
      {taskType === "booleanTask" && (
        <>
          <div>
            {displayError()}
            <button onClick={() => submitBooleanTask()}>
              Dodaj zadnie do klas
            </button>
          </div>
        </>
      )}
    </div>
  );
};

AddTaskToClass.propTypes = {
  taskId: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  taskType: PropTypes.string.isRequired,
  taskParams: PropTypes.object.isRequired,
  addOpenTask: PropTypes.func.isRequired,
  addBooleanTask: PropTypes.func.isRequired,
  addCloseTask: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  clearTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  taskId: state.tasks.data._id,
  points: state.tasks.data.points,
  taskType: state.tasks.data.taskType,
  taskParams: state.addTaskToClass.data,
  success: state.addTaskToClass.success,
});

export default connect(mapStateToProps, {
  addOpenTask,
  addCloseTask,
  addBooleanTask,
  clearTask,
})(AddTaskToClass);
