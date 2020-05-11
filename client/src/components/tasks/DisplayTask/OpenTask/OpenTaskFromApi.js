import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./OpenTask.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import DisplayContent from "./DisplayContent/DisplayContent";
import DisplayPromptsFromApi from "./DisplayPrompts/DisplayPromptsFromApi";
import Messages from "../Messages/Messages";
import SendSolutionApi from "./SendSolution/SendSolutionApi";
import SendSolutionDumm from "./SendSolution/SendSolutionDumm";
import ReviewTask from "../ReviewTask/ReviewTask";
import MathJax from "../../MathJax";
import Errors from "../../../layout/Errors/Errors";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { getOpenTask, setTaskConfig } from "../../../../redux/actions/tasks";
import {
  useOnePrompt,
  updateDescription,
  updateAnswer,
  sendOpenTaskResolution,
  reviewOpenTask,
} from "../../../../redux/actions/resolveTask";

const OpenTask = ({
  match,
  getOpenTask,
  accountType,
  setTaskConfig,
  updateDescription,
  updateAnswer,
  sendOpenTaskResolution,
  student,
  reviewOpenTask,
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
    toUpdate,
    messages,
  } = taskConfig;
  useEffect(() => {
    getOpenTask(match.params.id);
    return () => setTaskConfig({});
  }, [getOpenTask, setTaskConfig, match.params.id]);

  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [checkAnswer, check] = useState(false);
  const [error, setError] = useState("");

  const countPoints = (points) => {
    if (!usedPrompts) return points;
    if (usedPrompts === 1) return (points / 2).toPrecision(2);
    if (usedPrompts === 2) return (points / 4).toPrecision(2);
  };

  const sendSolution = (toUpdate = false, message) => {
    if (descriptionRequired && !description.length) setError("Wymagany opis!");
    else {
      if (toUpdate)
        sendOpenTaskResolution({ ...taskConfig, toUpdate: true, message });
      else sendOpenTaskResolution({ ...taskConfig, message });
    }
  };

  return (
    <div className={styles.root}>
      {isFetching ? (
        <BeatLoader size={20} />
      ) : (
        <>
          {correctAnswer == null &&
            setCorrectAnswer(data.data.groups[group].answer)}
          <div className={styles.header}>
            <div>
              <h4>{data.name}</h4>
              <DisplayContent
                content={data.data.content}
                variables={data.data.variables}
                group={data.data.groups[group]}
              />
            </div>
            <p className={styles.points}>
              <span>Punkty: {countPoints(data.points)}</span>
            </p>
          </div>
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
          <h4>Załącznik</h4>
          <TextareaAutosize
            maxcols="15"
            mincols="5"
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
            <div className={styles.result}>
              <MathJax content={"`" + answer + "`"} />
            </div>
          </div>
          {accountType === "student" ? (
            <>
              {errors && <Errors errors={errors.data.err} />}
              <SendSolutionApi
                check={check}
                checkAnswer={checkAnswer}
                answer={answer}
                correctAnswer={correctAnswer}
                error={error}
                resolved={resolved}
                sendSolution={sendSolution}
                toUpdate={toUpdate}
              />
            </>
          ) : (
            <SendSolutionDumm
              checkAnswer={checkAnswer}
              answer={answer}
              correctAnswer={correctAnswer}
              check={check}
            />
          )}
          {accountType === "teacher" && toUpdate ? (
            <ReviewTask
              correctAnswer={correctAnswer}
              taskId={_id}
              studentId={student}
              reduxAction={reviewOpenTask}
            />
          ) : (
            ""
          )}
          <Messages messages={messages} />
        </>
      )}
    </div>
  );
};

OpenTask.propTypes = {
  match: PropTypes.object.isRequired,
  getOpenTask: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired,
  setTaskConfig: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  sendOpenTaskResolution: PropTypes.func.isRequired,
  student: PropTypes.string.isRequired,
  reviewOpenTask: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  accountType: state.user.data.accountType,
  student: state.student.data._id,
});

export default connect(mapStateToProps, {
  getOpenTask,
  setTaskConfig,
  updateDescription,
  updateAnswer,
  sendOpenTaskResolution,
  reviewOpenTask,
})(OpenTask);
