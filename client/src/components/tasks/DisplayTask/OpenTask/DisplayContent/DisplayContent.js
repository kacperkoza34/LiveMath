import React from "react";
import PropTypes from "prop-types";
import MathJax from "../../../MathJax";

const DisplayContent = ({ content, variables, group }) => {
  const displayContent = (content, variables, group) => {
    for (let i in variables) {
      const currentVar = variables[i].variable;
      const re = new RegExp(`{${currentVar}}`, "g");
      content = content.replace(re, "`" + group[currentVar] + "`");
    }
    return (
      <p>
        <MathJax content={content} />
      </p>
    );
  };

  return <>{displayContent(content, variables, group)}</>;
};

DisplayContent.propTypes = {
  content: PropTypes.string.isRequired,
  variables: PropTypes.array.isRequired,
  group: PropTypes.object
};

export default DisplayContent;
