import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const NewTask = () => {
  const [taskType, setTaskType] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [valiadtionError, setError] = useState(false);

  const addTask = () => {
    if(taskType) setRedirect(true);
    else setError(true);
  }

  if(taskType && redirect) return <Redirect to={`/add/${taskType}`} />

  return <>
    <button onClick={()=>addTask()}>Dodaj zadanie</button>
    <select
      value={taskType}
      onChange={(e)=>{
        setError(false);
        setTaskType(e.target.value);
      }}
    >
      <option value={''}>---</option>
      <option value={'openTask'}>Zadanie otwarte</option>
      <option value={'closeTask'}>Zadanie zamknięte</option>
      <option value={'booleanTask'}>Zadanie prawda fałsz</option>
    </select>
    { valiadtionError && 'Wybierz rodzaj zadania'}
  </>

}



export default NewTask;
