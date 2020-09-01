import React from "react";
import PropTypes from "prop-types";
import styles from "./DisplayPrompts.module.scss";
import BtnPrimary from "../../../../features/BtnPrimary/BtnPrimary";
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
  dispatch
}) => {
  return (
    <div>
      {promptsAllowed && (
        <div className={styles.root}>
          {accountType !== "teacher" && !resolved && usedPrompts < 2 && (
            <BtnPrimary
              font={12}
              border={2}
              onClick={() => dispatch(action(taskId))}
            >
              Pokaż podpowiedz
            </BtnPrimary>
          )}
          {usedPrompts >= 1 && (
            <>
              <h4>Zmienne:</h4>

              <ul>
                {variables.map(({ variable, description }, index) => (
                  <li className={styles.item} key={index}>
                    <div className={styles.varName}>
                      <MathJax content={"`" + variable + "`"} />
                      <div style={{ margin: "0 8px 0 8px" }}>{"  -  "}</div>
                    </div>
                    <MathJax content={description} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {usedPrompts === 2 && (
            <>
              <h4>Wzór:</h4>
              <div className={styles.item}>
                {" "}
                <MathJax content={"`" + model + "`"} />
              </div>
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
  dispatch: PropTypes.func.isRequired
};

export default connect()(DisplayPrompts);
