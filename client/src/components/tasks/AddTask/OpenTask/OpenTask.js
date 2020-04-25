import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskContent from '../TaskContent.js';
import VariabelsList from './VariabelsList.js';
import Model from './Model.js';
import AdditionalVariables from './AdditionalVariables.js';
import AddGroups from './AddGroups.js';
import SelectSection from '../SelectSection.js';
import SendOpenTask from './SendOpenTask.js';
import { clearTask } from '../../../../redux/actions/newTask';
import { clearTasks } from '../../../../redux/actions/tasks';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const OpenTask = ({clearTask, clearTasks, success}) => {
  const { taskType, _id, name } = success;
  useEffect(()=>{
      return () => clearTask({})
  },[]);

  return <>
    <TaskContent />
    <VariabelsList />
    <AdditionalVariables />
    <Model />
    <AddGroups />
    <SelectSection />
    <SendOpenTask />
    {Object.keys(success).length > 0 &&
      <>
        <h5>Dodano zadanie! Zobacz jak wygląda:</h5>
        <Link onClick={()=>clearTasks()} to={`/display/${taskType}/${_id}`}>
          {name}
        </Link>
      </>
    }
  </>

}

const mapStateToProps = state =>({
  success: state.newTask.success
})

export default connect(mapStateToProps,{clearTask,clearTasks})(OpenTask);
