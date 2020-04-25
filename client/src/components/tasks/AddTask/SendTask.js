import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SendTask = ({newTask, send}) =>{
  const { content, name, groups, section, class :  classNew } = newTask;
  const [error, setError] = useState('');
  const sendTask = () =>{
    if(content.trim().length &&
       name.trim().length &&
       groups.length &&
       section.length &&
       classNew.length
    ){
       setError('');
       send({
         content,
         name,
         class: classNew,
         section,
         data: groups
       });
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

export default connect(mapStateToProps)(SendTask);
