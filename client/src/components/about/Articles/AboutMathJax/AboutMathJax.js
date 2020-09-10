import React, { useState } from "react";
import styles from "./AboutMathJax.module.scss";
import MathJax from "../../../tasks/MathJax";
import BtnPrimary from "../../../features/BtnPrimary/BtnPrimary";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";
import { aboutMathJax } from "../../../../data/AboutMathJax";

const AboutMathJax = () => {
  const [content, setContent] = useState("sum_(i=1)^n i^3=((n(n+1))/2)^2");
  return (
    <div className={styles.root}>
      <h2>{aboutMathJax.title}</h2>
      <p>{aboutMathJax.content}</p>
      <div className={styles.buttonBox}>
        {aboutMathJax.examples.map(({ title, content }) => (
          <BtnPrimary font={12} border={2} onClick={() => setContent(content)}>
            {title}
          </BtnPrimary>
        ))}
      </div>
      <input
        value={content}
        placeholder="Sprawdź z czego możesz skorzystać"
        onChange={e => {
          setContent(e.target.value);
        }}
        maxcols={15}
        mincols={5}
      />
      <div className={styles.mathJax}>
        <MathJax content={"`" + content + "`"} />
      </div>

      {false && (
        <>
          <h2>{aboutMathJax.subtitle}</h2>

          <table>
            <thead>
              <tr className={styles.table}>
                <th className={styles.firstColumn}>Kod</th>{" "}
                <th className={styles.secondColumn}>Wynik</th>
              </tr>
            </thead>
            <tbody>
              {aboutMathJax.table.map(item => (
                <tr className={styles.table}>
                  <td className={styles.firstColumn}>{item}</td>{" "}
                  <td className={styles.secondColumn}>
                    <MathJax content={"`" + item + "`"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AboutMathJax;
