import React from "react";
import PropTypes from "prop-types";
import BtnPrimary from "../../features/BtnPrimary/BtnPrimary";
import Clipboard from "../../features/Clipboard/Clipboard";
import styles from "./ClassStatus.module.scss";

const ClassStatus = ({ myId, classId, open }) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {open && (
          <div>
            <Clipboard
              link={`${window.location.origin}/register/${myId}/${classId}`}
              title={"Link do klasy"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

ClassStatus.propTypes = {
  myId: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  openClass: PropTypes.func.isRequired,
  closeClass: PropTypes.func.isRequired
};

export default ClassStatus;
