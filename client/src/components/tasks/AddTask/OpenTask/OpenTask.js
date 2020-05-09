import React, { useEffect } from "react";
import PropTypes from "prop-types";

import TaskContent from "../AddTaskCommon/TaskContent/TaskContent.js";
import SelectSection from "../AddTaskCommon/SelectSection/SelectSection.js";
import Success from "../AddTaskCommon/Success/Success.js";

import BackArrow from "../../../features/BackArrow/BackArrow.js";
import VariabelsList from "./Features/VariabelsList/VariabelsList.js";
import Model from "./Features/Model/Model.js";
import AdditionalVariables from "./Features/AdditionalVariables/AdditionalVariables.js";
import AddGroups from "./Features/AddGroups/AddGroups.js";
import Points from "./Features/Points/Points.js";
import SendOpenTask from "./Features/SendOpenTask/SendOpenTask.js";

import { clearTask } from "../../../../redux/actions/newTask";
import { clearTasks } from "../../../../redux/actions/tasks";
import { connect } from "react-redux";

const OpenTask = ({ clearTask, clearTasks, success }) => {
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
          <VariabelsList />
          <AdditionalVariables />
          <Model />
          <AddGroups />
          <Points />
          <SelectSection />
          <SendOpenTask />
        </>
      )}
    </>
  );
};

OpenTask.propTypes = {
  clearTask: PropTypes.func.isRequired,
  clearTasks: PropTypes.func.isRequired,
  success: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  success: state.newTask.success,
});

export default connect(mapStateToProps, { clearTask, clearTasks })(OpenTask);
