import React from "react";
import ReactPlayer from "react-player";

import styles from "./VideoArticle.module.scss";

const VideoArticle = ({ description }) => {
  return (
    <div className={styles.root}>
      <h2>{description.title}</h2>
      <div className={styles.video}>
        <ReactPlayer width={"100%"} heigth={"100%"} url={description.video} />
      </div>
    </div>
  );
};

export default VideoArticle;
