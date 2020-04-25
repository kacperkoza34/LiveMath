import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskContent from '../TaskContent.js';
import VariabelsList from './VariabelsList.js';
import Model from './Model.js';
import AdditionalVariables from './AdditionalVariables.js';
import AddGroups from './AddGroups.js';
import SelectSection from '../SelectSection.js';
import Success from '../Success.js';
import SendOpenTask from './SendOpenTask.js';
import { clearTask } from '../../../../redux/actions/newTask';
import { clearTasks } from '../../../../redux/actions/tasks';
import { connect } from 'react-redux';

const OpenTask = ({clearTask, clearTasks, success}) => {
  const { taskType, _id, name } = success;
  useEffect(()=>{
      return () => clearTask({})
  },[]);

  return <>
    {Object.keys(success).length > 0 ?
      <Success success={success} clearTasks={clearTasks} /> :
      <>
        <TaskContent />
        <VariabelsList />
        <AdditionalVariables />
        <Model />
        <AddGroups />
        <SelectSection />
        <SendOpenTask />
      </>
    }
  </>

}

const mapStateToProps = state =>({
  success: state.newTask.success
})

export default connect(mapStateToProps,{clearTask,clearTasks})(OpenTask);
