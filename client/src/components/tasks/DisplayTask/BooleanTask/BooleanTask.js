import React from "react";
import PropTypes from "prop-types";
import styles from "./BooleanTask.module.scss";
import BooleanTaskDumm from "./BooleanTaskDumm";
import BooleanTaskFromApi from "./BooleanTaskFromApi";
import BackArrow from "../../../features/BackArrow/BackArrow";
import Help from "../../../features/Help/Help";

import { connect } from "react-redux";

const BooleanTask = ({
  match,
  tasks: { data, isFetching, errors, taskConfig },
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.spaceBetween}>
        <BackArrow />
        <Help id={4} />
      </div>
      {Object.keys(taskConfig).length > 0 ? (
        <BooleanTaskFromApi match={match} />
      ) : (
        <BooleanTaskDumm match={match} />
      )}
    </div>
  );
};

BooleanTask.propTypes = {
  match: PropTypes.object.isRequired,
  task: PropTypes.object,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps)(BooleanTask);
