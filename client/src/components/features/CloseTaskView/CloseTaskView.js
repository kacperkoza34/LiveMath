import React from "react";
import styles from "./CloseTaskView.module.scss";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import TaskStatus from "../TaskStatus/TaskStatus";

const CloseTaskView = ({
  onlyName,
  data,
  index,
  clearTasks,
  setTaskConfig
}) => {
  const {
    task,
    deadLine,
    task,
    deadLine,
    resolved,
    result,
    description,
    descriptionRequired,
    answer,
    toUpdate,
    _id,
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
            to={`/display/booleanTask/${task._id}`}
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
      )}
    </>
  );
};

export default CloseTaskView;
