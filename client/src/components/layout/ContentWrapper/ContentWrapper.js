import React from "react";
import styles from "./ContentWrapper.module.scss";

const ContentWrapper = ({ border, children }) => {
  return (
    <div
      style={{ borderWidth: `${border}px` }}
      className={styles.contentWrapper}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
