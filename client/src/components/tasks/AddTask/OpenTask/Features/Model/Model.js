import React, { useState } from "react";
import styles from "./Model.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import MathJax from "../../../../MathJax";
import { addTaskModel } from "../../../../../../redux/actions/newTask";
import { connect } from "react-redux";

const Model = ({ addTaskModel, variabels, modelFromState }) => {
  const [model, setModel] = useState("");

  return (
    <div className={styles.root}>
      <h3>Wzór</h3>
      <input
        placeholder="Podaj wzór"
        value={modelFromState}
        onChange={(e) => {
          addTaskModel(e.target.value);
          setModel(e.target.value);
        }}
      />
      {modelFromState.length > 0 && (
        <div className={styles.model}>
          <MathJax content={"`" + modelFromState + "`"} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  modelFromState: state.newTask.data.model,
  variables: state.newTask.data.variables,
});

export default connect(mapStateToProps, { addTaskModel })(Model);
