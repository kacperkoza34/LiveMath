import React from "react";
import styles from "./BooleanTaskView.module.scss";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import TaskStatus from "../TaskStatus/TaskStatus";

const BooleanTaskView = ({
  onlyName,
  data,
  index,
  clearTasks,
  setTaskConfig,
  accountType
}) => {
  if (typeof data.task === "undefined") {
    data["task"] = { name: data.name, _id: data._id };
  }

  const { task, date, deadLine, resolved, result, answer, _id, name } = data;

  const allowToDisplay = accountType === "teacher" && !setTaskConfig;

  const displayTaskView = () => {
    if (Date.parse(date) > Date.now())
      return (
        <>
          {allowToDisplay ? (
            <div key={index} className={styles.root}>
              <Link
                onClick={() => clearTasks()}
                to={`/display/booleanTask/${task._id}`}
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
                setTaskConfig({ deadLine, resolved, answer, _id });
            }}
            to={`/display/booleanTask/${task._id}`}
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
                {setTaskConfig && (
                  <tr>
                    <td>
                      <TaskStatus deadLine={deadLine} resolved={resolved} />
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
            to={`/display/booleanTask/${task._id}`}
          >
            <div className={styles.name}>{task.name}</div>
          </Link>
        </div>
      ) : (
        displayTaskView()
      )}
    </>
  );
};

export default BooleanTaskView;
