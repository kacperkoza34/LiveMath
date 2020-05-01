import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./OpenTask.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import DisplayContent from "./DisplayContent/DisplayContent";
import DisplayPromptsFromApi from "./DisplayPrompts/DisplayPromptsFromApi";
import MathJax from "../../MathJax";
import TextareaAutosize from "react-textarea-autosize";
import AddTaskToClass from "../../AddTaskToClass/AddTaskToClass/AddTaskToClass";
import { connect } from "react-redux";
import { getOpenTask, setTaskConfig } from "../../../../redux/actions/tasks";
import {
  useOnePrompt,
  updateDescription,
  updateAnswer,
  sendOpenTaskResolution,
} from "../../../../redux/actions/resolveTask";

const OpenTask = ({
  match,
  getOpenTask,
  accountType,
  setTaskConfig,
  updateDescription,
  updateAnswer,
  sendOpenTaskResolution,
  tasks: { data, isFetching, errors, taskConfig },
}) => {
  const {
    deadLine,
    promptsAllowed,
    usedPrompts,
    descriptionRequired,
    _id,
    resolved,
    group,
    description,
    answer,
  } = taskConfig;
  useEffect(() => {
    getOpenTask(match.params.id);
    return () => setTaskConfig({});
  }, []);

  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [checkAnswer, check] = useState(false);
  const [error, setError] = useState("");

  const countPoints = (points) => {
    if (!usedPrompts) return points;
    if (usedPrompts === 1) return (points / 2).toPrecision(2);
    if (usedPrompts === 2) return (points / 4).toPrecision(2);
  };

  const sendSolution = () => {
    if (descriptionRequired && !description.length) setError("Wymagany opis!");
    else sendOpenTaskResolution(taskConfig);
  };

  return (
    <div className={styles.root}>
      {isFetching ? (
        <BeatLoader size={20} />
      ) : (
        <>
          {correctAnswer == null &&
            setCorrectAnswer(data.data.groups[group].answer)}
          <h4>{data.name}</h4>
          <p className={styles.points}>
            <span>Punkty: {countPoints(data.points)}</span>
          </p>
          <DisplayContent
            content={data.data.content}
            variables={data.data.variables}
            group={data.data.groups[group]}
          />
          <DisplayPromptsFromApi
            resolved={resolved}
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
            value={description}
            onChange={(e) => {
              setError("");
              updateDescription(e.target.value);
            }}
          ></TextareaAutosize>
          <div className={styles.answer}>
            <h4>Odpowiedź:</h4>
            <input
              value={answer}
              onChange={(e) => {
                updateAnswer(e.target.value);
                check(false);
              }}
            ></input>
          </div>
          <div className={styles.answer}>
            <h4>Twoja odpowiedź:</h4>
            <MathJax content={"`" + answer + "`"} />
          </div>
          {checkAnswer ? (
            correctAnswer == answer ? (
              <>
                <div className={styles.success}>Poprawna odpowiedź!</div>
                {error.length > 0 && <div className={styles.fail}>{error}</div>}
                {!resolved && accountType == "student" ? (
                  <button onClick={() => sendSolution()}>
                    Prześlij rozwiązanie
                  </button>
                ) : (
                  <div className={styles.success}>Zadanie rozwiązane!</div>
                )}
              </>
            ) : (
              <div>Pomyśl o tym jeszcze raz</div>
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

export default connect(mapStateToProps, {
  getOpenTask,
  setTaskConfig,
  updateDescription,
  updateAnswer,
  sendOpenTaskResolution,
})(OpenTask);
