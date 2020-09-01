import React from "react";
import styles from "./BtnPrimary.module.scss";

const BtnPrimary = props => {
  const { font, border, children } = props;
  return (
    <button
      style={{ fontSize: `${font}px`, borderWidth: `${border}px` }}
      className={styles.btnPrimary}
      {...props}
    >
      {children}
    </button>
  );
};

export default BtnPrimary;
