import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./DisplayPrompts.module.scss";
import MathJax from "../../../MathJax";
import BtnPrimary from "../../../../features/BtnPrimary/BtnPrimary";

const PromptsDumm = ({ model, variables }) => {
  const [prompts, addOne] = useState(0);

  const [canAddPrompt, cantAddPrompt] = useState(true);
  const addPrompts = () => {
    if (prompts === 1) cantAddPrompt(false);
    if (prompts < 2) addOne(prompts + 1);
  };
  return (
    <div className={styles.root}>
      {" "}
      {canAddPrompt && (
        <BtnPrimary font={12} border={2} onClick={() => addPrompts()}>
          Pokaż podpowiedz
        </BtnPrimary>
      )}
      {prompts >= 1 && (
        <>
          <h4>Zmienne:</h4>

          <ul>
            {variables.map(({ variable, description }, index) => (
              <li className={styles.item} key={index}>
                <div className={styles.varName}>
                  <MathJax content={"`" + variable + "`"} />
                  <div style={{ margin: "0 8px 0 8px" }}>{"  -  "}</div>
                </div>{" "}
                <MathJax content={description} />
              </li>
            ))}
          </ul>
        </>
      )}
      {prompts === 2 && (
        <div>
          {" "}
          <h4>Wzór:</h4>
          <div className={styles.item}>
            <MathJax content={"`" + model + "`"} />
          </div>
        </div>
      )}
    </div>
  );
};

PromptsDumm.propTypes = {
  model: PropTypes.string.isRequired,
  variables: PropTypes.array.isRequired
};

export default PromptsDumm;
