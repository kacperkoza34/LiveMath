import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./TaskContent.module.scss";
import {
  addTaskContent,
  addTaskName,
} from "../../../../../redux/actions/newTask";
import { connect } from "react-redux";

const TaskContent = ({ addTaskContent, addTaskName, name, content }) => {
  const [task, setTask] = useState("");
  const [taskName, setTaskName] = useState("");

  return (
    <div className={styles.root}>
      <div>
        <h3>Nazwa</h3>
        <TextareaAutosize
          value={name}
          placeholder="Dodaj nazwe zadania"
          onChange={(e) => {
            setTaskName(e.target.value);
            addTaskName(e.target.value);
          }}
          maxCols="15"
          minCols="5"
        />
      </div>
      <div>
        <h3>Treść</h3>
        <TextareaAutosize
          placeholder="Dodaj treść zadania"
          onChange={(e) => {
            setTask(e.target.value);
            addTaskContent(e.target.value);
          }}
          value={content}
          maxRows="15"
          minRows="5"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  content: state.newTask.data.content,
  name: state.newTask.data.name,
});

export default connect(mapStateToProps, { addTaskContent, addTaskName })(
  TaskContent
);
