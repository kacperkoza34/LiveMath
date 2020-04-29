import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./DisplayPrompts.module.scss";
import MathJax from "../../../MathJax";

const DisplayPrompts = ({ usedPrompts, model, variables }) => {
  const [prompts, addOne] = useState(usedPrompts);
  const [canAddPrompt, cantAddPrompt] = useState(true);
  const addPrompts = () => {
    if (prompts == 1) cantAddPrompt(false);
    if (prompts < 2) addOne(prompts + 1);
  };
  return (
    <div className={styles.root}>
      {canAddPrompt && usedPrompts != 2 && (
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
      {prompts == 2 && (
        <>
          {" "}
          <h4>Wzór:</h4>
          <MathJax content={"`" + model + "`"} />
        </>
      )}
    </div>
  );
};

DisplayPrompts.propTypes = {};

const mapStateToProps = (state) => ({});

export default DisplayPrompts;
