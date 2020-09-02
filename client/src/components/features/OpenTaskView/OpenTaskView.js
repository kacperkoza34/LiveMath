import React from "react";
import styles from "./OpenTaskView.module.scss";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const OpenTaskView = ({ data, index, clearTasks }) => {
  const { task, deadLine, promptsAllowed, descriptionRequired } = data;
  return (
    <div key={index} className={styles.openTask}>
      <table>
        <tbody>
          <tr>
            <td className={styles.name}>
              <Link
                onClick={() => clearTasks()}
                to={`/display/openTask/${task._id}`}
              >
                {task.name}
              </Link>
            </td>
            <td>
              {"Termin: "} <Moment format="YYYY/MM/DD HH:mm">{deadLine}</Moment>
            </td>
          </tr>
          <tr>
            <td>Podpowiedzi:{promptsAllowed ? " dostępne" : " niedostępne"}</td>
            <td>
              Załącznik: {descriptionRequired ? "wymagany" : "niewymagany"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OpenTaskView;
