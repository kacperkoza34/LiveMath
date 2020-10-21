import React, { useRef, useEffect, useState } from "react";
import MathJax from "react-mathjax-preview";

const Demo = props => {
  const content = props.content;
  const math = String.raw`${content}`;

  return <MathJax math={math} />;
};

export default Demo;
