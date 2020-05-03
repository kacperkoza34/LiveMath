import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./OpenTask.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import DisplayContent from "./DisplayContent/DisplayContent";
import SendSolutionDumm from "./SendSolution/SendSolutionDumm";
import PromptsDumm from "./DisplayPrompts/PromptsDumm";
import MathJax from "../../MathJax";
import TextareaAutosize from "react-textarea-autosize";
import AddTaskToClass from "../../AddTaskToClass/AddTaskToClass/AddTaskToClass";
import { connect } from "react-redux";
import { getOpenTask } from "../../../../redux/actions/tasks";

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const OpenTaskDumm = ({
  match,
  getOpenTask,
  accountType,
  updateDescription,
  tasks: { data, isFetching, errors },
}) => {
  useEffect(() => {
    getOpenTask(match.params.id);
  }, []);

  const [answer, setAnswer] = useState("");
  const [description, setDescription] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [randomIndex, setRandomIndex] = useState(null);
  const [checkAnswer, check] = useState(false);

  const setGroup = () => {
    const index = getRandomIntInclusive(0, data.data.groups.length - 1);
    setRandomIndex(index);
    setCorrectAnswer(data.data.groups[index].answer);
  };

  const addAnswer = (e) => {
    check(false);
    setAnswer(e.target.value);
  };

  return (
    <div className={styles.root}>
      {isFetching ? (
        <BeatLoader size={20} />
      ) : (
        <>
          <div className={styles.header}>
            <div>
              <h4>{data.name}</h4>
              <DisplayContent
                content={data.data.content}
                variables={data.data.variables}
                group={data.data.groups[randomIndex]}
              />
            </div>
            <p>
              <span>Punkty: {data.points}</span>
              <span>Ilość grup: {data.data.groups.length}</span>
            </p>
          </div>
          {randomIndex === null ? setGroup() : ""}
          <PromptsDumm
            model={data.data.model}
            variables={[
              ...data.data.variables,
              ...data.data.additionalVariables,
            ]}
          />
          <h4>Miejsce na link z rozwiązaniem</h4>
          <TextareaAutosize
            maxCols="15"
            minCols="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextareaAutosize>
          <div className={styles.answer}>
            <h4>Odpowiedź:</h4>
            <input value={answer} onChange={(e) => addAnswer(e)}></input>
          </div>
          <div className={styles.answer}>
            <h4>Twoja odpowiedź:</h4>
            <div className={styles.result}>
              <MathJax content={"`" + answer + "`"} />
            </div>
          </div>
          <SendSolutionDumm
            checkAnswer={checkAnswer}
            answer={answer}
            correctAnswer={correctAnswer}
            check={check}
          />
          {accountType == "teacher" && <AddTaskToClass />}
        </>
      )}
    </div>
  );
};

OpenTaskDumm.propTypes = {};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  accountType: state.user.data.accountType,
});

export default connect(mapStateToProps, {
  getOpenTask,
})(OpenTaskDumm);
