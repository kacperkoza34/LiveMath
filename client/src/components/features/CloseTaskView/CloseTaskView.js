import React from "react";
import styles from "./CloseTaskView.module.scss";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CloseTaskView = ({ data, index, clearTasks }) => {
  const { task, deadLine, descriptionRequired } = data;
  return (
    <div key={index} className={styles.closeTask}>
      <table>
        <tbody>
          <tr>
            <td className={styles.name}>
              <Link
                onClick={() => clearTasks()}
                to={`/display/closeTask/${task._id}`}
              >
                {task.name}
              </Link>
            </td>
            <td>
              {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              Załącznik: {descriptionRequired ? "wymagany" : "niewymagany"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CloseTaskView;
