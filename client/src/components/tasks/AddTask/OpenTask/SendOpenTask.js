import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendOpenTask } from '../../../../redux/actions/newTask';

const SendOpenTask = ({newTask, sendOpenTask}) =>{

  const { content, name, variables, model, groups, section, class :  classNew } = newTask;
  const [error, setError] = useState('');
  const sendTask = () =>{
    if(content.trim().length &&
       name.trim().length &&
       variables.length &&
       model.trim().length &&
       groups.length &&
       section.length &&
       classNew.length
    ){
       setError('');
       sendOpenTask(newTask);
     }
    else setError('Nie uzupełniono wszystkich danych');
  }
  return(
    <>
      {error.length > 0 && error }
      <button onClick={()=>sendTask()}>Zapisz zadanie</button>
    </>
  );
};

const mapStateToProps = (state) => ({
  newTask: state.newTask.data
});

export default connect(mapStateToProps,{sendOpenTask})(SendOpenTask);
