import React from "react";
import styles from "./LinkBlank.module.scss";

const LinkBlank = ({ url }) => {
  return (
    <div className={styles.root}>
      <h4>Zobacz rozwiązanie:</h4>
      <a target="_blank" href={url}>
        {url}
      </a>
    </div>
  );
};

export default LinkBlank;
