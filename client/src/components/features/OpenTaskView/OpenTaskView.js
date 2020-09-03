import React from "react";
import styles from "./OpenTaskView.module.scss";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PromptsStatus from "../PromptsStatus/PromptsStatus";
import TaskStatus from "../TaskStatus/TaskStatus";

const OpenTaskView = ({ onlyName, data, index, clearTasks, setTaskConfig }) => {
  const {
    task,
    deadLine,
    promptsAllowed,
    descriptionRequired,
    description,
    usedPrompts,
    resolved,
    result,
    _id,
    group,
    answer,
    toUpdate,
    messages
  } = data;
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
          </Link>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default OpenTaskView;
