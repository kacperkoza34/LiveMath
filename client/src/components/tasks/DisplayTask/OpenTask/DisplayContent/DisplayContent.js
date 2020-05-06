import React from "react";
import PropTypes from "prop-types";
import MathJax from "../../../MathJax";

const DisplayContent = ({ content, variables, group }) => {
  const contentCopy = content;
  const variablesCopy = variables;
  const groupCopy = group;

  const displayContent = (content, variables, group) => {
    for (let i in variables) {
      const currentVar = variables[i].variable;
      const re = new RegExp(`{${currentVar}}`, "g");
      content = content.replace(re, "`" + group[currentVar] + "`");
    }
    return (
      <pre>
        <MathJax content={content} />
      </pre>
    );
  };

  return <>{displayContent(contentCopy, variablesCopy, groupCopy)}</>;
};

DisplayContent.propTypes = {
  content: PropTypes.string.isRequired,
  variables: PropTypes.array.isRequired,
  group: PropTypes.object,
};

export default DisplayContent;
