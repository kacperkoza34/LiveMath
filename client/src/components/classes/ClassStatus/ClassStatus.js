import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ClassStatus.module.scss";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { openClass, closeClass } from "../../../redux/actions/classes";

const ClassStatus = ({ myId, classId, open, openClass, closeClass }) => {
  return (
    <div className={styles.root}>
      {open ? (
        <>
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
          <h6
            className={styles.link}
          >{`${window.location.origin}/register/${myId}/${classId}`}</h6>
          <button onClick={() => closeClass(classId)}>Zamknij klase</button>
        </>
      ) : (
        <button onClick={() => openClass(classId)}>Otwórz klase</button>
      )}
    </div>
  );
};

ClassStatus.propTypes = {};

export default connect(null, { openClass, closeClass })(ClassStatus);
