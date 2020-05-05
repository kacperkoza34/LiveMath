import React from "react";
import PropTypes from "prop-types";
import styles from "./CloseTask.module.scss";
import CloseTaskFromApi from "./CloseTaskFromApi";
import CloseTaskDumm from "./CloseTaskDumm";
import { connect } from "react-redux";

const CloseTask = ({
  match,
  tasks: { data, isFetching, errors, taskConfig },
}) => {
  return (
    <div className={styles.root}>
      {Object.keys(taskConfig).length > 0 ? (
        <CloseTaskFromApi match={match} />
      ) : (
        <CloseTaskDumm match={match} />
      )}
    </div>
  );
};

CloseTask.propTypes = {
  match: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps)(CloseTask);
