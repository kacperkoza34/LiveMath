import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./OpenTask.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import DisplayContent from "./DisplayContent/DisplayContent";
import DisplayPrompts from "./DisplayPrompts/DisplayPrompts";
import MathJax from "../../MathJax";
import TextareaAutosize from "react-textarea-autosize";
import AddTaskToClass from "../../AddTaskToClass/AddTaskToClass/AddTaskToClass";
import { connect } from "react-redux";
import { getOpenTask, setTaskConfig } from "../../../../redux/actions/tasks";
import { useOnePrompt } from "../../../../redux/actions/resolveTask";

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const OpenTask = ({
  match,
  getOpenTask,
  accountType,
  setTaskConfig,
  tasks: { data, isFetching, errors, taskConfig },
}) => {
  const {
    deadLine,
    promptsAllowed,
    usedPrompts,
    descriptionRequired,
    _id,
  } = taskConfig;
  useEffect(() => {
    getOpenTask(match.params.id);
    return () => setTaskConfig({});
  }, []);

  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [randomIndex, setRandomIndex] = useState(null);
  const [checkAnswer, check] = useState(false);
  const [answerDescription, setAnswerDescription] = useState("");

  const setGroup = () => {
    const index = getRandomIntInclusive(0, data.data.groups.length - 1);
    setRandomIndex(index);
    setCorrectAnswer(data.data.groups[index].answer);
  };

  const addAnswer = (e) => {
    check(false);
    setAnswer(e.target.value);
  };

  const countPoints = (points) => {
    if (accountType == "teacher") return points;
    else {
      if (!usedPrompts) return points;
      if (usedPrompts === 1) return (points / 2).toPrecision(2);
      if (usedPrompts === 2) return (points / 4).toPrecision(2);
    }
  };

  return (
    <div className={styles.root}>
      {isFetching ? (
        <BeatLoader size={20} />
      ) : (
        <>
          <h4>{data.name}</h4>
          <p className={styles.points}>
            <span>Punkty: {countPoints(data.points)}</span>
            {accountType == "teacher" && (
              <span>Ilość grup: {data.data.groups.length}</span>
            )}
          </p>
          <DisplayContent
            content={data.data.content}
            variables={data.data.variables}
            group={data.data.groups[randomIndex]}
          />
          {randomIndex === null ? setGroup() : ""}
          <DisplayPrompts
            promptsAllowed={promptsAllowed}
            usedPrompts={usedPrompts}
            action={useOnePrompt}
            accountType={accountType}
            taskId={_id}
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
            value={answerDescription}
            onChange={(e) => setAnswerDescription(e.target.value)}
          ></TextareaAutosize>
          <div className={styles.answer}>
            <h4>Odpowiedź:</h4>
            <input value={answer} onChange={(e) => addAnswer(e)}></input>
          </div>
          <div className={styles.answer}>
            <h4>Twoja odpowiedź:</h4>
            <MathJax content={"`" + answer + "`"} />
          </div>
          {checkAnswer ? (
            correctAnswer == answer ? (
              "Brawo!"
            ) : (
              "Pomyśl o tym jeszcze raz"
            )
          ) : (
            <button onClick={() => check(true)}>Dodaj odpowiedz!</button>
          )}
          {!Object.keys(taskConfig).length > 0 && accountType == "teacher" && (
            <AddTaskToClass />
          )}
        </>
      )}
    </div>
  );
};

OpenTask.propTypes = {};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  accountType: state.user.data.accountType,
});

export default connect(mapStateToProps, { getOpenTask, setTaskConfig })(
  OpenTask
);
