import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SelectSection from '../SelectSection.js';
import TaskContent from '../TaskContent.js';
import AddQuestion from './AddQuestion.js';
import { connect } from 'react-redux';
import { clearTask } from '../../../../redux/actions/newTask';
import { clearTasks } from '../../../../redux/actions/tasks';
import {Link} from 'react-router-dom';

const CloseTask = ({clearTask, clearTasks, success}) => {
  const { taskType, _id, name } = success;
  useEffect(()=>{
      return () =>clearTask({}) 
  },[]);

  return <>
    <TaskContent />
    <AddQuestion />
    <SelectSection />
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


export default connect(mapStateToProps,{clearTask,clearTasks})(CloseTask);
