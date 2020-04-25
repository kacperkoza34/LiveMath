import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BeatLoader from "react-spinners/BeatLoader";
import MathJax from '../../MathJax';
import AddTaskToClass from '../../AddTaskToClass/AddTaskToClass';
import { connect } from 'react-redux';
import { getBooleanTask } from '../../../../redux/actions/tasks';


const BooleanTask = ({
  match,
  getBooleanTask,
  accountType,
  tasks: {
    data,
    isFetching,
    errors,
  }
}) =>{

  useEffect(()=>{
    getBooleanTask(match.params.id);
  },[]);

  const answers = {};
  const [taskStatus, setTaskStatus] =  useState(null);
  const [checkAnswers, setChekAnswers] =  useState(false);

  const prepareState = () => {
    data.data.forEach((item, i) => {
     answers[`${i}`] = '';
    });
    setTaskStatus({...answers});
  };

  const onChange = (e) => {
    setChekAnswers(false);
    if(e.target.value === '') setTaskStatus({...taskStatus, [e.target.name]: ''});
    else setTaskStatus({...taskStatus, [e.target.name]: e.target.value === 'true'? true : false});
  };

  const displayResult = () => {
    let result = 0;
    data.data.forEach(({answer}, i) => answer === taskStatus[i] && result++  );
    return `${result}/${Object.keys(taskStatus).length}`
  };
  return (
    <>
      {isFetching? <BeatLoader size={20}/> :
        <>
          {taskStatus === null && prepareState()}
          <h4>{data.name}</h4>
          <p>{data.description}</p>
          {taskStatus &&
            <ul>{data.data.map(({content,answer},i)=>
                  <li>{`${i+1}). `}
                    {content+'   '}
                    <select
                      name={`${i}`}
                      value={taskStatus[`${i}`]}
                      onChange={(e)=>onChange(e)}
                    >
                      <option value={''}>Wybierz odpowiedz</option>
                      <option value={true}>Prawda</option>
                      <option value={false}>Fałsz</option>
                  </select>
                  </li>
                  )
                }
            </ul>
          }
          <button onClick={()=>setChekAnswers(true)}>Sprawdź odpowiedzi</button>
          { checkAnswers && displayResult() }
          { accountType == 'teacher' && <AddTaskToClass />}
        </>
      }
    </>
  )
}

BooleanTask.propTypes = {

}

const mapStateToProps = state =>({
  tasks: state.tasks,
  accountType: state.user.data.accountType
})

export default connect(mapStateToProps,{getBooleanTask})(BooleanTask);
