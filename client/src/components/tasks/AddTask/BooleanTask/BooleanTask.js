import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddQuestion.module.scss";
import SelectSection from "../AddTaskCommon/SelectSection/SelectSection.js";
import SendTask from "../AddTaskCommon/SendTask/SendTask.js";
import Success from "../AddTaskCommon/Success/Success.js";
import TaskContent from "../AddTaskCommon/TaskContent/TaskContent.js";

import AddQuestion from "./AddQuestion.js";

import BackArrow from "../../../features/BackArrow/BackArrow.js";
import Help from "../../../features/Help/Help";

import { connect } from "react-redux";
import { clearTask, sendBooleanTask } from "../../../../redux/actions/newTask";
import { clearTasks } from "../../../../redux/actions/tasks";

const CloseTask = ({ clearTask, clearTasks, success, sendBooleanTask }) => {
  useEffect(() => {
    return () => clearTask({});
  }, [clearTask]);

  return (
    <>
      {Object.keys(success).length > 0 ? (
        <Success success={success} clearTasks={clearTasks} />
      ) : (
        <>
          <div className={styles.spaceBetween}>
            <BackArrow />
            <Help id={7} title={"Zobacz instrukcje"} />
          </div>
          <TaskContent />
          <AddQuestion />
          <SelectSection />
          <SendTask send={sendBooleanTask} />
        </>
      )}
    </>
  );
};

CloseTask.propTypes = {
  clearTask: PropTypes.func.isRequired,
  clearTasks: PropTypes.func.isRequired,
  success: PropTypes.object.isRequired,
  sendBooleanTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  success: state.newTask.success,
});

export default connect(mapStateToProps, {
  clearTask,
  clearTasks,
  sendBooleanTask,
})(CloseTask);
