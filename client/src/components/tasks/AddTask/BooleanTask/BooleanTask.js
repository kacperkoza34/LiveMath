import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SelectSection from "../SelectSection.js";
import TaskContent from "../TaskContent.js";
import AddQuestion from "./AddQuestion.js";
import SendTask from "../SendTask.js";
import Success from "../Success.js";
import { connect } from "react-redux";
import { clearTask, sendBooleanTask } from "../../../../redux/actions/newTask";
import { clearTasks } from "../../../../redux/actions/tasks";

const CloseTask = ({ clearTask, clearTasks, success, sendBooleanTask }) => {
  const { taskType, _id, name } = success;
  useEffect(() => {
    return () => clearTask({});
  }, []);

  return (
    <>
      {Object.keys(success).length > 0 ? (
        <Success success={success} clearTasks={clearTasks} />
      ) : (
        <>
          <TaskContent />
          <AddQuestion />
          <SelectSection />
          <SendTask send={sendBooleanTask} />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  success: state.newTask.success,
});

export default connect(mapStateToProps, {
  clearTask,
  clearTasks,
  sendBooleanTask,
})(CloseTask);
