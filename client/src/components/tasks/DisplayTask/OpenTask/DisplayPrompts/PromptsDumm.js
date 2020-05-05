import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./DisplayPrompts.module.scss";
import MathJax from "../../../MathJax";

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
        <button onClick={() => addPrompts()}>Pokaż podpowiedz</button>
      )}
      {prompts >= 1 && (
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
      {prompts === 2 && (
        <>
          {" "}
          <h4>Wzór:</h4>
          <MathJax content={"`" + model + "`"} />
        </>
      )}
    </div>
  );
};

PromptsDumm.propTypes = {
  model: PropTypes.string.isRequired,
  variables: PropTypes.array.isRequired,
};

export default PromptsDumm;
