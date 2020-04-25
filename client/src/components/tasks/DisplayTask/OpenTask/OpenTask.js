import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BeatLoader from "react-spinners/BeatLoader";
import DisplayContent from './DisplayContent';
import DisplayPrompts from './DisplayPrompts';
import MathJax from '../../MathJax';
import AddTaskToClass from '../../AddTaskToClass/AddTaskToClass';
import { connect } from 'react-redux';
import { getOpenTask } from '../../../../redux/actions/tasks';

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const OpenTask = ({
  match,
  getOpenTask,
  accountType,
  tasks: {
    data,
    isFetching,
    errors,
    taskConfig: {
      deadLine,
      promptsAllowed,
      usedPrompts,
      descriptionRequired
    }
  }
}) =>{

  useEffect(()=>{
    getOpenTask(match.params.id);
  },[]);

  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [randomIndex, setRandomIndex] = useState(null);
  const [checkAnswer, check] = useState(false);
  const [answerDescription, setAnswerDescription] = useState('');

  const setGroup = () =>{
    const index = getRandomIntInclusive(0,data.data.groups.length-1);
    setRandomIndex(index);
    setCorrectAnswer(data.data.groups[index].answer);
  }

  const addAnswer = (e) =>{
    check(false);
    if(descriptionRequired && !answerDescription.length){
      setAnswer('Wymagany opis zadania!');
    }
    else {
      setAnswer(e.target.value);
    }
  };
  return (
    <>
    {isFetching? <BeatLoader size={20}/> :
      <>
        <h4>{data.name}</h4>
        <DisplayContent
          content={data.data.content}
          variables={data.data.variables}
          group={data.data.groups[randomIndex]}
        />
        {randomIndex === null? setGroup() : '' }
        { (accountType == 'teacher' || promptsAllowed) &&
          <DisplayPrompts
            usedPrompts={accountType == 'teacher'? 0 : usedPrompts}
            model={data.data.model}
            variables={[...data.data.variables,...data.data.additionalVariables]}
          />
        }
        <textarea value={answerDescription} onChange={(e)=>setAnswerDescription(e.target.value)}></textarea>
        <MathJax content={answerDescription} />
        <input value={answer} onChange={(e)=>addAnswer(e)}></input>
        { checkAnswer?
          (correctAnswer == answer ? 'Brawo!' : 'Pomyśl o tym jeszcze raz') :
          <button onClick={()=>check(true)}>Dodaj odpowiedz!</button>
        }
        { accountType == 'teacher' && <AddTaskToClass />}
      </>
    }
    </>
  )
}

OpenTask.propTypes = {

}

const mapStateToProps = state =>({
  tasks: state.tasks,
  accountType: state.user.data.accountType
})

export default connect(mapStateToProps,{getOpenTask})(OpenTask);
