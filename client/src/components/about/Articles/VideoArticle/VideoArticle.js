import React from "react";
import styles from "./VideoArticle.module.scss";

const VideoArticle = ({ description }) => {
  return (
    <div className={styles.root}>
      <h2>{description.title}</h2>
      <div className={styles.video}>
        <iframe
          src={description.video}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoArticle;
