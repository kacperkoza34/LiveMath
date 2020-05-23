import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import MathJax from "../../tasks/MathJax";
import styles from "./CustomInput.module.scss";

const buttons = [
  "+",
  "-",
  "*",
  "-:",
  "=",
  "!=",
  "2/x",
  "sqrt x",
  "root(y)(x)",
  "x^2",
  "abs(x)",
  "/_",
  "oo",
];

const CustomInput = (props) => {
  const [activeMenu, setActive] = useState(false);
  const root = useRef(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (root.current && !root.current.contains(e.target)) setActive(false);
    });
  }, []);

  const setForm = (e, item = "") => {
    e.preventDefault();
    if (props.name) {
      e.target.name = props.name;
      e.target.value = e.target.value + item;
      props.action(e);
    } else props.action(e.target.value + item);
  };
  return (
    <div ref={root} className={styles.root}>
      {activeMenu && (
        <div className={styles.menu}>
          <button className={styles.btnClose} onClick={() => setActive(false)}>
            x
          </button>
          <div className={styles.buttonsWrapper}>
            <div>
              {buttons.map((item) => (
                <button
                  className={styles.btnCustomInput}
                  onClick={(e) => {
                    if (props.name) e.target.name = props.name;
                    if (props.state) e.target.value = props.state;
                    else e.target.value = "";
                    setForm(e, item);
                  }}
                >
                  <MathJax content={"`" + item + "`"} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <input
        {...props}
        onFocus={() => setActive(true)}
        value={props.state}
        onChange={(e) => setForm(e)}
      />
    </div>
  );
};

CustomInput.propTypes = {
  state: PropTypes.string,
  setState: PropTypes.func,
};

export default CustomInput;
