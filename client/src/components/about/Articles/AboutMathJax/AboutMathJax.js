import React, { useState } from "react";
import styles from "./AboutMathJax.module.scss";
import MathJax from "../../../tasks/MathJax";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";
import { aboutMathJax } from "../../../../data/AboutMathJax";

const AboutMathJax = () => {
  const [content, setContent] = useState("sum_(i=1)^n i^3=((n(n+1))/2)^2");
  return (
    <div className={styles.root}>
      <h2>{aboutMathJax.title}</h2>
      <p>{aboutMathJax.content}</p>
      <h4>{aboutMathJax.subtitle}</h4>
      <div className={styles.buttonBox}>
        {aboutMathJax.examples.map(({ title, content }) => (
          <button onClick={() => setContent(content)}>{title}</button>
        ))}
      </div>
      <input
        value={content}
        placeholder="Sprawdź z czego możesz skorzystać"
        onChange={(e) => {
          setContent(e.target.value);
        }}
        maxcols={15}
        mincols={5}
      />
      <div className={styles.mathJax}>
        <MathJax content={"`" + content + "`"} />
      </div>

      <h4 className={styles.redirect}>
        Zapoznaj się z{" "}
        <a target="_blank" href={"https://asciimath.org/#syntax"}>
          dokumentacją
        </a>{" "}
      </h4>
    </div>
  );
};

export default AboutMathJax;
