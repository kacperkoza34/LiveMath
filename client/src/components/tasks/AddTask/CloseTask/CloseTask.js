import React, { useEffect } from "react";
import PropTypes from "prop-types";

import SelectSection from "../AddTaskCommon/SelectSection/SelectSection.js";
import SendTask from "../AddTaskCommon/SendTask/SendTask.js";
import Success from "../AddTaskCommon/Success/Success.js";
import TaskContent from "../AddTaskCommon/TaskContent/TaskContent.js";

import BackArrow from "../../../features/BackArrow/BackArrow.js";
import AddQuestion from "./AddQuestion.js";
import { connect } from "react-redux";
import { clearTask, sendCloseTask } from "../../../../redux/actions/newTask";
import { clearTasks } from "../../../../redux/actions/tasks";

const CloseTask = ({ clearTask, clearTasks, success, sendCloseTask }) => {
  useEffect(() => {
    return () => clearTask({});
  }, [clearTask]);

  return (
    <>
      {Object.keys(success).length > 0 ? (
        <Success success={success} clearTasks={clearTasks} />
      ) : (
        <>
          <BackArrow />
          <TaskContent />
          <AddQuestion />
          <SelectSection />
          <SendTask send={sendCloseTask} />
        </>
      )}
    </>
  );
};

CloseTask.propTypes = {
  clearTask: PropTypes.func.isRequired,
  clearTasks: PropTypes.func.isRequired,
  success: PropTypes.object.isRequired,
  sendCloseTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  success: state.newTask.success,
});

export default connect(mapStateToProps, {
  clearTask,
  clearTasks,
  sendCloseTask,
})(CloseTask);
