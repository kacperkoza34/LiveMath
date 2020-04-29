import React, { useState } from "react";
import PropTypes from "prop-types";
import MathJax from "../../../MathJax";

const DisplayContent = ({ content, variables, group }) => {
  const [contentD, setContentD] = useState(content);
  const [variablesD, setvariablesD] = useState(variables);
  const [groupD, setgroupD] = useState(group);

  const displayContent = (content, variables, group) => {
    for (let i in variables) {
      const currentVar = variables[i].variable;
      const re = new RegExp(`{${currentVar}}`, "g");
      content = content.replace(re, "`" + group[currentVar] + "`");
    }
    return <MathJax content={content} />;
  };

  return <>{displayContent(contentD, variablesD, groupD)}</>;
};

DisplayContent.propTypes = {};

const mapStateToProps = (state) => ({});

export default DisplayContent;
