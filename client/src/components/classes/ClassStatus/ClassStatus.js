import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ClassStatus.module.scss";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { openClass, closeClass } from "../../../redux/actions/classes";

const ClassStatus = ({ myId, classId, open, openClass, closeClass }) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {open ? (
          <div>
            <div className={styles.copy}>
              <h5>Link do klasy</h5>
              <span>
                <FontAwesomeIcon
                  icon={faCopy}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/register/${myId}/${classId}`
                    );
                  }}
                />
              </span>
            </div>
            <h5 className={styles.link}>
              <span>{`${window.location.origin}/register/${myId}/${classId}`}</span>
            </h5>
            <button onClick={() => closeClass(classId)}>Zamknij klase</button>
          </div>
        ) : (
          <button onClick={() => openClass(classId)}>Otwórz klase</button>
        )}
      </div>
    </div>
  );
};

ClassStatus.propTypes = {
  myId: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  openClass: PropTypes.func.isRequired,
  closeClass: PropTypes.func.isRequired,
};

export default connect(null, { openClass, closeClass })(ClassStatus);
