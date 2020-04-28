import React, { Component } from "react";
import { render } from "react-dom";
import MathJax from "react-mathjax-preview";

class Demo extends Component {
  render() {
    const content = this.props.content;
    const math = String.raw`${content}`;
    return <MathJax math={math} />;
  }
}

export default Demo;
