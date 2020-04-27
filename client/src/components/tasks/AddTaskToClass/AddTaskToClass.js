import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addOpenTask,
  addCloseTask,
  addBooleanTask,
  clearTask,
} from "../../../redux/actions/taskToClass";
import SelectClass from "./SelectClass";
import SelectDeadLine from "./SelectDeadLine";
import SelectPrompt from "./SelectPrompt";

const AddTaskToClass = ({
  taskId,
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
  }, []);

  const submitOpenTask = () => {
    if (deadLine.length && classes.length) {
      setError(false);
      addOpenTask({
        taskId,
        descriptionRequired,
        promptsAllowed,
        deadLine,
        classes,
      });
    } else setError(true);
  };

  const submitCloseTask = () => {
    if (deadLine.length && classes.length) {
      setError(false);
      addCloseTask({
        taskId,
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
        deadLine,
        classes,
      });
    } else setError(true);
  };
  return success ? (
    <h5>Dodano zadanie</h5>
  ) : (
    <>
      <SelectClass />
      <SelectDeadLine />
      {taskType === "openTask" && (
        <>
          <SelectPrompt />
          <div>
            {error && <h5>Wybierz klasy i termin wykonania</h5>}
            <button onClick={() => submitOpenTask()}>
              Dodaj zadnie do klas
            </button>
          </div>
        </>
      )}
      {taskType === "closeTask" && (
        <>
          <div>
            {error && <h5>Wybierz klasy i termin wykonania</h5>}
            <button onClick={() => submitCloseTask()}>
              Dodaj zadnie do klas
            </button>
          </div>
        </>
      )}
      {taskType === "booleanTask" && (
        <>
          <div>
            {error && <h5>Wybierz klasy i termin wykonania</h5>}
            <button onClick={() => submitBooleanTask()}>
              Dodaj zadnie do klas
            </button>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  taskId: state.tasks.data._id,
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
