import React from "react";
import styles from "./Model.module.scss";
import PropTypes from "prop-types";
import MathJax from "../../../../MathJax";
import TextareaAutosize from "react-textarea-autosize";
import CustomInput from "../../../../../features/CustomInput/CustomInput";
import { addTaskModel } from "../../../../../../redux/actions/newTask";
import { connect } from "react-redux";

const Model = ({ addTaskModel, variabels, modelFromState }) => {
  return (
    <div className={styles.root}>
      <h3>Wzór</h3>
      <CustomInput
        placeholder="Podaj wzór"
        name="onlyString"
        state={modelFromState}
        action={addTaskModel}
      />
      {modelFromState.length > 0 && (
        <div className={styles.model}>
          <MathJax content={"`" + modelFromState + "`"} />
        </div>
      )}
    </div>
  );
};

Model.propTypes = {
  addTaskModel: PropTypes.func.isRequired,
  variabels: PropTypes.array,
  modelFromState: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  modelFromState: state.newTask.data.model,
  variables: state.newTask.data.variables,
});

export default connect(mapStateToProps, { addTaskModel })(Model);
