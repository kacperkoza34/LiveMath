import React from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./TaskContent.module.scss";
import {
  addTaskContent,
  addTaskName,
} from "../../../../../redux/actions/newTask";
import { connect } from "react-redux";

const TaskContent = ({ addTaskContent, addTaskName, name, content }) => {
  return (
    <div className={styles.root}>
      <div>
        <h3>Nazwa</h3>
        <TextareaAutosize
          value={name}
          placeholder="Dodaj nazwe zadania"
          onChange={(e) => {
            addTaskName(e.target.value);
          }}
          maxcols={15}
          mincols={5}
        />
      </div>
      <div>
        <h3>Treść</h3>
        <TextareaAutosize
          styles="white-space: pre-line;"
          placeholder="Dodaj treść zadania"
          onChange={(e) => {
            addTaskContent(e.target.value);
          }}
          value={content}
          maxrows={15}
          minrows={5}
        />
      </div>
    </div>
  );
};

TaskContent.propTypes = {
  addTaskContent: PropTypes.func.isRequired,
  addTaskName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  content: state.newTask.data.content,
  name: state.newTask.data.name,
});

export default connect(mapStateToProps, { addTaskContent, addTaskName })(
  TaskContent
);
