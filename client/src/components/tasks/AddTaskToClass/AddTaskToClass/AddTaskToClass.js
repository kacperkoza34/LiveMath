import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddTaskToClass.module.scss";
import { connect } from "react-redux";
import {
  addOpenTask,
  addCloseTask,
  addBooleanTask,
  setDeadLine,
  setStartDate,
  clearTask
} from "../../../../redux/actions/taskToClass";
import SelectClass from "../SelectClass/SelectClass";
import SelectDate from "../SelectDate/SelectDate";
import SelectPrompt from "../SelectPrompt/SelectPrompt";
import SelectDescription from "../SelectDescription/SelectDescription";
import SetMessage from "../SetMessage/SetMessage";
import Help from "../../../features/Help/Help";
import BtnPrimary from "../../../features/BtnPrimary/BtnPrimary";

const AddTaskToClass = ({
  taskId,
  points,
  taskType,
  taskParams,
  addOpenTask,
  addBooleanTask,
  addCloseTask,
  setDeadLine,
  setStartDate,
  success,
  clearTask
}) => {
  const {
    descriptionRequired,
    promptsAllowed,
    deadLine,
    startDate,
    classes,
    message
  } = taskParams;
  const [error, setError] = useState([]);

  useEffect(() => {
    return () => clearTask();
  }, [clearTask]);

  const validator = requiredFields => {
    const { deadLine, classes, startDate } = requiredFields;
    const errors = [];
    if (!deadLine.length) errors.push("Wybierz termin wykonania");
    if (!startDate.length) errors.push("Wybierz termin rozpoczęcia");
    if (!classes.length) errors.push("Wybierz klasy");
    if (Date.parse(startDate) >= Date.parse(deadLine))
      errors.push("Startowa data musi być mniejsza niż termin wykonania");

    if (errors.length) {
      setError(errors);
      return false;
    } else {
      setError([]);
      return true;
    }
  };

  const submitOpenTask = () => {
    if (validator({ deadLine, classes, startDate })) {
      addOpenTask({
        taskId,
        descriptionRequired,
        promptsAllowed,
        deadLine,
        startDate,
        classes,
        points,
        message
      });
    }
  };

  const submitCloseTask = () => {
    if (validator({ deadLine, classes, startDate })) {
      addCloseTask({
        taskId,
        descriptionRequired,
        points,
        deadLine,
        startDate,
        classes,
        message
      });
    }
  };

  const submitBooleanTask = () => {
    if (validator({ deadLine, classes, startDate })) {
      addBooleanTask({
        taskId,
        points,
        deadLine,
        startDate,
        classes
      });
    }
  };

  const displayError = () => {
    return (
      error.length > 0 &&
      error.map(item => <h5 className={styles.error}>{item}</h5>)
    );
  };

  return success ? (
    <div className={styles.root}>
      <h3 className={styles.success}>Dodano zadanie</h3>
    </div>
  ) : (
    <div className={styles.root}>
      <div className={styles.spaceBetween}>
        <h3>Dodaj zadanie do klas</h3>
        <Help id={9} title={"Jak dodać zadanie?"} />
      </div>
      <SelectClass />
      <SelectDate
        setDate={setStartDate}
        message={"Wybierz termin rozpoczęcia zadania"}
      />

      <SelectDate setDate={setDeadLine} message={"Wybierz termin wykonania"} />
      {taskType === "openTask" && (
        <>
          <SetMessage />
          <h4>Wybierz dodatkowe parametry</h4>
          <SelectPrompt />
          <SelectDescription />
          <div>
            {displayError()}
            <BtnPrimary font={12} border={2} onClick={() => submitOpenTask()}>
              Dodaj zadnie do klas
            </BtnPrimary>
          </div>
        </>
      )}
      {taskType === "closeTask" && (
        <>
          <SetMessage />
          <h4>Wybierz dodatkowe parametry</h4>
          <SelectDescription />
          <div>
            {displayError()}
            <BtnPrimary font={12} border={2} onClick={() => submitCloseTask()}>
              Dodaj zadnie do klas
            </BtnPrimary>
          </div>
        </>
      )}
      {taskType === "booleanTask" && (
        <div>
          {displayError()}
          <BtnPrimary font={12} border={2} onClick={() => submitBooleanTask()}>
            Dodaj zadnie do klas
          </BtnPrimary>
        </div>
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
  clearTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  taskId: state.tasks.data._id,
  points: state.tasks.data.points,
  taskType: state.tasks.data.taskType,
  taskParams: state.addTaskToClass.data,
  success: state.addTaskToClass.success
});

export default connect(mapStateToProps, {
  addOpenTask,
  addCloseTask,
  addBooleanTask,
  setDeadLine,
  setStartDate,
  clearTask
})(AddTaskToClass);
