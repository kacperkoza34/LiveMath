import React from "react";
import PropTypes from "prop-types";
import styles from "./DisplayPrompts.module.scss";
import PromptsDumm from "./PromptsDumm";
import MathJax from "../../../MathJax";
import { connect } from "react-redux";

const DisplayPrompts = ({
  usedPrompts,
  promptsAllowed,
  model,
  variables,
  accountType,
  taskId,
  action,
  context,
  store,
  dispatch,
}) => {
  return (
    <div>
      {accountType == "teacher" && (
        <PromptsDumm model={model} variables={variables} />
      )}
      {accountType == "student" && promptsAllowed && (
        <div className={styles.root}>
          {usedPrompts < 2 && (
            <button onClick={() => dispatch(action(taskId))}>
              Pokaż podpowiedz
            </button>
          )}
          {usedPrompts >= 1 && (
            <>
              <h4>Zmienne:</h4>

              <ul>
                {variables.map(({ variable, description }, index) => (
                  <li key={index}>
                    {variable + "  -  "}
                    {description}
                  </li>
                ))}
              </ul>
            </>
          )}
          {usedPrompts == 2 && (
            <>
              {" "}
              <h4>Wzór:</h4>
              <MathJax content={"`" + model + "`"} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

DisplayPrompts.propTypes = {};

export default connect()(DisplayPrompts);
