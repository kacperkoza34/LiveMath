import React from "react";
import PropTypes from "prop-types";
import OpenTaskDumm from "./OpenTaskDumm";
import OpenTaskFromApi from "./OpenTaskFromApi";
import BackArrow from "../../../features/BackArrow/BackArrow";
import Help from "../../../features/Help/Help";
import styles from "./OpenTask.module.scss";

import { connect } from "react-redux";

const OpenTask = ({ match, tasks }) => {
  const { taskConfig } = tasks;

  return (
    <div className={styles.root}>
      <>
        <div className={styles.spaceBetween}>
          <BackArrow />
          <Help id={2} />
        </div>
        {Object.keys(taskConfig).length > 0 ? (
          <OpenTaskFromApi match={match} />
        ) : (
          <OpenTaskDumm match={match} />
        )}
      </>
    </div>
  );
};

OpenTask.propTypes = {
  match: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps)(OpenTask);
