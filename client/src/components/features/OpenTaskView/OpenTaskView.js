import React from "react";
import styles from "./OpenTaskView.module.scss";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PromptsStatus from "../PromptsStatus/PromptsStatus";
import TaskStatus from "../TaskStatus/TaskStatus";
import DisplayContent from "../../tasks/DisplayTask/OpenTask/DisplayContent/DisplayContent";

const OpenTaskView = ({
  onlyName,
  data,
  index,
  clearTasks,
  setTaskConfig,
  accountType,
  displayContent
}) => {
  if (typeof data.task === "undefined") {
    data["task"] = { name: data.name, _id: data._id };
  }

  const {
    task,
    date,
    deadLine,
    promptsAllowed,
    descriptionRequired,
    description,
    usedPrompts,
    resolved,
    result,
    _id,
    name,
    group,
    answer,
    toUpdate,
    messages
  } = data;

  const allowToDisplay = accountType === "teacher" && !setTaskConfig;

  const displayContentView = () => {
    const {
      data: { groups, variables, content }
    } = data;
    return (
      <DisplayContent
        content={content}
        variables={variables}
        group={groups[0]}
      />
    );
  };

  const displayTaskView = () => {
    if (Date.parse(date) > Date.now())
      return (
        <>
          {allowToDisplay ? (
            <div key={index} className={styles.root}>
              <Link
                onClick={() => clearTasks()}
                to={`/display/openTask/${task._id}`}
              >
                <div className={styles.hiddenTask}>
                  <div>
                    Start: <Moment format="YYYY/MM/DD HH:mm">{date}</Moment>
                  </div>
                  <div>Zobacz treść</div>
                </div>
              </Link>
            </div>
          ) : (
            <div key={index} className={styles.root}>
              <div className={styles.hiddenTask}>
                <div>
                  Start: <Moment format="YYYY/MM/DD HH:mm">{date}</Moment>
                </div>
              </div>
            </div>
          )}
        </>
      );
    else
      return (
        <div key={index} className={styles.root}>
          <Link
            onClick={() => {
              clearTasks();
              if (setTaskConfig)
                setTaskConfig({
                  description,
                  deadLine,
                  resolved,
                  promptsAllowed,
                  descriptionRequired,
                  usedPrompts,
                  _id,
                  group,
                  answer,
                  toUpdate,
                  messages
                });
            }}
            to={`/display/openTask/${task._id}`}
          >
            <table>
              <tbody>
                <tr>
                  <td className={styles.name}>{task.name}</td>
                  <td>
                    {"Termin: "}{" "}
                    <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
                  </td>
                </tr>
                <tr>
                  <td>
                    <PromptsStatus
                      promptsAllowed={promptsAllowed}
                      usedPrompts={usedPrompts}
                    />
                  </td>
                  <td>
                    Załącznik:{" "}
                    {descriptionRequired ? "wymagany" : "niewymagany"}
                  </td>
                </tr>
                {setTaskConfig && (
                  <tr>
                    <td>
                      <TaskStatus
                        deadLine={deadLine}
                        resolved={resolved}
                        description={description}
                        toUpdate={toUpdate}
                      />
                    </td>
                    <td>Wynik: {`${result}/${task.points}`}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Link>
        </div>
      );
  };

  return (
    <>
      {onlyName ? (
        <div className={styles.root}>
          <Link
            onClick={() => {
              clearTasks();
            }}
            to={`/display/openTask/${task._id}`}
          >
            <div className={styles.name}>{task.name}</div>
            {displayContent && <>{displayContentView()}</>}
          </Link>
        </div>
      ) : (
        displayTaskView()
      )}
    </>
  );
};

export default OpenTaskView;
