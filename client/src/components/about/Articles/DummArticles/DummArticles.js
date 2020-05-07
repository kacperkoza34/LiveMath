import React from "react";
import styles from "./DummArticles.module.scss";

const DummArticles = ({ description }) => {
  return (
    <div className={styles.root}>
      <h2>{description.title}</h2>

      <div>
        {description.subArticles.map(({ subtitle, content, img }, index) => (
          <div key={index} className={styles.article}>
            <h4>{subtitle}</h4>
            <p>{content}</p>
            {img && (
              <div className={styles.photo}>
                <img src={img} alt={"Coś poszło nie tak"} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DummArticles;
