import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addOpenTask } from "../../../redux/actions/taskToClass";
import SelectClass from "./SelectClass";
import SelectDeadLine from "./SelectDeadLine";
import SelectPrompt from "./SelectPrompt";

const AddTaskToClass = ({ taskId, taskType, taskParams, addOpenTask }) => {
  const { descriptionRequired, promptsAllowed, deadLine, classes } = taskParams;
  const [error, setError] = useState(false);

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

  return (
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
    </>
  );
};

const mapStateToProps = (state) => ({
  taskId: state.tasks.data._id,
  taskType: state.tasks.data.taskType,
  taskParams: state.addTaskToClass.data,
});

export default connect(mapStateToProps, { addOpenTask })(AddTaskToClass);
