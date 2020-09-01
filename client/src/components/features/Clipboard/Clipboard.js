import React from "react";
import styles from "./Clipboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const Clipboard = ({ link, title }) => (
  <div className={styles.root}>
    <div className={styles.copy}>
      <h5>{title}</h5>
      <span>
        <FontAwesomeIcon
          icon={faCopy}
          onClick={() => {
            navigator.clipboard.writeText(link);
          }}
        />
      </span>
    </div>
    <h5 className={styles.link}>
      <span>{link}</span>
    </h5>
  </div>
);

export default Clipboard;
