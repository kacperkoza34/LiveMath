import React from "react";
import PropTypes from "prop-types";
import styles from "./DisplayPrompts.module.scss";
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
  resolved,
  dispatch,
}) => {
  return (
    <div>
      {promptsAllowed && (
        <div className={styles.root}>
          {accountType !== "teacher" && !resolved && usedPrompts < 2 && (
            <button onClick={() => dispatch(action(taskId))}>
              Pokaż podpowiedz
            </button>
          )}
          {usedPrompts >= 1 && (
            <>
              <h4>Zmienne:</h4>

              <ul>
                {variables.map(({ variable, description }, index) => (
                  <li className={styles.item} key={index}>
                    <div>
                      <MathJax content={"`" + variable + "`"} />
                      {" - "}
                    </div>
                    <MathJax content={description} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {usedPrompts === 2 && (
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

DisplayPrompts.propTypes = {
  usedPrompts: PropTypes.number.isRequired,
  promptsAllowed: PropTypes.bool.isRequired,
  model: PropTypes.string.isRequired,
  variables: PropTypes.array.isRequired,
  accountType: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  resolved: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DisplayPrompts);