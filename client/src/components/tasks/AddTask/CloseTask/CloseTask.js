import React, { useEffect } from "react";
import PropTypes from "prop-types";

import SelectSection from "../AddTaskCommon/SelectSection/SelectSection.js";
import SendTask from "../AddTaskCommon/SendTask/SendTask.js";
import Success from "../AddTaskCommon/Success/Success.js";
import TaskContent from "../AddTaskCommon/TaskContent/TaskContent.js";

import AddQuestion from "./AddQuestion.js";
import { connect } from "react-redux";
import { clearTask, sendCloseTask } from "../../../../redux/actions/newTask";
import { clearTasks } from "../../../../redux/actions/tasks";

const CloseTask = ({ clearTask, clearTasks, success, sendCloseTask }) => {
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
          <SendTask send={sendCloseTask} />
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
  sendCloseTask,
})(CloseTask);
