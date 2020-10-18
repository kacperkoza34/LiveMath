import React from "react";
import styles from "./CloseTaskView.module.scss";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import TaskStatus from "../TaskStatus/TaskStatus";
import MathJax from "../../tasks/MathJax";

const CloseTaskView = ({
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
    resolved,
    result,
    description,
    descriptionRequired,
    answer,
    toUpdate,
    _id,
    name,
    messages
  } = data;

  const allowToDisplay = accountType === "teacher" && !setTaskConfig;

  const displayContentView = () => {
    return data.data.map((item, i) => (
      <div className={styles.contentView}>
        <span>{`${i + 1}). `}</span>
        <MathJax content={"`" + item.content + "`"} />
      </div>
    ));
  };

  const displayTaskView = () => {
    if (Date.parse(date) > Date.now())
      return (
        <>
          {allowToDisplay ? (
            <div key={index} className={styles.root}>
              <Link
                onClick={() => clearTasks()}
                to={`/display/closeTask/${task._id}`}
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
                  deadLine,
                  resolved,
                  result,
                  answer,
                  description,
                  descriptionRequired,
                  toUpdate,
                  _id,
                  messages
                });
            }}
            to={`/display/closeTask/${task._id}`}
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
                  <td></td>
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
            to={`/display/closeTask/${task._id}`}
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

export default CloseTaskView;
