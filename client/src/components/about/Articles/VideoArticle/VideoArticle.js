import React from "react";
import ReactPlayer from "react-player";

import styles from "./VideoArticle.module.scss";

const VideoArticle = ({ description }) => {
  return (
    <div className={styles.root}>
      <h2>{description.title}</h2>
      <div className={styles.video}>
        <ReactPlayer url={description.video} />
      </div>
    </div>
  );
};

export default VideoArticle;
